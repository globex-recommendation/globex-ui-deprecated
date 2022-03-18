import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserActivityModel } from './user-activity.model';
@Injectable({
  providedIn: 'root'
})
export class CoolstoreCookiesService {
  cookieService: CookieService;
  likeProductsListFromCookie = new Array;

  constructor(cookieService: CookieService) { 
    this.cookieService = cookieService;
  }

  ngOnInit(): void {
    this.getAllProductLikes();
    
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
    likedProductsList.push(product.id)
    likedProductsList= likedProductsList.filter((item, i, ar) => ar.indexOf(item) === i);
    this.cookieService.set('productLikes', likedProductsList.toString());

    const userActivity = new UserActivityModel();
    userActivity.idSite="";
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
    this.cookieService.set('productLikes', '');
  }
}
