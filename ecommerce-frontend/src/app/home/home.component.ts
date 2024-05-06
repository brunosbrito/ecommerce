import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ItemCardComponent } from '../item-card/item-card.component';
import { ComboCardComponent } from '../combo-card/combo-card.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CombosService } from '../services/combos.service';
import { Combo, Product, ServiceRegistry } from '../../interfaces/interfaces';
import { ProductsService } from '../services/products.service';
import { ServicesRegistryService } from '../services/services-registry.service';
import { ViaCepService } from '../services/via-cep.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ MatFormFieldModule, MatTabsModule, ItemCardComponent, ComboCardComponent, NavBarComponent, MatInputModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  combos: Combo[] = [];
  products: Product[] = [];
  services: ServiceRegistry[] = [];
  cep: string = '';

  constructor(private combosService: CombosService,
    private productService: ProductsService,
    private servicesRegistryService: ServicesRegistryService,
    private viaCepService: ViaCepService
  ) {}

  getCombosByCity(city: string): void {
    this.combosService.getCombosByCity(city)
    .subscribe({
      next: (combos: Combo[]) => {
        this.combos = combos;
        console.log('Combos encontrados:', this.combos);
      },
      error: (error) => {
        console.error('Erro ao buscar combos por cidade:', error);
      }
    });
  }

  getProductsByCity(city: string): void {
    this.productService.getProductsByCity(city)
    .subscribe({
      next: (products: Product[]) => {
        this.products = products;
        console.log('Produtos encontrados:', this.combos);
      },
      error: (error) => {
        console.error('Erro ao buscar Produtos por cidade:', error);
      }
    });
  }

  getServicesByCity(city: string): void {
    this.servicesRegistryService.getServicesRegistryByCity(city)
    .subscribe({
      next: (services: ServiceRegistry[]) => {
        this.services = services;
        console.log('Servicos encontrados:', this.services);
      },
      error: (error) => {
        console.error('Erro ao buscar Servicos por cidade:', error);
      }
    });
  }

  formatCep() {
    this.cep = this.cep.replace(/\D/g, '');
    if (this.cep.length > 5) {
      this.cep = this.cep.substring(0, 5) + '-' + this.cep.substring(5, 8);
      this.consultarCep();
    }
  }

  consultarCep() {
    if (this.cep.trim() !== '') {
      this.viaCepService.consultarCep(this.cep)

      .subscribe({
        next: (data) => {
          const city = data.localidade.toLowerCase()
          this.getCombosByCity(city);
          this.getProductsByCity(city);
          this.getServicesByCity(city);
        },
        error: (error) => {
          console.error('Erro ao buscar Servicos por cidade:', error);
        }
      });

    } else {
      this.getCombosByCity('');
      this.getProductsByCity('');
      this.getProductsByCity('');
    }
  }

}
