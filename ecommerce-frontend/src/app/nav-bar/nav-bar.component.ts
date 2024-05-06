import { Component, OnInit } from '@angular/core';
import {MatBadgeModule} from '@angular/material/badge';
import { CartService } from '../services/cart.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [MatBadgeModule, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  quantityItemsCart: number = 0;
  login: boolean = false
  private subscription: Subscription | undefined;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.subscription = this.cartService.getItemCart().subscribe((quantity: number) => {
      this.quantityItemsCart = quantity;
    });

    const token = sessionStorage.getItem('accessToken');
    const id = sessionStorage.getItem('userId');

    if( token && id) {
      this.login = true
    }

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
