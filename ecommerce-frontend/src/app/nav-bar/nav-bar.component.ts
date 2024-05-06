import { Component, OnInit } from '@angular/core';
import {MatBadgeModule} from '@angular/material/badge';
import { CartService } from '../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [MatBadgeModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  quantityItemsCart: number = 0;
  private subscription: Subscription | undefined;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.subscription = this.cartService.getItemCart().subscribe((quantity: number) => {
      this.quantityItemsCart = quantity;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
