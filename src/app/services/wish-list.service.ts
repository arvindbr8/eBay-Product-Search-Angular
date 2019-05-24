import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WishListService {
  static WishList: Array<any> = [];

  // inWishList(id: string) {
  //   return WishListService.WishList.includes(id);
  // }
  static wishlistUpdated = new Subject<any>();

  constructor() { }

  static wishlistUpdateListener() {
    return this.wishlistUpdated.asObservable();
  }

  static update() {
    this.WishList = new Array(localStorage.length);
    for (let i = 0; i < localStorage.length; i++) {
      this.WishList[i] = JSON.parse(
        localStorage.getItem(localStorage.key(i))
      );
    }
    this.WishList.sort((a, b) => {
      return (a.timestamp > b.timestamp) ? 1 : -1;
    });
    this.wishlistUpdated.next();
  }

  static addItem(itemDetails, shippingDetails) {
    const timestamp = new Date().getTime();
    localStorage.setItem(itemDetails.Id, JSON.stringify({
      itemDetails,
      timestamp,
      shippingDetails
    }));
    WishListService.update();
  }

  static removeItem(id) {
    localStorage.removeItem(id);
    WishListService.update();
  }

  static isWishListed(id) {
    return localStorage.getItem(id) !== null ? true : false;
  }


  // getWishListUpdateListener() {
  //   return this.wishListUpdated.asObservable();
  // }

  getAllWishListItems() {

  }

}
