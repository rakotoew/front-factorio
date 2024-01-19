import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import * as Plot from '@observablehq/plot'
import {auto} from "@observablehq/plot";

@Component({
  selector: 'app-factorio-graph',
  standalone: true,
  imports: [
  ],
  templateUrl: './factorio-graph.component.html',
  styleUrl: './factorio-graph.component.scss'
})
export class FactorioGraphComponent implements OnInit, AfterViewInit{
  @Input() items!: string[];
  div: Element | null = null;

  findImage(name: string): string {
    let result = 'assets/icons/32px_';
    name.replace(" ", "_");
    result += name;
    result += ".png";
    return result;
  }
  ngOnInit() {
    this.items = [
      "Storage tank",
      "Storage tank/Steel plate",
      "Storage tank/Steel plate/Iron plate",
      "Storage tank/Steel plate/Iron plate/Iron ore",
      "Storage tank/Iron plate",
      "Storage tank/Iron plate/Iron ore",

    ]
  }
  ngAfterViewInit() {
    this.div = document.querySelector("#plot");
    if (this.items.length != 0) {
      const plot = Plot.plot({
        axis: null,
        margin: 10,
        marginLeft: 100,
        marginRight: 100,
        marks: [
          Plot.tree(this.items, {stroke: "#A27B5C", strokeWidth: 2, fill: "#DCD7C9", textStroke: null, fontSize: 14}),
        ]
      })
      if (this.div) {
        this.div.append(plot);
      } else {
        console.log("div is null");
      }
    }
  }
}
