import { Component, computed, input, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexGrid,
  ApexPlotOptions,
  ApexResponsive,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  ChartComponent,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { IChartPoint } from '../info-card/models';

export type DetailedChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  tooltip: ApexTooltip;
  colors: string[];
  responsive: ApexResponsive[];
};

@Component({
  selector: 'app-detailed-chart',
  imports: [NgApexchartsModule],
  templateUrl: './detailed-chart.html',
})
export class AppDetailedChartComponent {
  @ViewChild('chart') chart?: ChartComponent;

  public chartTitle = input<string>('');
  public values = input<IChartPoint[]>([]);
  public chartOptions = computed<DetailedChartOptions>(() => {
    const today = new Date();
    const start = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      0,
      0,
      0,
    ).getTime();

    const end = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1,
      0,
      0,
      0,
    ).getTime();
    return {
      series: [
        {
          name: this.chartTitle(),
          data: this.values().map((i) => ({ x: new Date(i.x).getTime(), y: i.y })),
        },
      ],
      chart: {
        type: 'area',
        height: 400,
        toolbar: {
          show: false,
        },
        animations: {
          enabled: true,
        },
        fontFamily: 'Inter, sans-serif',
        zoom: {
          enabled: false,
        },
      },
      colors: ['#f59e0b'],
      plotOptions: {
        bar: {
          borderRadius: 6,
          columnWidth: '55%',
        },
      },
      dataLabels: {
        enabled: false,
      },

      xaxis: {
        type: 'datetime',
        min: start,
        max: end,
        tickAmount: 12,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          formatter: (value) => {
            const date = new Date(value);
            const hours = date.getHours();
            if (hours === 0) {
              return '';
            }
            return hours % 2 === 0 ? `${hours}h` : '';
          },
        },
        tooltip: { enabled: false },
      },
      yaxis: {
        labels: {
          style: {
            colors: '#6b7280',
          },
        },
      },
      grid: {
        borderColor: '#e5e7eb',
        strokeDashArray: 4,
      },
      tooltip: {
        custom: ({ seriesIndex, dataPointIndex, w }) => {
          const point = w.config.series[seriesIndex].data[dataPointIndex] as IChartPoint;
          const date = new Date(point.x).toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
          });

          return `
          <div style="padding:10px;min-width:140px">
            <div style="font-size:12px;color:#9ca3af">
              ${date}
            </div>

            <div style="font-weight:600;margin-top:4px">
              ${point.y} °C
            </div>

            <div style="font-size:11px;color:#9ca3af;margin-top:2px">
              ${this.chartTitle()}
            </div>
          </div>
        `;
        },
      },
      responsive: [
        {
          breakpoint: 640,
          options: {
            chart: {
              height: 260,
            },
          },
        },
      ],
    };
  });
}
