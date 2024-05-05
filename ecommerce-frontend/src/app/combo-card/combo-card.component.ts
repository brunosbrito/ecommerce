import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-combo-card',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatButtonModule, MatDividerModule],
  templateUrl: './combo-card.component.html',
  styleUrl: './combo-card.component.css'
})
export class ComboCardComponent {
  @Input() combos: any;
  constructor(private readonly cartService: CartService) {}

  addToCart(item: any): void {
    this.cartService.addToCart(item);
  }
}
