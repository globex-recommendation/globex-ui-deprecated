import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CoolStoreProductsService } from '../coolstore-products.service';
import { PaginatedProductsList } from '../models/product.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  products = new PaginatedProductsList();
  
  
  activatedRoute: ActivatedRoute;
  coolStoreService: CoolStoreProductsService;
  loadedSide = '';
  subscription:Subscription;
  page = 1;

  constructor(activatedRoute:ActivatedRoute, coolStoreService:CoolStoreProductsService) {
    this.activatedRoute = activatedRoute;
    this.coolStoreService  = coolStoreService;

  }


  ngOnInit(): void {
    this.fetchPaginatedProductsList(1);
  }

  fetchPaginatedProductsList(page) {
    
    this.coolStoreService.fetchPaginatedProductsList(page)
      .subscribe(products => (this.products = products));
      
      
  }


  loadPage(event){
    //console.log("Event is " + event + " and oage is " + this.page);
    if(this.page != event) {
      console.log("loadPage.event", event)
      this.page = event;
      this.fetchPaginatedProductsList(event);
    }
    
  } 



}
