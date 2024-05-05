import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatButtonModule, ],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.css'
})
export class ItemCardComponent {
  @Input() items: any;

  addToCart(item: any): void {

  }
}
