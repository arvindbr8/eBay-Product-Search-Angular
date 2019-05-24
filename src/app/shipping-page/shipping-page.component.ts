import { HttpClient } from '@angular/common/http';
import { ProductResultsService } from '../services/product-results.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shipping-page',
  templateUrl: './shipping-page.component.html',
  styleUrls: ['./shipping-page.component.css']
})
export class ShippingPageComponent implements OnInit {

  shippingDetails:any = {};
  objectKeys = Object.keys;
  showData: any = {};
  constructor(
    private httpClient: HttpClient,
    public productResultService: ProductResultsService,

  ) { }


  ngOnInit() {
    this.shippingDetails = this.productResultService.shippingDetails;
    console.log(this.shippingDetails);
    this.showData.ShippingCost = this.shippingDetails.ShippingCost || 'N/A';
    this.showData.ShippingLocations = this.shippingDetails.ShippingLocations || 'N/A';
    this.showData.HandlingTime = this.shippingDetails.HandlingTime || 'N/A';
    this.showData.ExpeditedShipping = this.shippingDetails.ExpeditedShipping ? 'done' : 'clear';
    this.showData.OneDayShipping = this.shippingDetails.OneDayShipping ? 'done' : 'clear';
    this.showData.ReturnAccepted = this.shippingDetails.ReturnAccepted ? 'done' : 'clear';

  }

}

