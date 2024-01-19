import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Craft, SimpleItem} from "../models/item.model";

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private apiUrl = 'https://api-factorio.rakotoew.fr'
  constructor(private http: HttpClient) { }

  getAllData(): Observable<any> {
    const url = `${this.apiUrl}/items/all`
    return this.http.get(url);
  }

  getItems(): Observable<SimpleItem[]> {
    const url = `${this.apiUrl}/items`
    return this.http.get<SimpleItem[]>(url);
  }

  getCrafts(): Observable<Craft[]> {
    const url = `${this.apiUrl}/items/crafts`
    return this.http.get<Craft[]>(url);
  }
}
