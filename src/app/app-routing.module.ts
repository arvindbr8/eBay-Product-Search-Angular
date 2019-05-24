import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { ResultTableComponent } from './result-table/result-table.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { PhotosPageComponent } from './photos-page/photos-page.component';
import { ShippingPageComponent } from './shipping-page/shipping-page.component';
import { SellerPageComponent } from './seller-page/seller-page.component';
import { SimilarProductsPageComponent } from './similar-products-page/similar-products-page.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { WishlistTableComponent } from './wishlist-table/wishlist-table.component';

const routes: Routes = [
  // { path: '', component:  },
  { path: 'results', component: ResultTableComponent, data: { routeIdx: 0 } },
  { path: 'details/:mainTab/:tabs', component: DetailsPageComponent, data: { routeIdx: 2 } },
  { path: 'wishList', component: WishlistTableComponent, data: { routeIdx: 1 } },
  // { path: 'details/:products', component: ProductPageComponent },
  // { path: 'details/:photos', component: PhotosPageComponent },
  // { path: 'details/:shipping', component: ShippingPageComponent },
  // { path: 'details/:seller', component: SellerPageComponent },
  // { path: 'details/:similarProducts', component: SimilarProductsPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
