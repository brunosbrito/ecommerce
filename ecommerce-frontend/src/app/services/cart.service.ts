import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any[] = [];
  private quantityItemsCart: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {
    this.getCartItems()
    this.updateItemsCart();
   }

  addToCart(item: any): void {
    this.cart = this.getCartItems();
    this.cart.push(item);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.updateItemsCart();
  }

  getCartItems(): any {
    const cartString = localStorage.getItem('cart');
    if (cartString !== null) {
      this.cart = JSON.parse(cartString);
    } else {
      this.cart = [];
    }

    return this.cart
  }


  removeItemFromCart(item: any): void {
   this.cart = this.getCartItems();
    const index = this.cart.findIndex((cartItem) => cartItem.id === item.id);
    if (index !== -1) {
      this.cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.updateItemsCart();
    }
  }

  getTotal(): number {
    const cart: any[] = this.getCartItems();
    let total: number = 0;
    for (const item of cart) {
      total += item.price;
    }

    return total;
  }

  updateItemsCart(): void {
    this.quantityItemsCart.next(this.cart.length);
  }

  getItemCart(): BehaviorSubject<number> {
    return this.quantityItemsCart;
  }
}
