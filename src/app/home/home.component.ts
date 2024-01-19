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
  itemsTree: string[] = [];
  constructor(private itemService: ItemsService) {
  }

  ngOnInit() {
    this.getItemsData();
    this.getCraftsData();
  }



  getCraftsData() {
    this.itemService.getCrafts().subscribe({
      next: response => {
        console.log(response);
      },
      error: error => console.log('Erreur Recuperation Crafts :', error.message),
    });
  }

  getAllItemsData() {
    this.itemService.getAllData().subscribe({
      next: response => {
        console.log(response);
      },
      error: error => console.log('Erreur Recuperation All Items :', error.message),
    });
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

  itemSelected(item: SimpleItem) {
    console.log(item);
    this.generateItemsTree(item.name);
    console.log(this.itemsTree);
  }

  generateItemsTree(itemName: string): void {
    const selectedItem = this.items.find(item => item.name === itemName);

    if (!selectedItem) {
      console.error(`Item with name ${itemName} not found.`);
      return;
    }

    this.generatePaths(selectedItem.name, selectedItem.craft);
  }

  generatePaths(currentPath: string, dependencies: number[]): void {
    if (dependencies.length === 0) {
      this.itemsTree.push(currentPath);
      return;
    }

    dependencies.forEach(dependencyId => {
      const dependencyItem = this.items.find(item => item.id === dependencyId);
      console.log(dependencyId);
      if(dependencyItem) {
        const newPath = `${currentPath}/${dependencyItem.name}`;
        this.generatePaths(newPath, dependencyItem.craft);
      }
    });
  }


}
