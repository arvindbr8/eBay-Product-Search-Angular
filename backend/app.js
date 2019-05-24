const express = require('express')
const bodyParser = require("body-parser")
const app = express()
const axios = require('axios')

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  )
  next()
})

app.get("/api/search", (req, res, next) => {
  var post = req.query
  // console.log(req)

  urlParams = {
    "OPERATION-NAME": "findItemsAdvanced",
    "SERVICE-VERSION": "1.0.0",
    "SECURITY-APPNAME": "ArvindBr-asd-PRD-e16de56b6-46891f64",
    "RESPONSE-DATA-FORMAT": "JSON",
    "REST-PAYLOAD": "",
    "paginationInput.entriesPerPage": 50,
    "keywords": post.keywords,
    "buyerPostalCode": post.zipcode,
    "outputSelector(0)": "SellerInfo",
    "outputSelector(1)": "StoreInfo%20"
  }


  if(post.category !== '0'){
    urlParams["categoryId"] = post.category
  }

  urlParams["itemFilter(0).name"] = "HideDuplicateItems"
  urlParams["itemFilter(0).value"] = true

  var count = 1
  urlParams["itemFilter(" + count + ").name"] = "MaxDistance"
  urlParams["itemFilter(" + count + ").value"] = post.maxDistance || 10
  count++
  if (post.freeShippingOnly) {
    urlParams["itemFilter(" + count + ").name"] = "FreeShippingOnly"
    urlParams["itemFilter(" + count + ").value"] = post.freeShippingOnly
    count++
  }
  if (post.localPickupOnly) {
    urlParams["itemFilter(" + count + ").name"] = "LocalPickupOnly"
    urlParams["itemFilter(" + count + ").value"] = post.localPickupOnly
    count++
  }
  if (post.condition === []) {
    urlParams["itemFilter(" + count + ").name"] = "Condition"
    var innercount = 0
    for (var condition in post.condition) {
      urlParams["itemFilter(" + count + ").value(" + innercount + ")"] = post.condition[condition]
      innercount++
    }
    count++
  }

  // console.log(urlParams)

  axios.get('http://svcs.ebay.com/services/search/FindingService/v1', {
    params: urlParams
  })
    .then(response => {
      if (response.data.findItemsAdvancedResponse[0].searchResult[0]["@count"] === "0") {
        throw "No results found"
      }
      var resBody = []
      response.data.findItemsAdvancedResponse[0].searchResult[0].item.forEach(item => {
        var searchResult = {
          Id: item.itemId[0],
          Image: item.galleryURL ? item.galleryURL[0] : "No Image Available",
          FullTitle: item.title ? item.title[0] : "N/A",
          Price: item.sellingStatus[0].currentPrice[0].__value__ ? item.sellingStatus[0].currentPrice[0].__value__ : "N/A",
          Shipping: item.shippingInfo[0].shippingType[0] === "Free" ? "Free Shipping" : "$" + item.shippingInfo[0].shippingServiceCost[0].__value__,
          Zip: item.postalCode ? item.postalCode[0] : "NA",
          Seller: item.sellerInfo[0].sellerUserName ? item.sellerInfo[0].sellerUserName[0] : "N/A"
        }
        if (searchResult.FullTitle !== "N/A") {
          var index = 35
          if (item.title[0].length > 35) {

            while (item.title[0].charAt(index) !== " ") {
              index--
            }
            searchResult.Title = item.title[0].substring(0, index) + "..."

          } else {
            searchResult.Title = searchResult.FullTitle
            delete searchResult.FullTitle
          }
        } else {
          searchResult.Title = "N/A"
          searchResult.FullTitle = "N/A"

        }
        var shippingInfo = item.shippingInfo[0];
        // console.log(shippingInfo);
        var shippingDetail = {
          ShippingCost: "$" + shippingInfo.shippingServiceCost[0].__value__,
          ShippingLocations: shippingInfo.shipToLocations[0],
          HandlingTime: shippingInfo.handlingTime ? (shippingInfo.handlingTime[0] === "1" || shippingInfo.handlingTime[0] === "0" ? shippingInfo.handlingTime[0] + " Day" : shippingInfo.handlingTime[0] + " Days") : "N/A",
          ExpeditedShipping: shippingInfo.expeditedShipping[0] === "true" ? true : false,
          OneDayShipping: shippingInfo.oneDayShippingAvailable[0] === "true" ? true : false,
          ReturnAccepted: item.returnAccepted === undefined ? false : (item.returnAccepted[0] === "true" ? true : false),
        }
        // console.log(item)


        resBody.push({ searchResult, shippingDetail })
      })
      // console.log(resBody)
      res.status(200).json(resBody)
    })
    .catch(error => {
      console.log(error)
      res.status(204).json({
        error: error,
      })
    })

})

