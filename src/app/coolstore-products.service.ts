import { Injectable } from "@angular/core";
import { LogService } from "./log.service";
import axios, { AxiosError } from "axios";
import { Product } from "./models/product.model";
import { Observable, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HandleError, HttpErrorHandler } from './http-error-handler.service';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};
@Injectable()
export class CoolStoreProductsService {

  private characters = [];
  private recommendedProducts=[];
  heroesUrl = '/api/getProducts';  // URL to web api
  private handleError: HandleError;
  static getHeroes: any;
  private logService: LogService;
  characterChanged = new Subject<void>();
  recommendedProductsChanged = new Subject<void>();
  http: HttpClient;
  
  static getRecommendedProducts: any;
  
  
  constructor(logService: LogService,  http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.logService = logService;
    this.http = http;
    this.handleError = httpErrorHandler.createHandleError('CoolStoreProductsService');
  }

  

  getCharacters(chosenList:any){
    if(chosenList==='all') {
      return this.characters.slice();
    }
    return this.characters.filter( (char) => {
      return char.side === chosenList;
    })
  }

  

  fetchPaginatedProductsList(): Observable<any[]> {
    console.log("getHeroes  called");
    return this.http.get<any[]>(this.heroesUrl)
      .pipe(
        catchError(this.handleError('getHeroes', []))
      );
  }

  /** getRecommendedProducts  from the server */
  getRecommendedProducts(): Observable<any[]> {
    console.log("getHeroes  called");
    return this.http.get<any[]>(this.heroesUrl)
      .pipe(
        catchError(this.handleError('getHeroes', []))
      );
  }

  

  

}
