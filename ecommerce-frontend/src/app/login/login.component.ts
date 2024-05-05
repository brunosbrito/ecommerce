import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Subject, merge, takeUntil } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private destroyed$: Subject<void> = new Subject<void>();

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  errorMessage = '';
  errorMessagePassword = '';

  constructor() {
    merge(
      this.email.statusChanges,
      this.email.valueChanges,
      this.password.statusChanges,
      this.password.valueChanges
    ).pipe(
      takeUntil(this.destroyed$)
    ).subscribe(() => this.updateErrorMessage());
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage = 'E-mail obrigatório ';
    } else if (this.email.hasError('email')) {
      this.errorMessage = 'email invalido';
    } else if (this.password.hasError('required')) {
      this.errorMessagePassword = 'Senha obrigatório';
    } else if (this.password.hasError('minlength')) {
      this.errorMessagePassword = 'A senha precisa ser ter pelo menos 8 caracteres';
    } else {
      this.errorMessage = '';
    }
  }


  login(): void {
    console.log('E-mail:', this.email);
  }
}

function takeUntilDestroyed(): import("rxjs").OperatorFunction<string | null, unknown> {
  throw new Error('Function not implemented.');
}

