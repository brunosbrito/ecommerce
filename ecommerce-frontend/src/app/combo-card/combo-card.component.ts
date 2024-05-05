import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-combo-card',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatButtonModule, MatDividerModule],
  templateUrl: './combo-card.component.html',
  styleUrl: './combo-card.component.css'
})
export class ComboCardComponent {
  @Input() combos: any;

  addToCart(combo: any): void {
  }
}
