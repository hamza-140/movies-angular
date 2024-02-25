import { Component, OnInit } from '@angular/core';
import { single } from '../data';
import { Color, ColorHelper, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-box-chart',
  templateUrl: 'box-chart-component.component.html',
  styleUrls: ['box-chart-component.component.css'],
})
export class BoxChartComponent {
  single: any[];

  constructor() {
    // Sample data
    this.single = [
      {
        name: 'Germany',
        value: 8940000,
      },
      {
        name: 'USA',
        value: 5000000,
      },
      {
        name: 'France',
        value: 7200000,
      },
    ];
  }

  // Customize color scheme
  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: [
      '#5AA454',
      '#A10A28',
      '#C7B42C',
      '#AAAAAA',
      '#AABBCC',
      '#AACCDD',
      '#AADDFF',
      '#AAEEFF',
      '#AAFFEE',
      '#AAFFDD',
      '#AAFFCC',
      '#AAFFBB',
      '#AAFFAA',
      '#AAEEAA',
      '#AADDAA',
      '#AACCAA',
      '#AABBAA',
      '#AA99AA',
      '#AA88AA',
      '#AA77AA',
      '#AA66AA',
      '#AA55AA',
      '#AA44AA',
      '#AA33AA',
      '#AA22AA',
      '#AA11',
    ],
  };

  // Define custom label formatting
  xAxisLabel = 'Country';
  yAxisLabel = 'Population';
  onSelect() {
    console.log('Hi');
  }
}
