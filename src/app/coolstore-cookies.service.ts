import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActionInfo, Activity, UserActivityModel, UserInfo } from './models/user-activity.model';
import {v4 as uuidv4} from 'uuid';
import { GlobexConstants } from './core/constants/globex.constants';

@Injectable({
  providedIn: 'root'
})

export class CoolstoreCookiesService {
  cookieService: CookieService;
  likeProductsListFromCookie = new Array;

  constructor(cookieService: CookieService) { 
    this.cookieService = cookieService;
  }


  saveUserLike(event, product) {
    console.log("[CoolstoreCookieService].saveUserLike()", product)
    product.liked = true;
    var productLikesCookieValue = this.cookieService.get('productLikes')
    console.log("productLikesCookieValue", productLikesCookieValue)
    var likedProductsList = [];
    if(productLikesCookieValue!=='') {
      likedProductsList = productLikesCookieValue.split(',');
    }
    likedProductsList.push(product.itemId)
    likedProductsList= likedProductsList.filter((item, i, ar) => ar.indexOf(item) === i);
    this.cookieService.set('productLikes', likedProductsList.toString());


    const userActivity = new UserActivityModel( 
                              GlobexConstants.General.SITE_ID,
                              new Activity(uuidv4(), "url", uuidv4(), "type") ,
                              new UserInfo(0,0,0,'',0,new Date()),
                              new ActionInfo(product.itemId, '', '')
                              )

    console.log("userActivity", userActivity);
                            
  }


  getAllProductLikes(){
     var productLikesCookieValue = this.cookieService.get('productLikes');
     this.likeProductsListFromCookie = productLikesCookieValue.split(',');
   }

   setupSingleProductForLike(currentProduct){
    if(this.likeProductsListFromCookie.indexOf(currentProduct.id) !== -1){
      currentProduct.liked = true;
    }
    console.log("[CoolstoreCookieService].setupProductLikes()", currentProduct)
  }
 
  nullifyCookies(){ 
    console.log("nullifyCookies", this.cookieService.get('productLikes'))
    this.cookieService.set('productLikes', '');
  }

}


/**
 * generate groups of 4 random characters
 * @example getUniqueId(1) : 607f
 * @example getUniqueId(2) : 95ca-361a-f8a1-1e73
 */
 export function getUniqueId(parts: number): string {
  const stringArr = [];
  for(let i = 0; i< parts; i++){
    // tslint:disable-next-line:no-bitwise
    const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    stringArr.push(S4);
  }
  return stringArr.join('-');
}