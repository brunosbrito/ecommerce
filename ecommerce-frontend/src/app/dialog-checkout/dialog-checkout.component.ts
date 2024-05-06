import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-checkout',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './dialog-checkout.component.html',
  styleUrl: './dialog-checkout.component.css'
})
export class DialogCheckoutComponent {
  constructor(private router: Router, private dialogRef: MatDialogRef<DialogCheckoutComponent>) {}

  login() {
    this.router.navigate(['/login']);
    this.dialogRef.close();
  }

  register() {
    this.router.navigate(['/cadastrar']);
    this.dialogRef.close();
  }
}
