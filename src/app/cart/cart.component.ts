import { Component, OnInit } from '@angular/core';
import { CoolStoreProductsService } from '../coolstore-products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  //availableSides = [{display: 'None', value: ''}, {display: 'Light', value: 'light'}, {display: 'Dark', value: 'dark'}]
  productsInCart;

  coolStoreService: CoolStoreProductsService;

  constructor(coolStoreService:CoolStoreProductsService) {
    this.coolStoreService = coolStoreService;
  }

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.productsInCart = this.coolStoreService.getProductsInCart();
  }
  getTotalCartValue() {
    return  this.coolStoreService.getTotalCartValue();
  }
  clearCart(){
    this.productsInCart = [];
    this.coolStoreService.clearCart();
  }
  getTotalProductsQuantityInCart(){
    this.coolStoreService.getTotalProductsQuantityInCart();
  }

  onEnter(product){
    if(product.orderQuantity >1)
    product.orderQuantity = product.orderQuantity-1;
  }
}
