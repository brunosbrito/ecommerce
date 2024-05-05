import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { ItemCardComponent } from '../item-card/item-card.component';
import { ComboCardComponent } from '../combo-card/combo-card.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTabsModule, ItemCardComponent, ComboCardComponent, NavBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
   products = [
    {
      id: 1,
      name: 'Sofá',
      description: 'Sofá confortável para a sala de estar.',
      price: 500.00
    },
    {
      id: 2,
      name: 'Mesa de Jantar',
      description: 'Mesa de jantar com capacidade para 6 pessoas.',
      price: 300.00
    }
  ];

  services = [
    {
      id: 1,
      name: 'Limpeza de Casa',
      description: 'Limpeza completa de casa com produtos e equipamentos profissionais.',
      price: 100.00
    },
    {
      id: 2,
      name: 'Pintura de Parede',
      description: 'Pintura profissional de uma parede com tinta de alta qualidade.',
      price: 150.00
    }
  ];

  combos = [
    {
      name: 'Combo Especial',
      description: 'Combo com vários produtos e serviços',
      price: 200.00,
      items: [
        { type: 'product', name: 'Sofá', price: 500 },
        { type: 'product', name: 'Mesa de Jantar', price: 300 },
        { type: 'service', name: 'Limpeza de Casa', cost: 100 }
      ]
    }
  ];
}
