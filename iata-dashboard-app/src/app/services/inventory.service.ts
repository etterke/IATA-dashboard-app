import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InventoryItemPayload } from '../models/inventory.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<InventoryItemPayload[]> {
    return this.http.get<InventoryItemPayload[]>(
      'http://localhost:3000/inventory'
    );
  }

  addProduct(payload: InventoryItemPayload): Observable<any> {
    return this.http.post('http://localhost:3000/inventory', payload);
  }

  //   editProduct() {}

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/inventory/${id}`);
  }
}
