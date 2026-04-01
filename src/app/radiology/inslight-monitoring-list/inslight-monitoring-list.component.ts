import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { AuthService } from 'src/app/core/service/auth.service';

import Swal from 'sweetalert2';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexLegend,
  ApexFill,
  ApexResponsive,
} from "ng-apexcharts";
import { PatientServiceService } from 'src/app/services/patient-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  responsive: ApexResponsive[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  colors: string[];
};

export interface Reportdoc {
  // image : string;
  no: any;
  radiology_id: any;
  radiology_name: any;
  total_booking: any;
  total_patients: any;
  total_males: any;
  total_females: any;
  pin_code: any;
}

interface Food {
  value: string;
  viewValue: string;
}
const ELEMENT_DATA: Reportdoc[] = [];


@Component({
  selector: 'app-inslight-monitoring-list',
  templateUrl: './inslight-monitoring-list.component.html',
  styleUrls: ['./inslight-monitoring-list.component.sass']
})
export class InslightMonitoringListComponent implements OnInit {
  InslightMoteringForm: FormGroup;
  lebListData: [];
  public barChartLabOptions: Partial<ChartOptions>;
  public barChartRadioOptions: Partial<ChartOptions>;
  public barChartClinicOptions: Partial<ChartOptions>;
  user_id: any;
  filter_by: any;
  lab_id: any;
  appointment_date: any;
  to_date: any
  from_date: any;
  month: any;
  year: any;
  age_group: any;
  gender: any;
  blood_group: any;
  lineChartLabellab: string[];
  radioListData: [];
  clinicData: [];
  total_booking: any;
  maxDate = new Date();

  //mat-tablle-filter
  @ViewChild('empTbSort') empTbSort = new MatSort();
  sort: MatSort;
  urlparameter: any;
  day = false;
  weekly = false;
  monthly = false;
  yearly = false;
  daly = false;
  totalCountAppointment: number;
  totalBookingCountLab: any = [];
  totalBookingCountRadio: any = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource3 = new MatTableDataSource(ELEMENT_DATA);
 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }

  displayedColumns: string[] = [
    "no",
    // "radiology_id",
    // "radiology_name",
    "total_booking",
    "complete",
    "future",
    "total_males",
    "total_females",
    "pin_code"
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private patientServiceService: PatientServiceService,
  ) {
    this.InslightMoteringForm = this.fb.group({
      user_id: [""],
      gender: [""],
      filter_by: [""],
      age_group: [""],
      blood_group: [""],
      appointment_date: [""],
      from_date: [""],
      to_date: [""],
      month: [""],
      year: [""],
      week: [""],
      pin_code: [""]
    });
  }

  ngOnInit(): void {
    this.generateReportRadio();
    // this.insightAppointmant();
    this.Radiochart();
    this.maxDate;
  }

  onSubmit() {

  }

 

  changedivradio(divid) {
    if (divid === "day") {
      this.day = true;
      this.weekly = false;
      this.monthly = false;
      this.yearly = false;
    }
    else if (divid === "weekly") {
      this.day = false;
      this.weekly = true;
      this.monthly = false;
      this.yearly = false;
    }
    else if (divid === "monthly") {
      this.day = false;
      this.weekly = false;
      this.monthly = true;
      this.yearly = false;
    } else if (divid === "yearly") {
      this.day = false;
      this.weekly = false;
      this.monthly = false;
      this.yearly = true;
    }

  }




  // add radio

  generateReportRadio() {
    this.user_id = this.authService.currentUserValue.userid;

    this.totalBookingCountRadio = [];
    const data = {
      user_id: this.authService.currentUserValue.userid,
      role_id: 4,
      filter_by: this.InslightMoteringForm.value.filter_by,
      lab_id: this.InslightMoteringForm.value.lab_id,
      appointment_date: this.InslightMoteringForm.value.appointment_date,
      from_date: this.InslightMoteringForm.value.from_date,
      to_date: this.InslightMoteringForm.value.to_date,
      week: this.InslightMoteringForm.value.week,
      month: this.InslightMoteringForm.value.month,
      year: this.InslightMoteringForm.value.year,
      age_group: this.InslightMoteringForm.value.age_group,
      gender: this.InslightMoteringForm.value.gender,
      blood_group: this.InslightMoteringForm.value.blood_group,
      pin_code: this.InslightMoteringForm.value.pin_code,
    }
    this.patientServiceService.insightAppointmant(data).subscribe((res:any)=>{
      this.dataSource3 = new MatTableDataSource(res.data);
      this.dataSource3.sort = this.empTbSort;
      this.dataSource3.paginator = this.paginator;


  var sumRadioTotalBooking: number = res.data.map(a => a.total_booking).reduce(function(a, b)
  {
   return a + b;
  });
  
   if(res.status_code === 200){
     this.totalBookingCountRadio.push(sumRadioTotalBooking);
     setTimeout(() => {
       this.Radiochart();
     }, 800);
  
   }
   
  },(error:any)=>{
   Swal.fire(
     '',
     error.message,
     'error'
   )
  })
  
  }
  
  
  insightAppointmant() {
  
    this.user_id = this.authService.currentUserValue.userid;

    const data = {
      user_id: this.authService.currentUserValue.userid,
      role_id: 4,
      filter_by: this.InslightMoteringForm.value.filter_by,
      lab_id: this.InslightMoteringForm.value.lab_id,
      appointment_date: this.InslightMoteringForm.value.appointment_date,
      from_date: this.InslightMoteringForm.value.from_date,
      to_date: this.InslightMoteringForm.value.to_date,
      week: this.InslightMoteringForm.value.week,
      month: this.InslightMoteringForm.value.month,
      year: this.InslightMoteringForm.value.year,
      age_group: this.InslightMoteringForm.value.age_group,
      gender: this.InslightMoteringForm.value.gender,
      blood_group: this.InslightMoteringForm.value.blood_group,
      pin_code: this.InslightMoteringForm.value.pin_code,
    }

    this.patientServiceService.insightAppointmant(data).subscribe((res: any) => {
      this.dataSource3 = res.data;
      this.dataSource3 = new MatTableDataSource(res.data);
      this.dataSource3.sort = this.empTbSort;
      this.dataSource3.paginator = this.paginator;
    }, (error: any) => {
      Swal.fire(
        '',
        error.message,
        'error'
      )
    })
  }

  private Radiochart() {
    // console.log(this.totalBookingCountRadio);
    this.barChartRadioOptions = {
      series: [
        {
          name: "Radiology Total Booking",
          data: this.totalBookingCountRadio
        },
      
      ],
      chart: {
        type: "bar",
        height: 300,
        foreColor: "#9aa0ac",
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "10%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: "category",
        categories: ["Count"],
      },
      legend: {
        show: false,
      },
      fill: {
        opacity: 0.8,
        colors: ["#01B8AA", "#374649", "#FD625E", "#F2C80F"],
      },
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

  resetForm() {
    this.InslightMoteringForm.reset();
  }


}
