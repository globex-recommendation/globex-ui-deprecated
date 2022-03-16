import { Component, OnInit } from '@angular/core';
import { CoolStoreProductsService } from '../coolstore-products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  coolStoreService:CoolStoreProductsService
  constructor(coolStoreService:CoolStoreProductsService) {
    this.coolStoreService = coolStoreService;
  }

  ngOnInit(): void {
  }

  getTotalCartValue() {
    return this.coolStoreService.getTotalCartValue();
  }

  getItemsCountOfProductsInCart() {
    return this.coolStoreService.getTotalProductsQuantityInCart()
  }

}
