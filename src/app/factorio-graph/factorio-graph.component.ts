import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as Plot from '@observablehq/plot'

@Component({
  selector: 'app-factorio-graph',
  standalone: true,
  imports: [
  ],
  templateUrl: './factorio-graph.component.html',
  styleUrl: './factorio-graph.component.scss'
})
export class FactorioGraphComponent implements OnInit, AfterViewInit, OnChanges{
  @Input() items!: string[];
  div: Element | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    this.ngAfterViewInit();
  }
  constructor() {
  }

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
    this.div?.firstElementChild?.remove(); // remove the old tree graph
    this.div = document.querySelector("#plot");
    if (this.items.length != 0) {
      const plot = Plot.plot({
        axis: null,
        margin: 10,
        marginLeft: 150,
        marginRight: 100,
        marks: [
          Plot.tree(this.items, {stroke: "#A27B5C", strokeWidth: 2, fill: "#DCD7C9", textStroke: null, fontSize: 12}),
        ],
        width: 400+ Math.min(this.items.length, 100) * 15,
        height: 600
      })
      if (this.div) {
        this.div.append(plot);
      } else {
        console.log("div is null");
      }
    }
  }
}
