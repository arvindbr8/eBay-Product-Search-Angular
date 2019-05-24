import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { ResultTableComponent } from './result-table/result-table.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchResultsService } from './services/search-results.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule, MatButtonModule, MatOptionModule, MatAutocompleteModule } from '@angular/material';
import 'hammerjs';
import { DetailsPageComponent } from './details-page/details-page.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductPageComponent } from './product-page/product-page.component';
import { PhotosPageComponent } from './photos-page/photos-page.component';
import { ShippingPageComponent } from './shipping-page/shipping-page.component';
import { SellerPageComponent } from './seller-page/seller-page.component';
import { SimilarProductsPageComponent } from './similar-products-page/similar-products-page.component';
import { ProductResultsService } from './services/product-results.service';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { FacebookModule } from 'ngx-facebook';
import { WishlistTableComponent } from './wishlist-table/wishlist-table.component';
@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ResultTableComponent,
    DetailsPageComponent,
    ProductPageComponent,
    PhotosPageComponent,
    ShippingPageComponent,
    SellerPageComponent,
    SimilarProductsPageComponent,
    WishlistTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RoundProgressModule,
    FormsModule,
    FacebookModule.forRoot(),
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatButtonModule,
    // MatAutocompleteModule,
    // ReactiveFormsModule,
    // MatOptionModule,
  ],
  providers: [
    SearchResultsService,
    ProductResultsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
