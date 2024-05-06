import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Combo } from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CombosService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getCombosByCity(city: string): Observable<Combo[]> {
    return this.http.get<Combo[]>(`${this.apiUrl}/combos?city=${city}`);
  }

}
