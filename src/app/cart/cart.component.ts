import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CoolStoreProductsService } from '../coolstore-products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  //availableSides = [{display: 'None', value: ''}, {display: 'Light', value: 'light'}, {display: 'Dark', value: 'dark'}]
  productsInCart;

  cartService: CartService;

  constructor(cartService:CartService) {
    this.cartService = cartService;
  }

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.productsInCart = this.cartService.getProductsInCart();
  }
  getTotalCartValue() {
    return  this.cartService.getTotalCartValue();
  }
  clearCart(){
    this.productsInCart = [];
    this.cartService.clearCart();
  }
  getTotalProductsQuantityInCart(){
    this.cartService.getTotalProductsQuantityInCart();
  }

  onEnter(product){
    if(product.orderQuantity >1)
    product.orderQuantity = product.orderQuantity-1;
  }
}
