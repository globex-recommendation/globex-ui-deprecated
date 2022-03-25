import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



import { HeaderComponent } from './header/header.component';
import { AppComponent } from './app.component';
import { TabsComponent } from './tabs/tabs.component';
import { ListComponent } from './list/list.component';
import { ItemComponent } from './item/item.component';
import { CoolStoreProductsService } from './coolstore-products.service';
import { LogService } from './log.service';
import { CartComponent } from './cart/cart.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CookieService } from 'ngx-cookie-service';
import { ProductRecommendationComponent } from './product-recommendation/product-recommendation.component';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';
import { HomeComponent } from './home/home.component';
import { AppConfigService } from './providers/app-config.service'
import { CoolstoreCookiesService } from './coolstore-cookies.service';
import { YourFavouritesComponent } from './your-favourites/your-favourites.component';
import { CartService } from './cart.service';


export function initConfig(appConfig: AppConfigService) {
  return () => appConfig.loadConfig();
}

const routes = [
  {path: 'home', component: HomeComponent},
  {path: 'products', component: TabsComponent},
  {path: 'cart', component: CartComponent},
  {path: 'product-detail/:itemId', component: ProductDetailComponent},
  {path: 'myFavourites', component: YourFavouritesComponent},  
  {path: '**', redirectTo: '/home'}

];

@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    ListComponent,
    ItemComponent,
    CartComponent,
    HeaderComponent,
    ProductDetailComponent,
    ProductRecommendationComponent,
    HomeComponent,
    YourFavouritesComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FormsModule,
    RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
}),
    HttpClientModule,
    NgbModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER, useFactory: initConfig,  deps: [AppConfigService],  multi: true
    }, 
    CoolStoreProductsService, LogService, CookieService, HttpErrorHandler, MessageService, CoolstoreCookiesService, CartService],
  bootstrap: [AppComponent]
})
export class AppModule {
  


}
