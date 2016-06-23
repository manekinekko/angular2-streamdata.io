import { Directive, ElementRef, Renderer, Input } from '@angular/core';
import * as d3 from 'd3';

@Directive({
  selector: 'bar-graph'
})
export class BarGraph {

  @Input() dataset: Array<number> = [];
  private el;
  private graph;
  private divs;

  constructor(elementRef: ElementRef, renderer: Renderer) {
    this.el = elementRef.nativeElement;
    this.graph = d3.select(this.el);
    this.divs = this.graph.
      append('div').
      attr({
        'class': 'chart'
      }).
      style({
        'width':  '100%'
      }).
      selectAll('div');

  }

  render(newValue) {
    if (!newValue) return;

    this.divs.data(this.dataset)
    .enter()
    .append('div')
    .style({
      'background-color': 'red',
      'display': 'inline-block',
      'width': '2px'
    })
    .style('height', function(d) {
        var barHeight = d * 2;
        return barHeight + 'px';
    });
  }

  ngOnInit() {}

  ngOnChanges() {
    this.render(this.dataset);
  }

}
