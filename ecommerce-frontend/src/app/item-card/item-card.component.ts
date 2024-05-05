import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CartService } from '../cart.service';
@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatButtonModule, ],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.css'
})
export class ItemCardComponent {
  @Input() items: any;

  constructor(private readonly cartService: CartService) {}

  addToCart(item: any): void {
    this.cartService.addToCart(item);
  }
}
