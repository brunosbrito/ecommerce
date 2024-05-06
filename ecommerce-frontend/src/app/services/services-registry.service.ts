import { Injectable } from '@angular/core';
import { ServiceRegistry } from '../../interfaces/interfaces';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesRegistryService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getServicesRegistryByCity(city: string): Observable<ServiceRegistry[]> {
    return this.http.get<ServiceRegistry []>(`${this.apiUrl}/services-registry?city=${city}`);
  }
}
