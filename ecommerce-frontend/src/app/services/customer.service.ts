import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  findByEmail(email: string) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:3000/cadastro';
  constructor(private http: HttpClient) { }


  createCustomer(customerData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, customerData)
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }
}
