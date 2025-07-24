import { IPolygonColor } from './polygon-color.interface';

export interface IDataset {
  title?: string;
  label?: string;
  keys: string[];
  values: Record<string, number>;
  polygon_color?: IPolygonColor;
}
