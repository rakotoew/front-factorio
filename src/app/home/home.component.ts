import {Component, OnInit} from '@angular/core';
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {ItemsService} from "../services/items.service";
import {SimpleItem} from "../models/item.model";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {FactorioGraphComponent} from "../factorio-graph/factorio-graph.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatIcon, MatIconModule, NgForOf, RouterLink, FactorioGraphComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  items: SimpleItem[] = [];
  constructor(private itemService: ItemsService) {
  }

  ngOnInit() {
    this.getItemsData()
  }


  getItemsData() {
    this.itemService.getItems().subscribe({
      next: response => {
        this.items = response;
        console.log(this.items);
        },
      error: error => console.log('Erreur Recuperation Items :', error.message),
    });
  }
}
