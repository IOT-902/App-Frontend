// info-card.ts

import { Component, computed, input } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

import {
  NgApexchartsModule,
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexStroke,
  ApexTooltip,
} from 'ng-apexcharts';

import { InfoCardIcon } from '../info-card-icon/info-card-icon';

import { IInfoCardOption } from './models/info-card-option';
import { InfoCardTypeEnum } from './models/info-card-type';
import { Skeleton } from '../skeleton/skeleton/skeleton';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  stroke: ApexStroke;
  fill: ApexFill;
  tooltip: ApexTooltip;
  colors: string[];
};

@Component({
  selector: 'app-info-card',
  imports: [InfoCardIcon, Skeleton, UpperCasePipe, NgApexchartsModule],
  templateUrl: './info-card.html',
})
export class InfoCard {
  protected readonly InfoCardTypeEnum = InfoCardTypeEnum;
  public data = input.required<IInfoCardOption | undefined>();
  public title = computed(() => {
    const data = this.data();
    if (!data) {
      return 'unknown';
    }
    switch (data.type) {
      case InfoCardTypeEnum.localisation:
        return 'localisation';
      case InfoCardTypeEnum.temperature:
        return 'température';
      case InfoCardTypeEnum.pollutionA:
        return 'pollution A';
      case InfoCardTypeEnum.pollutionB:
        return 'pollution B';
      default:
        return 'unknown';
    }
  });

  public value = computed(() => {
    const data = this.data();

    if (!data || !data.value) {
      return undefined;
    }

    switch (data.type) {
      case InfoCardTypeEnum.localisation:
        return data.value;
      case InfoCardTypeEnum.temperature:
        return `${data.value} °C`;
      case InfoCardTypeEnum.pollutionA:
      case InfoCardTypeEnum.pollutionB:
        return `${data.value} µg/m³`;
      default:
        return data.value;
    }
  });

  public icon = computed(() => {
    const data = this.data();
    if (!data) {
      return 'info';
    }
    switch (data.type) {
      case InfoCardTypeEnum.localisation:
        return 'location_on';
      case InfoCardTypeEnum.temperature:
        return 'device_thermostat';
      case InfoCardTypeEnum.pollutionA:
      case InfoCardTypeEnum.pollutionB:
        return 'home';
      default:
        return 'info';
    }
  });

  public isLocalisation = computed(() => this.data()?.type === InfoCardTypeEnum.localisation);

  public hasValue = computed(() => this.value() !== undefined);

  public hasChartData = computed(() => !!this.data()?.chartData?.length);

  public hasSubValue = computed(() => !!this.data()?.subValue);

  public shouldShowChart = computed(() => !this.isLocalisation() && this.hasChartData());

  public shouldShowChartLoader = computed(() => !this.isLocalisation() && !this.hasChartData());

  public shouldShowSubValue = computed(() => this.isLocalisation() && this.hasSubValue());

  public shouldShowSubValueLoader = computed(() => this.isLocalisation() && !this.hasSubValue());

  public chartOptions = computed<Partial<ChartOptions>>(() => {
    const chartType = this.data()?.chartType ?? 'area';
    const chartData = this.data()?.chartData ?? [];
    return {
      series: [
        {
          name: this.title(),
          data: chartData,
        },
      ],

      chart: {
        type: chartType,
        height: 40,

        sparkline: {
          enabled: true,
        },

        toolbar: {
          show: false,
        },
      },

      colors: ['#f59e0b'],

      stroke: {
        curve: 'smooth',
        width: chartType === 'area' ? 2 : 0,
      },

      fill: {
        type: chartType === 'area' ? 'gradient' : 'solid',

        gradient: {
          opacityFrom: 0.4,
          opacityTo: 0,
        },
      },

      tooltip: {
        enabled: true,

        custom: ({ seriesIndex, dataPointIndex, w }) => {
          const point = w.config.series[seriesIndex].data[dataPointIndex];

          return `
            <div style="padding:10px">
              <div>${point.x}</div>
              <div>${point.y}</div>
            </div>
          `;
        },
      },
    };
  });
}
