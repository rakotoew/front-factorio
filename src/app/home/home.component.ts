import {Component, OnInit} from '@angular/core';
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {ItemsService} from "../services/items.service";
import {Craft, SimpleItem} from "../models/item.model";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {FactorioGraphComponent} from "../factorio-graph/factorio-graph.component";
import {ItemNode} from "../models/tree.model";
import {FactorioNetworkGraphComponent} from "../factorio-network-graph/factorio-network-graph.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatIcon, MatIconModule, NgForOf, RouterLink, FactorioGraphComponent, FactorioNetworkGraphComponent, NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  graphShown: boolean = false;
  items: SimpleItem[] = [];
  crafts: Craft[] = [];
  selectedItem: SimpleItem = {
    id: 0,
    name: "Storage tank",
    icon: "/icons/32px_Storage_tank.png",
    craft:[]
  }
  tree: ItemNode = {
    name: "test",
    quantity: 1,
    icon_path: "test",
    children: []
  }
  Itemstree: string[] = [];
  constructor(private itemService: ItemsService) {
  }

  ngOnInit() {
    this.getItemsData();
    this.getCraftsData();
  }



  getCraftsData() {
    this.itemService.getCrafts().subscribe({
      next: response => {
        this.crafts = response;
        console.log('craft', this.crafts);
      },
      error: error => console.log('Erreur Recuperation Crafts :', error.message),
    });
  }

  getAllItemsData() {
    this.itemService.getAllData().subscribe({
      next: response => {
        console.log('alldata',response);
      },
      error: error => console.log('Erreur Recuperation All Items :', error.message),
    });
  }


  getItemsData() {
    this.itemService.getItems().subscribe({
      next: response => {
        this.items = response;
        console.log('Items :', this.items);
        },
      error: error => console.log('Erreur Recuperation Items :', error.message),
    });
  }

  itemSelected(item: SimpleItem) {
    this.selectedItem = item;
    this.tree = this.generateItemsTree(item);
    console.log(this.tree.name, this.tree);
    this.Itemstree = this.tree2Table(this.tree, '');
    console.log(this.Itemstree);
  }

  generateItemsTree(item: SimpleItem): ItemNode {
    let tree: ItemNode = {
      name: item.name,
      quantity: 1,
      icon_path: item.icon,
      children: []
    }
    tree.children = [];
    let craft = this.findCraft(item.name);
    if (craft) {
      for (let ingredient of craft.ingredients) {
        let child = this.findItem(ingredient.name);
        if (child) {
          tree.children.push(this.generateItemsTree(child));
        }
      }
    }
    return tree;
  }

  tree2Table(tree: ItemNode, parent: string): string[] {
    let table: string[] = [];
    table.push(parent + tree.name);
    for (let child of tree.children) {
      table.push(...this.tree2Table(child, parent+tree.name+ '/'));
    }
    return table;
  }

  findCraft(itemName: string) {
    for (let craft of this.crafts) {
      if (craft.name == itemName) {
        return craft;
      }
    }
    return null;
  }

  findItem(itemName: string) {
    for (let item of this.items) {
      if (item.name == itemName) {
        return item;
      }
    }
    return null;
  }

  showGraph(bool: boolean) {
    this.graphShown = bool;
  }
}
