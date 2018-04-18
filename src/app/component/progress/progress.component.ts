import {Component, Input, OnInit} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.styl']
})
export class ProgressComponent implements OnInit {

  @Input() count = 5;

  constructor() {
  }

  ngOnInit() {

    const svg = d3.select('.progress');
    const w = parseInt(svg.style('width'), 10);
    const h = parseInt(svg.style('height'), 10);
    const group = svg.append('g');
    const pie = d3.pie().endAngle(0);
    group.attr('transform', `translate(${w / 2},${h / 2})`);
    const r = Math.min(w, h) / 2;
    const arc = d3.arc().outerRadius(r).innerRadius(r * 0.8).startAngle(0)
    const text = group.append('text');
    text.text(10).attr('text-anchor', 'middle').attr('alignment-baseline', 'middle');
    function arcTween() {
      return function (d) {
        debugger;
        const interpolate = d3.interpolate(d.endAngle, Math.PI * 2);
        return function (t) {
          d.endAngle = interpolate(t);
          return arc(d);
        };
      };
    };

    const timer = d3.timer((elapsed)=>{
      text.text((+text.text()) - 1);
      if(elapsed>this.count*1000) {
        timer.stop();
      }
    },0,1000)
  group.selectAll('.value').data(pie([this.count])).enter().append('path').attr('d', <any>arc)
.attr('fill', 'red')
.transition().ease(d3.easeLinear).duration(1000 * this.count).attrTween('d', arcTween()).attr('fill', '#050');


}


}
