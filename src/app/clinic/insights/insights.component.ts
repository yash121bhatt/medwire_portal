import { Component, OnInit, ViewChild } from "@angular/core";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexFill,
  ApexTooltip,
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

declare const ApexCharts: any;

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.sass']
})
export class InsightsComponent implements OnInit {
  @ViewChild("chart", { static: true }) chart: ChartComponent;
  public areaChartOptions: any;
  public barChartOptions: any;
  public barChartOptions2: any;
  constructor() { }

  ngOnInit() {
    this.chart1();
    this.chart2();
    this.chart3();
    
  }
  private chart1() {
    this.areaChartOptions = {
      chart: {
        height: 300,
        type: "area",
        foreColor: "#9aa0ac",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      series: [
        {
          name: "Total Patients",
          data: [31, 40, 28, 51, 31, 40, 28, 51, 42, 109, 100, 42, 109, 100, 109, 100, 42],
        },
      ],

      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:30:00",
          "2018-09-19T01:30:00",
          "2018-09-19T02:30:00",
          "2018-09-19T03:30:00",
          "2018-09-19T04:30:00",
          "2018-09-19T05:30:00",
          "2018-09-19T06:30:00",
          "2018-09-19T07:30:00",
          "2018-09-19T08:30:00",
          "2018-09-19T09:30:00",
          "2018-09-19T10:30:00",
          "2018-09-19T11:30:00",
          "2018-09-19T12:30:00",
          "2018-09-19T13:30:00",
          "2018-09-19T14:30:00",
          "2018-09-19T15:30:00",
          "2018-09-19T16:30:00",
          "2018-09-19T17:30:00",
        ],
        labels: {
          style: {
            colors: "#9aa0ac",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            color: "#9aa0ac",
          },
        },
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    };
  };
  private chart2() {
    this.barChartOptions = {
      series: [
        {
          name: "Male Patients",
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 88, 48, 63],
          
        },
        {
          name: "Female Patients",
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 74, 99, 87],
        },
      ],
      chart: {
        type: "bar",
        height: 300,
        foreColor: "#9aa0ac",
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "75%",
          borderRadius: 5,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 8,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        labels: {
          style: {
            colors: "#9aa0ac",
          },
        },
      },
      yaxis: {
        title: {
          text: "Total Patients",
        },
      },
      fill: {
        opacity: 1,
      },
      
      colors: ['#2DA9D9', '#B73377'],
      tooltip: {
        theme: "dark",
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    };
  };
  private chart3() {
    this.barChartOptions2 = {
      series: [
        {
          name: "0yr to 18yr",
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 88, 48, 63],
        },
        {
          name: "19yr to 40yr",
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 74, 99, 87],
        },
        {
          name: "41yr to 55yr",
          data: [28, 47, 85, 41, 57, 45, 31, 24, 54, 64, 79, 87],
        },
        {
          name: "56yr to More",
          data: [31, 24, 54, 64, 85, 41, 57, 45, 87, 79, 54, 47,],
        },
      ],
      
      chart: {
        type: "bar",
        height: 300,
        foreColor: "#9aa0ac",
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "80%",
          borderRadius: 0,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 5,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        labels: {
          style: {
            colors: "#9aa0ac",
          },
        },
      },
      yaxis: {
        title: {
          text: "Total Patients",
        },
      },
      fill: {
        opacity: 1,
      },
      colors:['#43B46C', '#D4374F', '#3867A0', '#DD9B45'],
      tooltip: {
        theme: "dark",
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    };
  }
}