app.get("/api/product", (req, res, next) => {
  const post = req.query
  urlParams = {
    callname: "GetSingleItem",
    responseencoding: "JSON",
    appid: "ArvindBr-asd-PRD-e16de56b6-46891f64",
    siteid: 0,
    version: 967,
    ItemID: post.id,
    IncludeSelector: "Description,Details,ItemSpecifics"
  }
  axios.get('http://open.api.ebay.com/shopping', {
    params: urlParams
  })
    .then(response => {
      if (response.data.Ack === "Failure") {
        throw response.data.Errors[0].ShortMessage
      }
      // console.log(response.data.Item)
      var jsonResponse = {
        Id: post.id,
        Title: response.data.Item.Title,
        ProductImages: response.data.Item.PictureURL || "N/A",
        Subtitle: response.data.Item.Subtitle || "N/A",
        Price: ("$ " + response.data.Item.CurrentPrice.Value) || "N/A",
        Location: response.data.Item.Location || "N/A",
        URL: response.data.Item.ViewItemURLForNaturalSearch || "N/A",
        GalleryURL: response.data.Item.GalleryURL
      }
      var returnPolicy = response.data.Item.ReturnPolicy
      if (returnPolicy.ReturnsAccepted) {
        switch (returnPolicy.ReturnsAccepted) {
          case "ReturnsNotAccepted":
            jsonResponse.ReturnPolicy = "Returns Not Accepted."
            break
          default:
            jsonResponse.ReturnPolicy = returnPolicy.ReturnsAccepted + " within " + returnPolicy.ReturnsWithin
        }
      }
      itemSpecifics = response.data.Item.ItemSpecifics.NameValueList
      for (var itemSpecific in itemSpecifics) {
        // console.log(itemSpecifics[itemSpecific])
        jsonResponse[itemSpecifics[itemSpecific].Name] = itemSpecifics[itemSpecific].Value[0]
      }
      // console.log(response.data.Item.Storefront)
      const sellerInfo = {
        FirstRowSeller: response.data.Item.Seller.UserID,
        FeedbackScore: response.data.Item.Seller.FeedbackScore,
        Popularity: response.data.Item.Seller.PositiveFeedbackPercent,
        FeedbackRatingStar: response.data.Item.Seller.FeedbackRatingStar,
        TopRatedSeller: response.data.Item.Seller.TopRatedSeller || false,
        StoreName: response.data.Item.Storefront !== undefined ? response.data.Item.Storefront.StoreName : 'N/A',
        URL: response.data.Item.Storefront !== undefined ? response.data.Item.Storefront.StoreURL : 'N/A'
      }


      // console.log(sellerInfo)

      res.status(200).json({ jsonResponse, sellerInfo })
    })
    .catch(error => {
      console.log(error)
      res.status(204).json({
        error: error,
      })
    })
})

app.get("/api/google", (req, res, next) => {
  const title = req.query.title
  axios.get('https://www.googleapis.com/customsearch/v1', {
    params: {
      q: title,
      cx: "003321517558082456043:p_f3rqjqk-a",
      imgSize: "huge",
      imgType: "news",
      num: 8,
      searchType: "image",
      key: "AIzaSyCwn8EAsm4gQZFdJCVktzSS2m03KywnNaM"
    }
  })
    .then(response => {
      var jsonResponse = []
      if (!response.data.items) {
        throw "Error: No images found"
      }
      response.data.items.forEach(item => {
        jsonResponse.push(item.link)
      });
      res.status(200).json(jsonResponse)
    })
    .catch(error => {
      res.status(204).json({
        error: "Error. Image search didn't work this time. " + error
      })
    })
})

app.get("/api/similarItems", (req, res, next) => {
  const id = req.query.id
  axios.get("http://svcs.ebay.com/MerchandisingService", {
    params: {
      'OPERATION-NAME': 'getSimilarItems',
      'SERVICE-NAME': 'MerchandisingService',
      'SERVICE-VERSION': '1.1.0',
      'CONSUMER-ID': 'ArvindBr-asd-PRD-e16de56b6-46891f64',
      'RESPONSE-DATA-FORMAT': 'JSON',
      'REST-PAYLOAD': '',
      'itemId': id,
      'maxResults': '20'
    }
  })
    .then((response) => {
      var jsonResponse = []
      response = response.data
      if (response.getSimilarItemsResponse.itemRecommendations.item === []) {
        throw "No similar item found"
      } else {
        // console.log(response.getSimilarItemsResponse)
        response.getSimilarItemsResponse.itemRecommendations.item.forEach((item) => {
          // console.log(item)
          jsonBuilder = {}
          jsonBuilder.ProductName = item.title
          jsonBuilder.Price = item.buyItNowPrice.__value__
          jsonBuilder.ShippingCost = item.shippingCost.__value__
          jsonBuilder.DaysLeft = item.timeLeft.substring(item.timeLeft.indexOf("P")+1, item.timeLeft.indexOf("D"))
          jsonBuilder.ItemId = item.itemId
          jsonBuilder.ImageURL = item.imageURL
          jsonResponse.push(jsonBuilder)
        })
        console.log(jsonResponse)
        res.status(200).json(jsonResponse)
      }
    })
    .catch((error) => {
      console.log(error)
      res.status(204).json({
        error: error
      })
    })
});
module.exports = app
