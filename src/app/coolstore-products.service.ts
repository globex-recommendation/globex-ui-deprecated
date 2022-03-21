import { Injectable } from "@angular/core";
import { LogService } from "./log.service";
import axios, { AxiosError } from "axios";
import { PaginatedProductsList } from "./models/product.model";
import { Observable, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HandleError, HttpErrorHandler } from './http-error-handler.service';
import serverEnvConfig from "server.env.config";


@Injectable()
export class CoolStoreProductsService {
  
  
  paginatedProductsListUrl = serverEnvConfig.ANGULR_API_GETPAGINATEDPRODUCTS;  // URL to web api
  paginationLimit = serverEnvConfig.ANGULR_API_GETPAGINATEDPRODUCTS_LIMIT;
  recommendedProductsListUrl = '/api/getRecommendedProducts';  // URL to web api
  private handleError: HandleError;
  private logService: LogService;
  http: HttpClient;
  
  static getRecommendedProducts: any;
  
  
  constructor(logService: LogService,  http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.logService = logService;
    this.http = http;
    this.handleError = httpErrorHandler.createHandleError('CoolStoreProductsService');
  }

  

 
  fetchPaginatedProductsList(page): Observable<any> {
    console.log("[CoolStoreProductsService]-[fetchPaginatedProductsList] called");
    return this.http.get<any>(this.paginatedProductsListUrl+"?page="+page + "&limit="+this.paginationLimit ) 
      .pipe(
        catchError(this.handleError('fetchPaginatedProductsList', ''))
      );
  }

  /** getRecommendedProducts  from the server */
  getRecommendedProducts(): Observable<any[]> {
    console.log("[CoolStoreProductsService]-[getRecommendedProducts] called");
    return this.http.get<any[]>(this.recommendedProductsListUrl)
      .pipe(
        catchError(this.handleError('[[CoolStoreProductsService]-[getRecommendedProducts]', []))
      );
  }

  

  

}
