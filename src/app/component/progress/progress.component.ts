import {Component, Input, OnInit} from '@angular/core';
import * as d3 from 'd3';
import {applyFont} from '../../utils/d3-utils';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.styl']
})
export class ProgressComponent implements OnInit {

  @Input('count') count = 5000;
  @Input() config = {
    size: {rmpStart: 0.7, rmpEnd: 1},
    color: {start: '#deffff', end: '#59ffc5', center: '#423e44'},
    font: {size: '1.2em', fill: '#71978d', weight: 'bold'}
  };

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
    const arc = d3.arc().outerRadius(r * this.config.size.rmpEnd).innerRadius(r * this.config.size.rmpStart).startAngle(0);
    group.append('circle').attr('r', r * this.config.size.rmpStart).attr('fill', this.config.color.center);
    const text = group.append('text');
    applyFont(text, this.config.font);
    text.attr('text-anchor', 'middle').attr('alignment-baseline', 'middle');

    function arcTween() {
      return function (d) {
        const interpolate = d3.interpolate(0, Math.PI * 2);
        return function (t) {
          d.endAngle = interpolate(t);
          return arc(d);
        };
      };
    };


    group.selectAll('.progress').data(pie([this.count])).enter().append('path').classed('progress', true);
    group.selectAll('.value').data(pie([this.count])).enter().append('path').classed('value2', true);
    const figure = group.selectAll('.progress');


    const animation = () => {
      text.text(this.count / 1000).transition().ease(d3.easeLinear).duration(this.count).on('start', function repeat() {
        d3.active(this)
          .tween('text', function () {
            const that = d3.select(this);
            const i = d3.interpolateNumber(+that.text(), 0);
            return function (t) {
              that.text(~~i(t));
            };
          });

      });
      figure.attr('d', <any>arc).attr('opacity', 1)
        .attr('fill', this.config.color.start)
        .transition().ease(d3.easeLinear).duration(this.count)
        .attrTween('d', arcTween()).attr('fill', this.config.color.end).transition().duration(1000).attr('opacity', 0).on('end', animation);
    };
    animation();


  }


}
