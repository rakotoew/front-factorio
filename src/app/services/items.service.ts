import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SimpleItem} from "../models/item.model";

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private apiUrl = 'http://localhost:3000'
  constructor(private http: HttpClient) { }

  getAllData(): Observable<any> {
    const url = `${this.apiUrl}/items/all`
    return this.http.get(url);
  }

  getItems(): Observable<SimpleItem[]> {
    const url = `${this.apiUrl}/items`
    return this.http.get<SimpleItem[]>(url);
  }
}
