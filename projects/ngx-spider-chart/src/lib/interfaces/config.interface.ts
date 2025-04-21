import * as d3 from 'd3';
import { IDataset } from './dataset.interface';
import { ISpiderChartAttribute } from './spider-chart-attribute.interface';

export interface ISpiderChartConfig {
  w: number;
  h: number;
  fullScreen: boolean;
  levels: number;
  maxValue: number;
  labelFactor: number;
  wrapWidth: number;
  opacityArea: number;
  dotRadius: number;
  opacityCircles: number;
  strokeWidth: number;
  color: d3.ScaleOrdinal<string, string>;
  attributes: ISpiderChartAttribute[];
  datasets: IDataset[];
}
