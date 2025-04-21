import { IPolygonColor } from './polygon-color.interface';

export interface IDataset {
  title: string;
  keys: string[];
  values: Record<string, number>;
  polygon_color?: IPolygonColor;
}
