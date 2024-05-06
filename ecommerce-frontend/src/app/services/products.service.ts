import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getProductsByCity(city: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products?city=${city}`);
  }
}
