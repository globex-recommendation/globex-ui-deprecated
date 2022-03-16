import { NgModule } from '@angular/core';
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
import { UserActivityModel } from './user-activity.model';
import { CartComponent } from './cart/cart.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CookieService } from 'ngx-cookie-service';
import { ProductRecommendationComponent } from './product-recommendation/product-recommendation.component';
import { CoolStoreCookieService } from './coolstore-cookie-service';

/* const routes = [
  {path: 'products', component: TabsComponent, children : [
    {path: '', redirectTo: 'all', pathMatch: 'full'},
    {path: ':side', component: ListComponent}
  ]},
  {path: 'cart', component: CartComponent},
  {path: '**', redirectTo: '/characters'}

]; */

const routes = [
  {path: 'products', component: TabsComponent},
  {path: 'cart', component: CartComponent},
  {path: 'product-detail/:itemId', component: ProductDetailComponent},
  {path: '**', redirectTo: '/products'}

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
    ProductRecommendationComponent
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
  providers: [CoolStoreProductsService, LogService, CookieService, CoolStoreCookieService],
  bootstrap: [AppComponent]
})
export class AppModule {


}
