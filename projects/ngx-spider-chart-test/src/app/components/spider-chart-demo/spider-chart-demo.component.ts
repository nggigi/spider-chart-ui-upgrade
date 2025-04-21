import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import * as d3 from 'd3';
import { demoPolygonColors, IDataset, IPolygonColor, ISpiderChartAttribute, ISpiderChartConfig } from 'ngx-spider-chart';
import { arraySizeValidator } from './arraySizeValidator';

@Component({
  selector: 'app-spider-chart',
  templateUrl: './spider-chart-demo.component.html',
  styleUrls: ['./spider-chart-demo.component.scss'],
})
export class SpiderChartDemoComponent implements OnInit {
  arrayControl: FormControl;
  datasets: Array<IDataset> = [];
  polygon_colors: Array<IPolygonColor>;
  config: ISpiderChartConfig = this.getInitialConfig();
  fb = inject(FormBuilder);
  datasetLimitExceed = null;

  ngOnInit(): void {
    this.polygon_colors = demoPolygonColors;
    this.arrayControl = this.fb.control('', [arraySizeValidator(6, 15)]);
  }

  onSubmit(): void {
    if (this.arrayControl.valid) {
      const attributes = this.parseInputArray(this.arrayControl.value);
      this.resetDatasets();
      this.config.attributes = attributes;
      this.addDataset();
    }
  }

  addDataset(): void {
    if (this.datasets?.length >= 15) {
      this.datasetLimitExceed = 'Data set Limit exceed';
      return;
    }
    const newDataset = this.createDataset();
    if (newDataset) {
      this.datasets = [...this.datasets, newDataset];
      this.updateConfigDatasets();
    }
  }

  removeDataset(removeIndex: number): void {
    this.datasets.splice(removeIndex, 1);
    this.datasets = this.datasets.map((dataset, index) => ({ ...dataset, title: `Dataset ${index + 1}` }));
    this.updateConfigDatasets();
  }

  resetDatasets(): void {
    this.datasets = [];
    this.updateConfigDatasets();
  }

  updateDatasetValue(dataset: IDataset, key: string, target: HTMLInputElement): void {
    const value = parseFloat(target.value);
    if (isNaN(value)) {
      console.error(`Invalid value provided for ${key}`);
      return;
    }
  }

  public onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.datasets.length === 0 ? this.onSubmit() : this.addDataset();
    }
  }

  public updateDataset(isReset = false, attributes: ISpiderChartAttribute[]): void {
    this.datasets = this.datasets.map((dataset) => {
      const values = attributes.reduce((acc, attr) => ({ ...acc, [attr.key]: isReset ? 0 : (dataset.values[attr.key] ?? 0) }), {});
      return { ...dataset, keys: Object.keys(values), values };
    });
  }

  private updateConfigDatasets(): void {
    this.config.datasets = [...this.datasets];
    this.datasetLimitExceed = null;
  }

  private parseInputArray(input: string): ISpiderChartAttribute[] {
    return input
      .split(',')
      .map((value) => value.trim())
      .filter((value) => value)
      .map((attr) => {
        return {
          key: attr,
          text: attr,
        };
      });
  }

  private createDataset(): IDataset {
    const attributes: ISpiderChartAttribute[] = this.parseInputArray(this.arrayControl.value);
    if (attributes?.length !== this.config.attributes?.length) {
      this.updateDataset(true, attributes);
      this.config.attributes = attributes;
      this.createDataset();
    }
    if (this.config.attributes.toString() !== attributes?.toString()) {
      this.config.attributes = attributes;
      this.updateDataset(false, attributes);
    }
    const values = this.config.attributes.reduce((acc, attr) => ({ ...acc, [attr.key]: 0 }), {});
    return { title: `Dataset ${this.datasets.length + 1}`, keys: Object.keys(values), values };
  }

  private getInitialConfig(): ISpiderChartConfig {
    return {
      w: 200,
      h: 200,
      levels: 5,
      maxValue: 35,
      fullScreen: false,
      labelFactor: 1.25,
      wrapWidth: 60,
      opacityArea: 0.35,
      dotRadius: 3,
      opacityCircles: 0.1,
      strokeWidth: 2,
      color: d3.scaleOrdinal().range(['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd']),
      attributes: [],
      datasets: [],
    };
  }
}
