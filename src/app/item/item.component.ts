import { Component, Input, OnInit } from '@angular/core';
import { CoolStoreProductsService } from '../coolstore-products.service';
import { CookieService } from 'ngx-cookie-service';
import { UserActivityModel } from '../user-activity.model';
import { CartService } from '../cart.service';
import { CoolstoreCookiesService } from '../coolstore-cookies.service';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() character:any;
  coolStoreService:CoolStoreProductsService;
  cookieService: CookieService;
  cartService:CartService;
  coolstoreCookiesService: CoolstoreCookiesService;

  likeProductsListFromCookie = new Array;

  constructor(coolStoreService:CoolStoreProductsService, cookieService: CookieService, 
    coolstoreCookiesService: CoolstoreCookiesService, cartService:CartService) {
    this.coolStoreService = coolStoreService;
    this.cookieService = cookieService;
    this.coolstoreCookiesService = coolstoreCookiesService;
    this.cartService = cartService; 
  }

  ngOnInit(): void {
   this.setupProductLikes()

  }

  setupProductLikes(){
    var productLikesCookieValue = this.cookieService.get('productLikes');
    this.likeProductsListFromCookie = productLikesCookieValue.split(',');
    if(this.likeProductsListFromCookie.indexOf(this.character.itemId) !== -1){
      this.character.liked = true;
    }
  }



  nullifyCookies(){
    this.coolstoreCookiesService.nullifyCookies();
  }

  saveUserLike(event, product) {
    console.log(product)
    product.liked = true;
    var productLikesCookieValue = this.cookieService.get('productLikes')
    var likedProductsList = [];
    if(productLikesCookieValue!=='') {
      likedProductsList = productLikesCookieValue.split(',');
    }
    likedProductsList.push(product.itemId)
    likedProductsList= likedProductsList.filter((item, i, ar) => ar.indexOf(item) === i);

    this.cookieService.set('productLikes', likedProductsList.toString());

    const userActivity = new UserActivityModel();
    userActivity.idSite="";

    //export interface UserActivity {


  }

  addToCart(event, product) {
    this.cartService.addProductToCart(product);
    console.log(product);
  }
}
