import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as Plot from '@observablehq/plot'

@Component({
  selector: 'app-factorio-graph',
  standalone: true,
  imports: [
  ],
  templateUrl: './factorio-graph.component.html',
  styleUrl: './factorio-graph.component.scss'
})
export class FactorioGraphComponent implements OnInit, AfterViewInit{
  div: Element | null = null;

  gods = [
    "Chaos/Gaia/Mountains",
    "Chaos/Gaia/Pontus",
    "Chaos/Gaia/Uranus",
    "Chaos/Eros",
    "Chaos/Erebus",
    "Chaos/Tartarus"
  ];
  strings = [
    'assets/icons/32px_Wooden_chest.png',
    'assets/icons/32px_Iron_chest.png',
    'assets/icons/32px_Steel_chest.png',
    'assets/icons/32px_Storage_tank.png',
    'assets/icons/32px_Transport_belt.png',
    'assets/icons/32px_Fast_transport_belt.png',
    ];

  items = [
    "Wooden chest/Wood",
    "Iron chest/Iron plate",
    "Iron chest/Iron plate/Iron ore",
  ];

  findImage(name: string): string {
    let result = 'assets/icons/32px_';
    name.replace(" ", "_");
    result += name;
    result += ".png";
    return result;
  }
  ngOnInit() {

  }
  ngAfterViewInit() {
    this.div = document.querySelector("#plot");
    const plot = Plot.plot({
      axis: null,
      height: 100,
      margin: 10,
      marginLeft: 40,
      marginRight: 120,
      marks: [
        Plot.tree(this.items, {stroke: "#A27B5C", fill: "none", strokeWidth: 1, textStroke: "#A27B5C", fontSize: 8}),
      ]
    })
    if(this.div) {
      this.div.append(plot);
    } else {
      console.log("div is null");
    }
  }
}
