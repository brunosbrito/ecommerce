import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogCheckoutComponent } from '../dialog-checkout/dialog-checkout.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, NavBarComponent, MatButtonModule,  MatDialogModule, MatSnackBarModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;
  constructor(private cartService: CartService, public dialog: MatDialog, private readonly snackBar: MatSnackBar) {}

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
    const token = sessionStorage.getItem('accessToken');
    const id = sessionStorage.getItem('userId');

    if( token && id) {
      this.snackBar.open('Pedido realziado com sucesso', "Fechar", { duration: 3000 });
      this.cartService.ClearCart();
      this.getCartItems();
    }else {
      this.dialog.open(DialogCheckoutComponent);
    }

  }

}
