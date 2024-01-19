export interface Item {
  id: number;
  name: string;
  class: string;
  craft: number[];
  icons: string;
}

export interface SimpleItem {
  id: number;
  name: string;
  icon: string;
  craft: number[];
}

export interface Craft {
  name: string;
  time: number;
  ingredients: Ingredient[];
}

export interface Ingredient {
  ingredient: string;
  amount: number;
}

export interface Product {
  product: Item;
  amount: number;
}
