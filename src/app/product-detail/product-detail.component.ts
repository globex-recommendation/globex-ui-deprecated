import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from '../cart.service';
import { CoolstoreCookiesService } from '../coolstore-cookies.service';
import { CoolStoreProductsService } from '../coolstore-products.service';
import { Product } from '../models/product.model';
import { UserActivityModel } from '../user-activity.model';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  likeProductsListFromCookie = new Array;
  coolStoreService:CoolStoreProductsService;
  cookieService: CookieService;
  cartService:CartService;
  coolstoreCookiesService:CoolstoreCookiesService;
  
  currentProduct;
  constructor(coolStoreService:CoolStoreProductsService, cookieService: CookieService,
    coolstoreCookiesService:CoolstoreCookiesService, cartService:CartService) {
    this.coolStoreService = coolStoreService;
    this.cartService = cartService;
    this.cookieService = cookieService;
    this.coolstoreCookiesService = coolstoreCookiesService;
  }

  ngOnInit(): void {
    this.getProductDetails();
    this.setupProductLikes();
    
   }
   getProductDetails() {
      this.currentProduct = new Product(
              'E12343', 'Quarkus T-shirt', 
              'Our T-Shirt is an everyday essential! This short-sleeve heavyweight T-shirt is comfortable, economical and made to last. Designed with a traditional fit that runstrue to size, he’ll show off his personality, humor and interests with an easy relaxed style.',
              '10', 736 );
              console.log("this.currentProduct ", this.currentProduct )
              
  }
 
   setupProductLikes(){
    this.coolstoreCookiesService.getAllProductLikes();
    this.coolstoreCookiesService.setupSingleProductForLike(this.currentProduct);
   }
 
   saveUserLike(event, product) {
     this.coolstoreCookiesService.saveUserLike(event, product);

  }
   
 
   nullifyCookies(){
     this.coolstoreCookiesService.nullifyCookies();
   }

  
   addToCart(event, product) {
     this.cartService.addProductToCart(product);
     console.log(product);
   }
}
