import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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
  ApexNonAxisChartSeries,
  ApexMarkers,
  ApexGrid,
  ApexTitleSubtitle,
  ApexResponsive,
  ApexFill,
}
  from "ng-apexcharts";
import { map, Observable } from "rxjs";
import { AuthService } from "src/app/core/service/auth.service";
import { PatientServiceService } from "../../services/patient-service.service";
import { PatientdataService } from 'src/app/services/patientdata.service'
import { environment } from "src/environments/environment";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';



export type performanceRateChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  tooltip: ApexTooltip;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};
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


interface USERS {
  img: any;
  first_name: string;
}

interface ReportDoc {
  member_id: string | Number;
  heart_rate: any;
  createdate: any;
  user_id: any;
}

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.sass"],
})

export class DashboardComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public performanceRateChartOptions: Partial<performanceRateChartOptions>;
  public performanceRateChartbloodpresOptions: any;
  public performanceRateChartresirateOptions: any;
  public performanceRateChartoxysatOptions: any;
  public performanceRateCharttempOptions: any;
  public performanceRateChartbmiOptions: any;
  public chartOptions: Partial<ChartOptions>;
  public areaChartOptions1: Partial<ChartOptions>;
  public areaChartOptions2: Partial<ChartOptions>;
  public areaChartOptions3: Partial<ChartOptions>;
  public areaChartOptions4: Partial<ChartOptions>;
  public areaChartOptions5: Partial<ChartOptions>;
  public areaChartOptions6: Partial<ChartOptions>;

  state$: Observable<object>;
  user_id: any;
  token: any;
  url: string;
  dashboardLastparameter: string;

  Data: any[];
  Users: USERS[] = [

  ];
  heart_rate: any;
  BMI: any;
  temperature: any;
  personalID: number;
  member_id: any;
  oxygen_saturation: any;
  respiratory_rate: any;
  blood_pressure: any;
  imageURL = `${environment.documentUrl}`;
  imageDoc = `${environment.labDocumentUrl}`;
  datarespose: any;
  heartRate_filterdata: string = '';
  heartRate_filterType: string = 'weekly';
  graph_filterType: string;
  dataSource: [];
  closeResult: string;
  error_message: boolean = false;
  error_message_text: string;
  deleteId: any;
  dataSourceTestreport: any;
  highBloodPressure_Data: any[];
  lowBloodPressure_Data: any[];
  heartData: any[];
  respiratoryData: any[];
  oxygenData: any[];
  temperatureData: any[];
  bmiData: any[];
  monthName: any[];
  dayName1: any[];
  dayName2: any[];
  dayName3: any[];
  dayName4: any[];
  dayName5: any[];
  dayName6: any[];
  titleName1: any;
  titleName2: any;
  titleName3: any;
  titleName4: any;
  titleName5: any;
  titleName6: any;
  labReport: [];
  chartGraphDate: any;
  vacReport: any;
  procedureReport: any;
  dischargeReport: any;
  billsReport: any;
  insuranceReport: any;
  labReportList: any;
  showAge: number;
  redirectID: string;
  bpCondition: boolean = false;
  heartRateCondition: boolean = false;
  respiratoryCondition: boolean = false;
  oxygenCondition: boolean = false;
  temperatureCondition: boolean = false;
  bmiCondition: boolean = false;
  blood_pressureCount: any;
  htmlReturn: string;
  dicomUrl = `${environment.dicomUrl}`;
  editbtnCondition : boolean = false;
  isDisable: string;
  latestlabRadioReport: any;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private patientServiceService: PatientServiceService,
    private sanitizer: DomSanitizer,
    private patientdataService: PatientdataService,
    private modalService: NgbModal
  ) {
    

  }

  ngOnInit() {

    this.route.queryParams.subscribe((params) => {
      if(params['payment_status']!='' && params['payment_status']!=undefined){
       
        let payment_status = params['payment_status'];
        const otherpaymentStatus =  'Payment '+payment_status;
         if(payment_status=='Success'){
          Swal.fire(
            '',
            'Payment Success',
            'success'
          )
         }else{
          Swal.fire(
            '',
            otherpaymentStatus,
            'error',
        
          )
         }
      }
     
    });

    //Profile API

    if ((this.authService.currentUserValue.address == null || this.authService.currentUserValue.address == '') || (this.authService.currentUserValue.pin_code == null || this.authService.currentUserValue.pin_code == '')) {

      Swal.fire(
        '',
        `${environment.profileCompleteMessage}`,
        'info'
      )
      this.router.navigate(["/patient/editprofile"]);

    }
    else {

    }
    this.user_id = this.authService.currentUserValue.userid;
    this.redirectID = this.route.snapshot.paramMap.get('type');
    const data = { id: atob(this.route.snapshot.paramMap.get('type')) };
    // console.log(this.user_id);
   // if(this.authService.currentUserValue.userid == atob(this.route.snapshot.paramMap.get('type'))){
      this.editbtnCondition =true;
    // }
    // else{
    //   this.editbtnCondition =false;
    // }

    this.patientServiceService.profile(data).subscribe(
      (result) => {
        this.Users = result.data;
      },

      (err) => {
        console.log(err);
      }
    );

    const latestlabRadioReport = {
      "member_id": atob(this.route.snapshot.paramMap.get('type')),
    }

    this.patientdataService.getLatestReport(latestlabRadioReport).subscribe(
      (result) => {
        this.latestlabRadioReport = result.data;
      },
      (err) => {
        console.log(err);
      }
    );

    //Lab Report List API
    const labReportList = {
      "member_id": atob(this.route.snapshot.paramMap.get('type')),
      "user_id": this.authService.currentUserValue.userid,
      "type": 'patient_lab_report'
    }

    this.patientdataService.labDocList(labReportList).subscribe(
      (result) => {
        this.labReportList = result.data;
      },
      (err) => {
        console.log(err);
      }
    );

    //Prescription List API
    const prescriptionList = {
      "member_id": atob(this.route.snapshot.paramMap.get('type')),
      "user_id": this.authService.currentUserValue.userid,
      "type": 'prescription'
    }

    this.patientdataService.labDocList(prescriptionList).subscribe(
      (result) => {
        this.labReport = result.data;

      },
      (err) => {
        console.log(err);
      }
    );

    //Vaccination List API
    const vaccinationList = {
      "member_id": atob(this.route.snapshot.paramMap.get('type')),
      "user_id": this.authService.currentUserValue.userid,
      "type": 'vaccination'
    }

    this.patientdataService.labDocList(vaccinationList).subscribe(
      (result) => {
        this.vacReport = result.data;

      },
      (err) => {
        console.log(err);
      }
    );

    //Procedure Report API
    const procedureList = {
      "member_id": atob(this.route.snapshot.paramMap.get('type')),
      "user_id": this.authService.currentUserValue.userid,
      "type": 'procedure_report'
    }

    this.patientdataService.labDocList(procedureList).subscribe(
      (result) => {
        this.procedureReport = result.data;

      },
      (err) => {
        console.log(err);
      }
    );

    //Discharge Report API
    const dischargeList = {
      "member_id": atob(this.route.snapshot.paramMap.get('type')),
      "user_id": this.authService.currentUserValue.userid,
      "type": 'discharge_summary'
    }

    this.patientdataService.labDocList(dischargeList).subscribe(
      (result) => {
        this.dischargeReport = result.data;

      },
      (err) => {
        console.log(err);
      }
    );

    //Bills Report API
    const billsList = {
      "member_id": atob(this.route.snapshot.paramMap.get('type')),
      "user_id": this.authService.currentUserValue.userid,
      "type": 'all_bill'
    }

    this.patientdataService.labDocList(billsList).subscribe(
      (result) => {
        this.billsReport = result.data;

      },
      (err) => {
        console.log(err);
      }
    );

    //Insurance Report API
    const insuranceList = {
      "member_id": atob(this.route.snapshot.paramMap.get('type')),
      "user_id": this.authService.currentUserValue.userid,
      "type": 'insurance_document'
    }

    this.patientdataService.labDocList(insuranceList).subscribe(
      (result) => {
        this.insuranceReport = result.data;

      },
      (err) => {
        console.log(err);
      }
    );

    this.outPut();
    // this.heartRate_filterType = 'weekly';
    // this.final_graph_drawHearthRate(this.heartRate_filterType,this.heartRate_filterdata,'heart_rate')

    // this.lineChartDataBlood['label'] ="Blood report";
    // this.graph_filterType = 'weekly';
    // this.final_Graph_drawBloodReport(this.graph_filterType,'min(blood_pressure)','blood_pressure');

    // this.lineChartDataresporateyrate['label'] ="Respiratory Rate";
    // this.graph_filterType = 'weekly';
    // this.final_Graph_drawRespiratoryRate(this.graph_filterType,'min(respiratory_rate)','respiratory_rate')

    // this.lineChartDataOxygensat['label'] ="Oxygen Saturation";
    // this.graph_filterType = 'weekly';
    // this.final_Graph_drawOxygenSaturation(this.graph_filterType,'min(oxygen_saturation)','oxygen_saturation')

    // this.lineChartDataTemperature['label'] ="Temperature";
    // this.graph_filterType = 'weekly';
    // this.final_Graph_drawTemperature(this.graph_filterType,'min(temperature)','temperature');

    // this.lineChartDataBMI['label'] ="BMI";
    // this.graph_filterType = 'weekly';
    // this.final_Graph_drawBMI(this.graph_filterType,'min(BMI)','BMI');

    this.listReportDoc();
    this.latestTestRecord();

    this.weeklyData_heartRate();
    this.weeklyData_BloodReport();
    this.weeklyData_ResporetryReport();
    this.weeklyData_Oxygensat();
    this.weeklyData_Temperature();
    this.weeklyData_BMI();

    this.bpCondition = false;
    this.heartRateCondition = false
    this.respiratoryCondition = false;
    this.oxygenCondition = false;
    this.temperatureCondition = false;
    this.bmiCondition = false;

    // setTimeout(() => {
    //   this.chart1();
    // }, 1000);
    // setTimeout(() => {
    //   this.chart3();
    // }, 1000);


  }


  listReportDoc() {
    const labReport = {
      "member_id": atob(this.route.snapshot.paramMap.get('type')),
      "user_id": this.authService.currentUserValue.userid,
    }

    this.patientdataService.labreportListlatest(labReport).subscribe(
      (result) => {
        this.dataSource = result.data;
      },
      (err) => {
        console.log(err);
      }
    );

  }

  //Dashboard Count API
  outPut() {
    const id = {
      "member_id": atob(this.route.snapshot.paramMap.get('type')) ?? atob(this.dashboardLastparameter),
      "user_id": this.authService.currentUserValue.userid,
    };

    this.patientServiceService.dashboardCount(id).subscribe(
      (result) => {
        // console.log('FINAL =', result.data[0].heart_rate);
        this.BMI = result.data[0].BMI ?? '-';
        this.heart_rate = result.data[0].heart_rate ?? '-';
        this.temperature = result.data[0].temperature ?? '-';
        this.oxygen_saturation = result.data[0].oxygen_saturation ?? '-';
        this.respiratory_rate = result.data[0].respiratory_rate ?? '-';
        this.blood_pressureCount = result.data[0].blood_pressure ?? '-';

        // this.ngOnInit();
        if (this.personalID == 1) {
          this.ngOnInit();
          this.personalID = 2;
        }

      },

      (err) => {
        console.log(err);
      }
    );
  }


  private chart1() {
    this.areaChartOptions1 = {
      series: [
        {
          name: "Systolic BP (HIGH)",
          data: this.highBloodPressure_Data
        },
        {
          name: "Diastolic BP (LOW)",
          data: this.lowBloodPressure_Data
        },
      ],
      chart: {
        height: 350,
        type: "area",
        toolbar: {
          show: false,
        },
        foreColor: "#9aa0ac",
      },
      colors: ["#407fe4", "#908e8e"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        title: {
          text: this.titleName1
        },
        categories: this.dayName1,
      },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "center",
        offsetX: 0,
        offsetY: 0,
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

  private chart2() {
    this.areaChartOptions2 = {
      series: [
        {
          name: "Heart Rate",
          data: this.heartData
        },
      ],
      chart: {
        height: 350,
        type: "area",
        toolbar: {
          show: false,
        },
        foreColor: "#9aa0ac",
      },
      colors: ["#407fe4"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        title: {
          text: this.titleName2
        },
        categories: this.dayName2,
      },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "center",
        offsetX: 0,
        offsetY: 0,
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

  private chart3() {
    this.areaChartOptions3 = {
      series: [
        {
          name: "Respiratory Rate",
          data: this.respiratoryData
        },
      ],
      chart: {
        height: 350,
        type: "area",
        toolbar: {
          show: false,
        },
        foreColor: "#9aa0ac",
      },
      colors: ["#407fe4"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        title: {
          text: this.titleName3
        },
        categories: this.dayName3,
      },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "center",
        offsetX: 0,
        offsetY: 0,
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

  private chart4() {
    this.areaChartOptions4 = {
      series: [
        {
          name: "Oxygen Saturation",
          data: this.oxygenData
        },
      ],
      chart: {
        height: 350,
        type: "area",
        toolbar: {
          show: false,
        },
        foreColor: "#9aa0ac",
      },
      colors: ["#407fe4"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        title: {
          text: this.titleName4
        },
        categories: this.dayName4,
      },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "center",
        offsetX: 0,
        offsetY: 0,
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

  private chart5() {
    this.areaChartOptions5 = {
      series: [
        {
          name: "Temperature",
          data: this.temperatureData
        },
      ],
      chart: {
        height: 350,
        type: "area",
        toolbar: {
          show: false,
        },
        foreColor: "#9aa0ac",
      },
      colors: ["#407fe4"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        title: {
          text: this.titleName5
        },
        categories: this.dayName5,
      },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "center",
        offsetX: 0,
        offsetY: 0,
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

  private chart6() {
    this.areaChartOptions6 = {
      series: [
        {
          name: "BMI",
          data: this.bmiData
        },
      ],
      chart: {
        height: 350,
        type: "area",
        toolbar: {
          show: false,
        },
        foreColor: "#9aa0ac",
      },
      colors: ["#407fe4"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        title: {
          text: this.titleName6
        },
        categories: this.dayName6,
      },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "center",
        offsetX: 0,
        offsetY: 0,
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

  //Dashboard Dyanamic Code 
  public testCall() {
    setTimeout(() => {
      this.url = window.location.href;
      this.dashboardLastparameter = this.url.split('/')[6];

      var parts = this.url.split('/');
      var lastSegment = parts.pop() || parts.pop();


      this.router.navigate(["/patient/dashboard/" + lastSegment]).then(() => {
        window.location.reload();
      });
    }, 200);

  }

  //LINE CHART

  // Line chart start
  public lineChartOptions = {
    responsive: true,
    tooltips: {
      mode: "index",
      titleFontSize: 12,
      titleFontColor: "#000",
      bodyFontColor: "#000",
      backgroundColor: "#fff",
      titleFontFamily: "Poppins",
      bodyFontFamily: "Poppins",
      cornerRadius: 3,
      intersect: false,
    },
    legend: {
      display: false,
      labels: {
        usePointStyle: true,
        fontFamily: "Poppins",
      },
    },
    scales: {
      xAxes: [
        {
          display: true,
          gridLines: {
            display: false,
            drawBorder: false,
          },
          scaleLabel: {
            display: false,
            labelString: "Month",
          },
          ticks: {
            fontFamily: "Poppins",
            fontColor: "#9aa0ac", // Font Color
          },
        },
      ],
      yAxes: [
        {
          display: true,
          gridLines: {
            display: false,
            drawBorder: false,
          },
          scaleLabel: {
            display: true,
            labelString: "Value",
            fontFamily: "Poppins",
          },
          ticks: {
            fontFamily: "Poppins",
            fontColor: "#9aa0ac", // Font Color
          },
        },
      ],
    },
    title: {
      display: false,
      text: "Normal Legend",
    },
  };
  lineChartData = [
    {
      label: "Heart Rate",
      data: [],
      backgroundColor: "transparent",
      borderColor: "#222222",
      borderWidth: 2,
      pointStyle: "circle",
      pointRadius: 3,
      pointBorderColor: "transparent",
      pointBackgroundColor: "#222222",
    },

  ];

  lineChartLabels = [];

  // Line chart start BLOOD Report
  public lineChartOptionsBlood = {
    responsive: true,
    tooltips: {
      mode: "index",
      titleFontSize: 12,
      titleFontColor: "#000",
      bodyFontColor: "#000",
      backgroundColor: "#fff",
      titleFontFamily: "Poppins",
      bodyFontFamily: "Poppins",
      cornerRadius: 3,
      intersect: false,
    },
    legend: {
      display: false,
      labels: {
        usePointStyle: true,
        fontFamily: "Poppins",
      },
    },
    scales: {
      xAxes: [
        {
          display: true,
          gridLines: {
            display: false,
            drawBorder: false,
          },
          scaleLabel: {
            display: false,
            labelString: "Month",
          },
          ticks: {
            fontFamily: "Poppins",
            fontColor: "#9aa0ac", // Font Color
          },
        },
      ],
      yAxes: [
        {
          display: true,
          gridLines: {
            display: false,
            drawBorder: false,
          },
          scaleLabel: {
            display: true,
            labelString: "Value",
            fontFamily: "Poppins",
          },
          ticks: {
            fontFamily: "Poppins",
            fontColor: "#9aa0ac", // Font Color
          },
        },
      ],
    },
    title: {
      display: false,
      text: "Normal Legend",
    },
  };
  lineChartDataBlood = [
    {
      label: "Blood Report ",
      data: [],
      backgroundColor: "transparent",
      borderColor: "#222222",
      borderWidth: 2,
      pointStyle: "circle",
      pointRadius: 3,
      pointBorderColor: "transparent",
      pointBackgroundColor: "#222222",
    },

  ];

  lineChartLabelsBlood = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  //Reporetry Rate 
  lineChartDataresporateyrate = [
    {
      label: "Respiratory Rate",
      data: [],
      backgroundColor: "transparent",
      borderColor: "#222222",
      borderWidth: 2,
      pointStyle: "circle",
      pointRadius: 3,
      pointBorderColor: "transparent",
      pointBackgroundColor: "#222222",
    },

  ];

  lineChartLabelsresporetryRate = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Oxygen Saturation 

  lineChartDataOxygensat = [
    {
      label: "Oxygen Saturation",
      data: [],
      backgroundColor: "transparent",
      borderColor: "#222222",
      borderWidth: 2,
      pointStyle: "circle",
      pointRadius: 3,
      pointBorderColor: "transparent",
      pointBackgroundColor: "#222222",
    },

  ];

  lineChartLabelsoxygensat = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


  // Temperature

  lineChartDataTemperature = [
    {
      label: "Temperature",
      data: [],
      backgroundColor: "transparent",
      borderColor: "#222222",
      borderWidth: 2,
      pointStyle: "circle",
      pointRadius: 3,
      pointBorderColor: "transparent",
      pointBackgroundColor: "#222222",
    },

  ];

  lineChartLabelsTemperature = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  //BMI 
  lineChartDataBMI = [
    {
      label: "BMI",
      data: [],
      backgroundColor: "transparent",
      borderColor: "#222222",
      borderWidth: 2,
      pointStyle: "circle",
      pointRadius: 3,
      pointBorderColor: "transparent",
      pointBackgroundColor: "#222222",
    },

  ];

  lineChartLabelsBMI = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Heart Rate Graph
  weeklyData_heartRate() {
    this.heartRate_filterType = 'weekly';
    this.final_graph_drawHearthRate(this.heartRate_filterType, "", 'heart_rate')
  }
  yearlyData_heartRate() {
    this.heartRate_filterType = 'yearly';
    this.final_graph_drawHearthRate(this.heartRate_filterType, this.heartRate_filterdata, 'heart_rate');
  }

  //Blood Report

  weeklyData_BloodReport() {
    // this.lineChartDataBlood['label'] ="Blood report";
    this.graph_filterType = 'weekly';
    this.final_Graph_drawBloodReport(this.graph_filterType, '', 'blood_pressure');
  }

  yearlyData_bloodReport() {
    // this.lineChartDataBlood['label'] ="Blood report";
    this.graph_filterType = 'yearly';
    this.final_Graph_drawBloodReport(this.graph_filterType, '', 'blood_pressure');
  }


  //Resporety rate 

  weeklyData_ResporetryReport() {
    // this.lineChartDataresporateyrate['label'] ="Respiratory Rate";
    this.graph_filterType = 'weekly';
    this.final_Graph_drawRespiratoryRate(this.graph_filterType, "", 'respiratory_rate');
  }

  yearlyData_ResporetryReport() {
    // this.lineChartDataresporateyrate['label'] ="Respiratory Rate";
    this.graph_filterType = 'yearly';
    this.final_Graph_drawRespiratoryRate(this.graph_filterType, "", 'respiratory_rate')
  }

  // Oxygen Saturation 

  weeklyData_Oxygensat() {
    // this.lineChartDataOxygensat['label'] ="Oxygen Saturation";
    this.graph_filterType = 'weekly';
    this.final_Graph_drawOxygenSaturation(this.graph_filterType, '', 'oxygen_saturation')
  }
  yearlyData_Oxygensat() {
    // this.lineChartDataOxygensat['label'] ="Oxygen Saturation";
    this.graph_filterType = 'yearly';
    this.final_Graph_drawOxygenSaturation(this.graph_filterType, "", 'oxygen_saturation')
  }

  // Temperature
  weeklyData_Temperature() {
    // this.lineChartDataTemperature['label'] ="Temperature";
    this.graph_filterType = 'weekly';
    this.final_Graph_drawTemperature(this.graph_filterType, '', 'temperature');
  }

  yearlyData_Temperature() {
    // this.lineChartDataTemperature['label'] ="Temperature";
    this.graph_filterType = 'yearly';
    this.final_Graph_drawTemperature(this.graph_filterType, '', 'temperature');
  }

  weeklyData_BMI() {
    // this.lineChartDataBMI['label'] ="BMI";
    this.graph_filterType = 'weekly';
    this.final_Graph_drawBMI(this.graph_filterType, '', 'BMI');
  }

  yearlyData_BMI() {
    // this.lineChartDataBMI['label'] ="BMI";
    this.graph_filterType = 'yearly';
    this.final_Graph_drawBMI(this.graph_filterType, 'min(BMI)', 'BMI');
  }

  final_graph_drawHearthRate(type, filterdata, filtertype) {
    this.heartData = [];
    this.titleName2 = '';
    this.dayName2 = [];
    this.heartRateCondition = false
    // this.lineChartLabels = [];
    //this.lineChartLabels = [];
    const weeklyheartrate = {
      "member_id": atob(this.route.snapshot.paramMap.get('type')) ?? atob(this.dashboardLastparameter),
      "type": type,
      "filterdata": null,
      "filtertype": filtertype
    };
    if (type == 'weekly') {
      this.patientdataService.dashboardChart(weeklyheartrate).pipe(
        map(result => {
          this.heartRateCondition = false;
          this.datarespose = result.data.DayName;
          if (result.data.length > 0) {
            for (var i = 0, len = result.data.length; i < len; i++) {
              // this.lineChartLabels.push(result.data[i].DayName);
              this.heartData.push(result.data[i].heart_rate);
              this.dayName2.push(result.data[i].DayName);
            }
            this.heartRateCondition = true;
            this.titleName2 = "Week";
            this.heartData = this.heartData.reverse();
            this.dayName2 = this.dayName2.reverse()
            // this.lineChartLabels = this.lineChartLabels.reverse()
            // this.lineChartData[0].data = this.lineChartData[0].data.reverse();
          }
          setTimeout(() => {
            this.chart2();
          }, 400);
        })
      ).subscribe(
        (result) => {
          // this.lineChartLabels = ["Sun", "Mon", "Tue", "Wed","Thu","Fri","Sat"];
        },
        (err) => {
          console.log(err);
        }
      );
    }

    if (type == 'yearly') {
      // this.lineChartLabels = [];
      // this.lineChartLabels =  this.lineChartLabels.reverse();
      this.heartData = [];
      this.dayName2 = []
      const monthlyheartrate = {
        "member_id": atob(this.route.snapshot.paramMap.get('type')) ?? atob(this.dashboardLastparameter),
        "type": "",
        "filterdata": null,
        "filtertype": filtertype
      };
      this.patientdataService.dashboardChart(monthlyheartrate).pipe(
        map(result => {
          if (result.data.length > 0) {
            for (var i = 0, len = result.data.length; i < len; i++) {
              this.heartData.push(result.data[i].heart_rate);
              this.dayName2.push(result.data[i].MonthName);
            }
            this.heartRateCondition = true;
            this.titleName2 = "Year";
            this.heartData = this.heartData.reverse();
            this.dayName2 = this.dayName2.reverse()
          }
          setTimeout(() => {
            this.chart2();
          }, 400);
        })
      ).subscribe(
        (result) => {
          //this.lineChartLabels = ["Sun", "Mon", "Tue", "Wed","Thu","Fri","Sat"];
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  //Final Blood Report Graph Plot

  final_Graph_drawBloodReport(type, filterdata, filtertype) {
    //this.lineChartDataBlood[0].data = [44, 88, 18, 191, 165, 127, 160];
    //this.lineChartLabelsBlood = ["Sun", "Mon", "Tue", "Wed","Thu","Fri","Sat"];
    this.lineChartDataBlood[0].data = [];
    this.lineChartLabelsBlood = [];
    this.highBloodPressure_Data = [];
    this.lowBloodPressure_Data = [];

    this.dayName1 = [];

    const weeklyBP = {
      "member_id": atob(this.route.snapshot.paramMap.get('type')) ?? atob(this.dashboardLastparameter),
      "type": type,
      // "filterdata" : filterdata,
      "filtertype": filtertype
    };
    if (type == 'weekly') {

      this.patientdataService.dashboardChart(weeklyBP).pipe(
        map(result => {
          this.bpCondition = false;
          this.datarespose = result.data.DayName;
          this.highBloodPressure_Data = [];
          this.lowBloodPressure_Data = [];
          this.dayName1 = [];

          if (result.data.length > 0) {
            for (var i = 0; i < result.data.length; i++) {
              this.blood_pressure = result.data[i].blood_pressure.split("/");
              this.highBloodPressure_Data.push(this.blood_pressure[0]);
              this.lowBloodPressure_Data.push(this.blood_pressure[1]);
              this.dayName1.push(result.data[i].DayName);
            }
            this.bpCondition = true;
            this.highBloodPressure_Data = this.highBloodPressure_Data.reverse();
            this.lowBloodPressure_Data = this.lowBloodPressure_Data.reverse();
            this.dayName1 = this.dayName1.reverse()
          }
          this.titleName1 = "Week"
          setTimeout(() => {
            this.chart1();
          }, 400);

        })
      ).subscribe(
        (result) => {
          // this.lineChartLabelsBlood = ["Sun", "Mon", "Tue", "Wed","Thu","Fri","Sat"];
        },
        (err) => {
          console.log(err);
        }
      );
    }
    if (type == 'yearly') {

      this.lineChartLabelsBlood = [];


      this.lineChartLabelsBlood = this.lineChartLabelsBlood.reverse();
      this.lineChartDataBlood[0].data = [];
      const weeklyBP = {
        "member_id": atob(this.route.snapshot.paramMap.get('type')) ?? atob(this.dashboardLastparameter),
        "type": '',
        // "filterdata" : filterdata,
        "filtertype": filtertype
      };
      this.patientdataService.dashboardChart(weeklyBP).pipe(
        map(result => {
          this.highBloodPressure_Data = [];
          this.lowBloodPressure_Data = [];
          this.dayName1 = [];
          this.bpCondition = false;
          this.datarespose = result.data.MonthName;
          if (result.data.length > 0) {
            for (var i = 0, len = result.data.length; i < len; i++) {
              this.blood_pressure = result.data[i].blood_pressure.split("/");
              this.highBloodPressure_Data.push(this.blood_pressure[0]);
              this.lowBloodPressure_Data.push(this.blood_pressure[1]);
              this.dayName1.push(result.data[i].MonthName.slice(0, 3))
            }
            this.titleName1 = "Year";
            this.bpCondition = true;
            this.highBloodPressure_Data = this.highBloodPressure_Data.reverse();
            this.lowBloodPressure_Data = this.lowBloodPressure_Data.reverse();
            this.dayName1 = this.dayName1.reverse();
          }
          setTimeout(() => {
            this.chart1();
          }, 400);
        })
      ).subscribe(
        (result) => {
          //this.lineChartLabels = ["Sun", "Mon", "Tue", "Wed","Thu","Fri","Sat"];
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  //Respiratery Rate Graph Final Plot

  final_Graph_drawRespiratoryRate(type, filterdata, filtertype) {
    this.respiratoryData = []
    const weeklyRR = {
      "member_id": atob(this.route.snapshot.paramMap.get('type')) ?? atob(this.dashboardLastparameter),
      "type": type,
      "filterdata": null,
      "filtertype": filtertype
    };
    if (type == 'weekly') {
      this.respiratoryData = [];
      this.titleName3 = '';
      this.dayName3 = [];
      this.respiratoryCondition = false;
      this.patientdataService.dashboardChart(weeklyRR).pipe(
        map(result => {
          this.datarespose = result.data.DayName;
          if (result.data.length > 0) {
            for (var i = 0, len = result.data.length; i < len; i++) {
              this.dayName3.push(result.data[i].DayName.slice(0, 3));
              this.respiratoryData.push(result.data[i].respiratory_rate);
            }
            this.respiratoryCondition = true;
            this.titleName3 = 'Week'
            this.respiratoryData = this.respiratoryData.reverse();
            this.dayName3 = this.dayName3.reverse();
          }
          setTimeout(() => {
            this.chart3();
          }, 400);

        })
      ).subscribe(
        (result) => {
          // this.lineChartLabelsresporetryRate = ["Sun", "Mon", "Tue", "Wed","Thu","Fri","Sat"];
        },
        (err) => {
          console.log(err);
        }
      );
    }
    if (type == 'yearly') {
      this.respiratoryData = [];
      this.titleName3 = '';
      this.dayName3 = [];
      this.respiratoryCondition = false;

      const weeklyRR = {
        "member_id": atob(this.route.snapshot.paramMap.get('type')) ?? atob(this.dashboardLastparameter),
        "type": "",
        "filterdata": null,
        "filtertype": filtertype
      };
      this.patientdataService.dashboardChart(weeklyRR).pipe(
        map(result => {

          if (result.data.length > 0) {
            for (var i = 0, len = result.data.length; i < len; i++) {
              this.dayName3.push(result.data[i].MonthName.slice(0, 3));
              this.respiratoryData.push(result.data[i].respiratory_rate);
            }
            this.titleName3 = "Year"
            this.respiratoryCondition = true;
            this.dayName3 = this.dayName3.reverse();
            this.respiratoryData = this.respiratoryData.reverse();
          }
          setTimeout(() => {
            this.chart3();
          }, 400);

        })
      ).subscribe(
        (result) => {
          //this.lineChartLabels = ["Sun", "Mon", "Tue", "Wed","Thu","Fri","Sat"];
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  //Oxygen Saturation Graph Final Plot

  final_Graph_drawOxygenSaturation(type, filterdata, filtertype) {
    this.oxygenData = [];
    const weeklyOS = {
      "member_id": atob(this.route.snapshot.paramMap.get('type')) ?? atob(this.dashboardLastparameter),
      "type": type,
      "filterdata": "",
      "filtertype": filtertype
    };
    if (type == 'weekly') {
      this.oxygenData = [];
      this.oxygenCondition = false;
      this.titleName4 = '';
      this.dayName4 = []
      this.patientdataService.dashboardChart(weeklyOS).pipe(
        map(result => {
          this.datarespose = result.data.DayName;
          if (result.data.length > 0) {
            for (var i = 0, len = result.data.length; i < len; i++) {
              this.dayName4.push(result.data[i].DayName);
              this.oxygenData.push(result.data[i].oxygen_saturation);
            }
            this.titleName4 = "Week";
            this.dayName4 = this.dayName4.reverse();
            this.oxygenData = this.oxygenData.reverse();
            this.oxygenCondition = true;
          }
          setTimeout(() => {
            this.chart4();
          }, 400);
        })
      ).subscribe(
        (result) => {
          //this.lineChartLabelsoxygensat = ["Sun", "Mon", "Tue", "Wed","Thu","Fri","Sat"];
        },
        (err) => {
          console.log(err);
        }
      );
    }

    if (type == 'yearly') {
      this.oxygenData = [];
      this.oxygenCondition = false;
      this.titleName4 = '';
      this.dayName4 = []
      const weeklyOS = {
        "member_id": atob(this.route.snapshot.paramMap.get('type')) ?? atob(this.dashboardLastparameter),
        "type": "",
        "filterdata": null,
        "filtertype": filtertype
      };

      this.patientdataService.dashboardChart(weeklyOS).pipe(
        map(result => {
          if (result.data.length > 0) {
            for (var i = 0, len = result.data.length; i < len; i++) {
              this.dayName4.push(result.data[i].MonthName.slice(0, 3));
              this.oxygenData.push(result.data[i].oxygen_saturation);
            }
            this.titleName4 = "Year";
            this.oxygenCondition = true;
            this.dayName4 = this.dayName4.reverse();
            this.oxygenData = this.oxygenData.reverse();
          }
          setTimeout(() => {
            this.chart4();
          }, 400);
        })
      ).subscribe(
        (result) => {
          //this.lineChartLabels = ["Sun", "Mon", "Tue", "Wed","Thu","Fri","Sat"];
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  // Temperature Final Graph Draw

  final_Graph_drawTemperature(type, filterdata, filtertype) {
    this.temperatureData = [];
    this.temperatureCondition = false;
    this.titleName5 = '';
    this.dayName5 = []
    const weeklyTemprature = {
      "member_id": atob(this.route.snapshot.paramMap.get('type')) ?? atob(this.dashboardLastparameter),
      "type": type,
      "filterdata": null,
      "filtertype": filtertype
    };
    if (type == 'weekly') {
      this.temperatureData = [];
      this.temperatureCondition = false;
      this.titleName5 = '';
      this.dayName5 = []
      this.patientdataService.dashboardChart(weeklyTemprature).pipe(
        map(result => {
          this.datarespose = result.data.DayName;
          if (result.data.length > 0) {
            for (var i = 0, len = result.data.length; i < len; i++) {
              this.dayName5.push(result.data[i].DayName.slice(0, 3));
              this.temperatureData.push(result.data[i].temperature);
            }
            this.temperatureData = this.temperatureData.reverse();
            this.dayName5 = this.dayName5.reverse();
            this.titleName5 = "Week";
            this.temperatureCondition = true;
          }
          setTimeout(() => {
            this.chart5();
          }, 400);

        })
      ).subscribe(
        (result) => {
          // this.lineChartLabelsTemperature = ["Sun", "Mon", "Tue", "Wed","Thu","Fri","Sat"];
        },
        (err) => {
          console.log(err);
        }
      );
    }
    if (type == 'yearly') {
      this.temperatureData = [];
      this.temperatureCondition = false;
      this.titleName5 = '';
      this.dayName5 = []
      const weeklyTemprature = {
        "member_id": atob(this.route.snapshot.paramMap.get('type')) ?? atob(this.dashboardLastparameter),
        "type": "",
        "filterdata": null,
        "filtertype": filtertype
      };
      this.patientdataService.dashboardChart(weeklyTemprature).pipe(
        map(result => {
          if (result.data.length > 0) {
            for (var i = 0, len = result.data.length; i < len; i++) {
              this.dayName5.push(result.data[i].MonthName.slice(0, 3));
              this.temperatureData.push(result.data[i].temperature);
            }
            this.temperatureData = this.temperatureData.reverse();
            this.dayName5 = this.dayName5.reverse();
            this.titleName5 = "Year";
            this.temperatureCondition = true;
          }
          setTimeout(() => {
            this.chart5();
          }, 400);
        })
      ).subscribe(
        (result) => {
          //this.lineChartLabels = ["Sun", "Mon", "Tue", "Wed","Thu","Fri","Sat"];
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  // BMI Graph to be plot

  final_Graph_drawBMI(type, filterdata, filtertype) {
    this.bmiData = [];
    this.dayName6 = [];
    this.titleName6 = '';
    this.bmiCondition = false;
    const weeklyBMI = {
      "member_id": atob(this.route.snapshot.paramMap.get('type')) ?? atob(this.dashboardLastparameter),
      "type": type,
      "filterdata": null,
      "filtertype": filtertype
    };
    if (type == 'weekly') {
      this.bmiData = [];
      this.dayName6 = [];
      this.titleName6 = '';
      this.bmiCondition = false;
      this.patientdataService.dashboardChart(weeklyBMI).pipe(
        map(result => {
          this.datarespose = result.data.DayName;
          if (result.data.length > 0) {
            for (var i = 0, len = result.data.length; i < len; i++) {
              this.dayName6.push(result.data[i].DayName.slice(0, 3));
              let data = parseFloat(result.data[i].BMI).toFixed(2);
              this.bmiData.push(data);
            }
            this.dayName6 = this.dayName6.reverse();
            this.bmiData = this.bmiData.reverse();
            this.titleName6 = "Week";
            this.bmiCondition = true;
          }
          setTimeout(() => {
            this.chart6();
          }, 400);

        })
      ).subscribe(
        (result) => {
          //  this.lineChartLabelsBMI = ["Sun", "Mon", "Tue", "Wed","Thu","Fri","Sat"];
        },
        (err) => {
          console.log(err);
        }
      );
    }
    if (type == 'yearly') {
      this.bmiData = [];
      this.dayName6 = [];
      this.titleName6 = '';
      this.bmiCondition = false;

      const weeklyBMI = {
        "member_id": atob(this.route.snapshot.paramMap.get('type')) ?? atob(this.dashboardLastparameter),
        "type": "",
        "filterdata": null,
        "filtertype": filtertype
      };
      this.patientdataService.dashboardChart(weeklyBMI).pipe(
        map(result => {
          if (result.data.length > 0) {
            for (var i = 0, len = result.data.length; i < len; i++) {
              this.dayName6.push(result.data[i].MonthName.slice(0, 3));
              let data = parseFloat(result.data[i].BMI).toFixed(2);
              this.bmiData.push(data);
            }
            this.titleName6 = "Year";
            this.bmiCondition = true;
          }
          setTimeout(() => {
            this.chart6();
          }, 400);
        })
      ).subscribe(
        (result) => {
          //this.lineChartLabels = ["Sun", "Mon", "Tue", "Wed","Thu","Fri","Sat"];
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  // Pop delete Code here
  open(content) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  getId(Id) {
    this.deleteId = Id;
  }
  deleteRecord() {

    const deleteData = {
      "id": this.deleteId,
      "user_id": this.authService.currentUserValue.userid,
    };

    this.patientdataService.deleteDocument(deleteData).subscribe(
      (result) => {
        setTimeout(() => {
          //this.router.navigate(["/patient/lab-m-report/"+this.route.snapshot.paramMap.get('type')]);
          this.ngOnInit();
        }, 300);

        this.ngOnInit();
        Swal.fire(
          '',
          result.message,
          'success'
        )

      },
      (err) => {
        this.error_message = true;
        this.error_message_text = err;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  latestTestRecord() {
    const labReport = {
      "member_id": atob(this.route.snapshot.paramMap.get('type')),
    }

    this.patientdataService.testReportListlatest(labReport).subscribe(
      (result) => {
        this.dataSourceTestreport = result.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }


  CalculateAge(dateofbirth) {
    if (dateofbirth) {
      const convertAge = new Date(dateofbirth);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
      return this.showAge;
    }
  }

  monthlyData_heartData(event: any) {
    this.heartData = [];
    this.dayName2 = [];
    this.heartRateCondition = false
    const monthlyheartrate = {
      "member_id": atob(this.route.snapshot.paramMap.get('type')) ?? atob(this.dashboardLastparameter),
      "type": event.value,
      "filterdata": null,
      "filtertype": 'heart_rate'
    };

    this.patientdataService.dashboardChart(monthlyheartrate).pipe(
      map(result => {
        // console.log('MM', result.data)
        if (result.data.length > 0) {
          for (var i = 0, len = result.data.length; i < len; i++) {
            var datePipe = new DatePipe("en-US");
            let date = datePipe.transform(result.data[i].createdate, "dd")
            // this.lineChartLabels.push(date);
            this.heartData.push(result.data[i].heart_rate);
            this.dayName2.push(date);
          }
          this.heartData = this.heartData.reverse();
          this.dayName2 = this.dayName2.reverse();
          this.titleName2 = "Month";
          this.heartRateCondition = true;
          setTimeout(() => {
            this.chart2();
          }, 400);
          // this.lineChartData[0].data =  this.lineChartData[0].data.reverse();
          // this.lineChartLabels = this.lineChartLabels.reverse();
        }
      })
    ).subscribe(
      (result) => {
        // this.lineChartLabels = ["January", "February", "March", "April","May","June","July","August","September","October","November","December"];
      },
      (err) => {
        console.log(err);
      }
    );

  }

  monthlyData_ResporetryReportData(event: any) {
    this.respiratoryData = [];
    this.titleName3 = '';
    this.dayName3 = [];
    this.respiratoryCondition = false;
    const weeklyRR = {
      "member_id": atob(this.route.snapshot.paramMap.get('type')) ?? atob(this.dashboardLastparameter),
      "type": event.value,
      "filterdata": "",
      "filtertype": 'respiratory_rate'
    };

    this.patientdataService.dashboardChart(weeklyRR).pipe(
      map(result => {
        if (result.data.length > 0) {
          for (var i = 0, len = result.data.length; i < len; i++) {
            var datePipe = new DatePipe("en-US");
            let date = datePipe.transform(result.data[i].createdate, "dd")
            this.dayName3.push(date);
            this.respiratoryData.push(result.data[i].respiratory_rate);
          }
          this.titleName3 = "Month";
          this.respiratoryCondition = true;
          this.dayName3 = this.dayName3.reverse();
          this.respiratoryData = this.respiratoryData.reverse();
        }
        setTimeout(() => {
          this.chart3();
        }, 400);
      })
    ).subscribe(
      (result) => {
        //this.lineChartLabels = ["Sun", "Mon", "Tue", "Wed","Thu","Fri","Sat"];
      },
      (err) => {
        console.log(err);
      }
    );

  }

  monthlyData_OxygensatData(event: any) {

    this.dayName4 = [];
    this.oxygenData = [];
    this.titleName4 = '';
    this.oxygenCondition = false
    const weeklyOS = {
      "member_id": atob(this.route.snapshot.paramMap.get('type')) ?? atob(this.dashboardLastparameter),
      "type": event.value,
      "filterdata": '',
      "filtertype": 'oxygen_saturation'
    };

    this.patientdataService.dashboardChart(weeklyOS).pipe(
      map(result => {
        if (result.data.length > 0) {
          for (var i = 0, len = result.data.length; i < len; i++) {
            var datePipe = new DatePipe("en-US");
            let date = datePipe.transform(result.data[i].createdate, "dd")
            this.dayName4.push(date);
            this.oxygenData.push(result.data[i].oxygen_saturation);
          }
          this.dayName4 = this.dayName4.reverse();
          this.oxygenData = this.oxygenData.reverse();
          this.oxygenCondition = true;
          this.titleName4 = "Month"
        }
        setTimeout(() => {
          this.chart4();
        }, 400);
      })
    ).subscribe(
      (result) => {
        //this.lineChartLabels = ["Sun", "Mon", "Tue", "Wed","Thu","Fri","Sat"];
      },
      (err) => {
        console.log(err);
      }
    );
  }
  monthlyData_TemperatureData(event: any) {
    this.dayName5 = [];
    this.temperatureData = [];
    this.titleName5 = '';
    this.temperatureCondition = false

    const weeklyTemprature = {
      "member_id": atob(this.route.snapshot.paramMap.get('type')) ?? atob(this.dashboardLastparameter),
      "type": event.value,
      // "filterdata" : filterdata,
      "filtertype": 'temperature'
    };

    this.patientdataService.dashboardChart(weeklyTemprature).pipe(
      map(result => {
        if (result.data.length > 0) {
          for (var i = 0, len = result.data.length; i < len; i++) {
            var datePipe = new DatePipe("en-US");
            let date = datePipe.transform(result.data[i].createdate, "dd")
            this.dayName5.push(date);
            this.temperatureData.push(result.data[i].temperature);
          }
          this.dayName5 = this.dayName5.reverse();
          this.temperatureData = this.temperatureData.reverse();
          this.titleName5 = "Month";
          this.temperatureCondition = true;
        }
        setTimeout(() => {
          this.chart5();
        }, 400);
      })
    ).subscribe(
      (result) => {

      },
      (err) => {
        console.log(err);
      }
    );

  }

  monthlyData_BMIData(event: any) {
    this.bmiData = [];
    this.dayName6 = [];
    this.titleName6 = '';
    this.bmiCondition = false;
    const weeklyBMI = {
      "member_id": atob(this.route.snapshot.paramMap.get('type')) ?? atob(this.dashboardLastparameter),
      "type": event.value,
      // "filterdata" : filterdata,
      "filtertype": 'BMI'
    };

    this.patientdataService.dashboardChart(weeklyBMI).pipe(
      map(result => {

        if (result.data.length > 0) {
          for (var i = 0, len = result.data.length; i < len; i++) {
            var datePipe = new DatePipe("en-US");
            let date = datePipe.transform(result.data[i].createdate, "dd")
            let data = parseFloat(result.data[i].BMI).toFixed(2);
            this.dayName6.push(date);
            this.bmiData.push(data);
          }
          this.dayName6 = this.dayName6.reverse();
          this.bmiData = this.bmiData.reverse();
          this.titleName6 = "Month";
          this.bmiCondition = true;
        }
        setTimeout(() => {
          this.chart6();
        }, 400);
      })
    ).subscribe(
      (result) => {
        //this.lineChartLabels = ["Sun", "Mon", "Tue", "Wed","Thu","Fri","Sat"];
      },
      (err) => {
        console.log(err);
      }
    );


  }

  monthlyData_BloodReportData(event: any) {
    this.lineChartLabelsBlood = [];
    this.highBloodPressure_Data = [];
    this.lowBloodPressure_Data = [];
    this.dayName1 = [];
    this.bpCondition = false;

    const weeklyBP = {
      "member_id": atob(this.route.snapshot.paramMap.get('type')) ?? atob(this.dashboardLastparameter),
      "type": event.value,
      "filtertype": 'blood_pressure'
    };

    this.patientdataService.dashboardChart(weeklyBP).pipe(
      map(result => {
        this.datarespose = result.data.Date;
        if (result.data.length > 0) {
          for (var i = 0; i < result.data.length; i++) {
            var datePipe = new DatePipe("en-US");
            let date = datePipe.transform(result.data[i].createdate, "dd")
            this.blood_pressure = result.data[i].blood_pressure.split("/");
            this.highBloodPressure_Data.push(this.blood_pressure[0]);
            this.lowBloodPressure_Data.push(this.blood_pressure[1]);
            this.dayName1.push(date)
          }
          this.highBloodPressure_Data = this.highBloodPressure_Data.reverse();
          this.lowBloodPressure_Data = this.lowBloodPressure_Data.reverse();
          this.dayName1 = this.dayName1.reverse();
          this.titleName1 = "Month"
          this.bpCondition = true;
        }
        setTimeout(() => {
          this.chart1();
        }, 400);
      })
    ).subscribe(
      (result) => {

      },
      (err) => {
        console.log(err);
      }
    );

  }

  //View File
  viewDicomFile(image) {
    if (image !== '-') {
      this.htmlReturn = '<img src="assets/images/dicom1.png">';
    }
    else {
      this.htmlReturn = '-';
    }
  }

  returnPdf(image) {
    if (image != '-') {
      this.htmlReturn = '<img src="assets/images/pdf.png">';
    }
    else {
      this.htmlReturn = '-';
    }
  }

  // returnPdfradio(image){

  //   if(image !='-'){
  //   const myFileType = image.split(/[#?]/)[0].split('.').pop().trim();
    
  //   if(myFileType=='pdf'){
  //   this.isDisable = '';
  //   this.htmlReturn = '<img src="assets/images/pdf.png">';
  //   }
  //   else{
  //   this.isDisable = '';
  //   this.htmlReturn = '<img src="assets/images/dicom1.png">';
  //   }
    
    
  //   }
  // }

  //Report Redirect
  viewReport(fn: string) {
    if (fn !== '-') {
   //   localStorage.setItem('dicomFile', fn);
     // if (localStorage.getItem('dicomFile')) {
        window.open(fn);
   //   }
    }
    else {
      return false;
    }
  }

  shareToMail(doc_link: any) {
    var email = '';
    var subject = 'Send Email file';
    var emailBody = 'Hi Sample,';
    var attach = doc_link;
    document.location = "mailto:" + email + "?subject=" + subject + "&body=" + emailBody + "&attach=" + attach;

  }

}

