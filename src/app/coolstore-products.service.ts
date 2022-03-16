import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { LogService } from "./log.service";
import { HttpClient } from '@angular/common/http';
import axios, { AxiosError } from "axios";
import { Shelter } from "./models/product.model";

@Injectable()
export class CoolStoreProductsService {

  private characters = [];
  private recommendedProducts=[];

  private logService: LogService;
  characterChanged = new Subject<void>();
  recommendedProductsChanged = new Subject<void>();
  http: HttpClient;

  constructor(logService: LogService, http: HttpClient) {
    this.logService = logService;
    this.http = http;
  }

  getCharacters(chosenList:any){
    if(chosenList==='all') {
      return this.characters.slice();
    }
    return this.characters.filter( (char) => {
      return char.side === chosenList;
    })
  }

  fetchCharacters () {
    this.http.get("http://localhost:8081/services/products")
    .subscribe(
      (response: Response) => {
        var fetchedCharacters = []
        fetchedCharacters.push(response);
        this.characters = fetchedCharacters[0];
        this.characterChanged.next();
        console.log('fetchCharacters ().fetchedCarachters', fetchedCharacters);

      }
    )

  }


  /* fetchRecommendedProducts () {
    this.http.get("/api/getProducts")
    .subscribe(
      (response: Response) => {
        var recommendedProducts = []
        recommendedProducts.push(response);
        this.recommendedProducts = recommendedProducts[0];
        console.log("response", response[0])

        this.recommendedProductsChanged.next();
        console.log('fetchRecommendedProducts.recommendedProducts', this.recommendedProducts);

      }
    )
  } */

  fetchRecommendedProducts() {
    const product_url = "/api/getProducts";
    axios.get(product_url)
      .then(response => {
        this.recommendedProducts =  response.data;
        this.recommendedProductsChanged.next();
      })
      .catch(error => {
        console.log(error);
      });

  }
  handleError(message: string, error: AxiosError): Promise<any> {
    throw new Error(message)
  }

  getRecommendedProducts(){
      return this.recommendedProducts.slice();

  }

  onSideChosen (charInfo) {
    const pos = this.characters.findIndex((char) => {
      return char.name === charInfo.name;
    })
    this.characters[pos].side = charInfo.side;
    this.characterChanged.next();
    this.logService.writeLog("Side changed for " + charInfo.name + " with side selected " + charInfo.side);

  }

  cart= [];
  addProductToCart (product) {
    let index = this.cart.findIndex(x => x.itemId === product.itemId);
    if(index!=-1) {
      this.cart[index].orderQuantity++;
    } else {
      product.orderQuantity = 1;
      this.cart.push(product);
    }

  }

  getProductsInCart () {
    return this.cart;
  }

  getTotalCartValue (){
    if(this.cart.length!=0) {
      let totalCartValue: number = this.cart.map(a => a.price * a.orderQuantity).reduce(function(a, b) {
        return a + b;
      });
      return totalCartValue;
    } else {
      return 0;
    }
  }

  clearCart(){
    this.cart = [];
  }

  getTotalProductsQuantityInCart () {
    if(this.cart.length!=0) {
      let totalTotalProdInCart: number = this.cart.map(a => a.orderQuantity).reduce(function(a, b) {
        return a + b;
      });
      return totalTotalProdInCart;
    } else {
      return 0;
    }
  }

  addCharacter(name, side) {
    const pos = this.characters.findIndex((char) => {
      return char.name === name;
    })
    if(pos !==-1) {
      return;
    }
    const newChar = {name: name, side: side};
    this.characters.push(newChar);
  }


}
