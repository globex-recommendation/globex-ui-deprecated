import { Component, Input, OnInit } from '@angular/core';
import { CoolStoreProductsService } from '../coolstore-products.service';
import { CookieService } from 'ngx-cookie-service';
import { UserActivityModel } from '../user-activity.model';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() character:any;
  coolStoreService:CoolStoreProductsService;
  cookieService: CookieService;

  likeProductsListFromCookie = new Array;

  constructor(coolStoreService:CoolStoreProductsService, cookieService: CookieService) {
    this.coolStoreService = coolStoreService;
    this.cookieService = cookieService;
  }

  ngOnInit(): void {
    var productLikesCookieValue = this.cookieService.get('productLikes');
    this.likeProductsListFromCookie = productLikesCookieValue.split(',');
    //console.log("this.likeProductsListFromCookie", this.likeProductsListFromCookie);
    if(this.likeProductsListFromCookie.indexOf(this.character.itemId) !== -1){
      this.character.liked = true;
    }

  }

  onAssign(side:any){
   // this.character.side = side;
    //this.sideAssigned.emit({name:this.character.name, side:side})

    this.coolStoreService.onSideChosen({name:this.character.name, side:side});
  }

  nullifyCookies(){
    this.cookieService.set('productLikes', '');
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
    this.coolStoreService.addProductToCart(product);
    console.log(product);
  }
}
