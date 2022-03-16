import { ConstantPool } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CoolStoreProductsService } from '../coolstore-products.service';
import { LogService } from '../log.service';

@Component({
  selector: 'app-product-recommendation',
  templateUrl: './product-recommendation.component.html',
  styleUrls: ['./product-recommendation.component.css']
})
export class ProductRecommendationComponent implements OnInit {

  coolStoreService:CoolStoreProductsService;
  logService:LogService;
  recommendedProducts;
  subscription:Subscription;

  constructor(coolStoreService:CoolStoreProductsService, logService:LogService) {
    this.coolStoreService = coolStoreService;
  }

  ngOnInit(): void {
    this.recommendedProducts = this.coolStoreService.fetchRecommendedProducts();
    this.subscription = this.coolStoreService.characterChanged.subscribe(
      () => {
        this.recommendedProducts = this.coolStoreService.getRecommendedProducts();
      }
    );
    console.log("recommendedProducts.......", this.recommendedProducts);


  }



}
