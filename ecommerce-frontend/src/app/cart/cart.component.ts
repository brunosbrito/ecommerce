import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, NavBarComponent, MatButtonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getCartItems();
  }
  getCartItems(): void {
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.getTotal();
  }

  removeItem(item: any): void {
    this.cartService.removeItemFromCart(item);
    this.getCartItems();
  }

  checkout(): void {
    console.log('Finalizando compra...');
  }

}
