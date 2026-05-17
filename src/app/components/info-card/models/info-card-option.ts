import { InfoCardTypeEnum } from './info-card-type';

export interface IInfoCardOption {
  type: InfoCardTypeEnum;
  value?: string;
  subValue?: string;

  chartType?: InfoCardChartType;

  chartData?: IChartPoint[];
}

export type InfoCardChartType = 'area' | 'bar';

export interface IChartPoint {
  x: string;
  y: number;
}
