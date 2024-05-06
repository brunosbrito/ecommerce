import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addToCart(item: any): void {
    let cart: any[];
    const cartString = localStorage.getItem('cart');
    if (cartString !== null) {
      cart = JSON.parse(cartString);
    } else {
      cart = [];
    }
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  getCartItems(): any {

    let cart: any[];
    const cartString = localStorage.getItem('cart');
    if (cartString !== null) {
      cart = JSON.parse(cartString);
    } else {
      cart = [];
    }

    return cart
  }


  removeItemFromCart(item: any): void {
    let cart: any[] = this.getCartItems();
    const index = cart.findIndex((cartItem) => cartItem.id === item.id);
    if (index !== -1) {
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
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
}
