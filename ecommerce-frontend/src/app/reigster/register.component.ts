import { ViaCepService } from './../services/via-cep.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CustomerService } from '../services/customer.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatSnackBarModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registrationForm: FormGroup;
  registerSuccess: boolean = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private readonly viaCepService: ViaCepService, private readonly customerService: CustomerService, private snackBar: MatSnackBar) {

    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      age: ['', Validators.required],
      address: ['', Validators.required],
      zipCode: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  formatCep() {
    let cep = this.registrationForm.get('zipCode')?.value;
    cep = cep.replace(/\D/g, '');
    if (cep.length > 5) {
      cep = cep.substring(0, 5) + '-' + cep.substring(5, 8);
      this.registrationForm.get('zipCode')?.setValue(cep);
      this.consultarCep(cep);
    }
  }

  consultarCep(cep: string) {
    if (cep.trim() !== '') {
      this.viaCepService.consultarCep(cep)
      .subscribe({
        next: (data) => {
          this.registrationForm.patchValue({
            address: data.logradouro,
            state: data.uf,
            city: data.localidade
          });
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const customerData = this.registrationForm.value;
      this.customerService.createCustomer(customerData)
      .subscribe({
        next: (response) => {
          console.log('Cliente criado com sucesso:', response);
          this.snackBar.open('Cliente criado com sucesso', 'Fechar', { duration: 3000 });
          this.registrationForm.reset();
          this.registerSuccess = true;
        },
        error: (error) => {
          var message = error.error.message
          console.error('Erro ao criar cliente:', error);
          this.snackBar.open(message, 'Fechar', { duration: 3000 });
        }
      });
    } else {
      console.log('Formulário inválido. Verifique os campos.');
    }
  }

  returnLogin(): void {
    this.router.navigate(['/login']);
  }

}
