import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from '../cart.service';
import { CoolstoreCookiesService } from '../coolstore-cookies.service';
import { CoolStoreProductsService } from '../coolstore-products.service';
import { PaginatedProductsList } from '../models/product.model';


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
      this.currentProduct = new PaginatedProductsList()
      
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
