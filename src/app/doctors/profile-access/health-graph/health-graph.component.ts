import { Component, OnInit ,ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
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
import { AuthService } from 'src/app/core/service/auth.service';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import { PatientdataService } from 'src/app/services/patientdata.service';
import { map, Observable } from "rxjs";
import { DoctorServiceService } from 'src/app/services/doctor-service.service';
import Swal from 'sweetalert2';

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

@Component({
  selector: 'app-health-graph',
  templateUrl: './health-graph.component.html',
  styleUrls: ['./health-graph.component.sass']
})
export class HealthGraphComponent implements OnInit {

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
  bpCondition :boolean = false;
  heartRateCondition : boolean = false;
  respiratoryCondition : boolean = false;
  oxygenCondition : boolean = false;
  temperatureCondition : boolean = false;
  bmiCondition : boolean = false;
  highBloodPressure_Data : any[];
  lowBloodPressure_Data : any[];
  heartData : any[];
  respiratoryData : any[];
  oxygenData :any[];
  temperatureData : any[];
  bmiData : any[];
  monthName : any[];
  dayName1 : any [];
  dayName2 : any [];
  dayName3 : any [];
  dayName4 : any [];
  dayName5 : any [];
  dayName6 : any [];
  titleName1 : any;
  titleName2 : any; 
  titleName3 : any; 
  titleName4 : any; 
  titleName5 : any; 
  titleName6 : any; 
  member_id: any;
  heartRate_filterdata: string = '';
  heartRate_filterType: string = 'weekly';
  graph_filterType: string;
  datarespose: any;
  state$: Observable<object>;
  user_id: any;
  token: any;
  url: string;
  dashboardLastparameter: string
  blood_pressure: any;
  request_id : any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private doctorService: DoctorServiceService,
    private sanitizer: DomSanitizer,
    private patientdataService : PatientdataService,
    private modalService: NgbModal,
    private activatedRoute : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.request_id = this.activatedRoute.snapshot.paramMap.get('request_id');
    if(this.request_id){
      let data ={
        requestId: this.request_id
       }
    
       this.doctorService.checkAccessdetail(data).subscribe(
        (result)=>{
           this.member_id = result.data.member_id ?? result.data.patient_id;
        },
        (err)=>{
          Swal.fire(
            '',
            err,
            'error'
          )
        }
       )  
      }
      this.bpCondition  = false;
      this.heartRateCondition = false
      this.respiratoryCondition = false;
      this.oxygenCondition = false;
      this.temperatureCondition = false;
      this.bmiCondition = false;
    
    // if(this.member_id){
      setTimeout(() => {
        this.weeklyData_heartRate();
        this.weeklyData_BloodReport();
        this.weeklyData_ResporetryReport();
        this.weeklyData_Oxygensat();
        this.weeklyData_Temperature();
        this.weeklyData_BMI();
      }, 1000);
      
    // }
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
        }
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
          text : this.titleName1
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
        }
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
          text : this.titleName2
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
        }
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
          text : this.titleName3
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
        }
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
          text : this.titleName4
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
        }
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
          text : this.titleName5
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
        }
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
          text : this.titleName6
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

  weeklyData_heartRate() {
    this.heartRate_filterType = 'weekly';
    this.final_graph_drawHearthRate(this.heartRate_filterType,"",'heart_rate')
  }
  yearlyData_heartRate(){
    this.heartRate_filterType = 'yearly';
    this.final_graph_drawHearthRate(this.heartRate_filterType,this.heartRate_filterdata,'heart_rate');
  }
  
  //Blood Report
  
  weeklyData_BloodReport() {
    // this.lineChartDataBlood['label'] ="Blood report";
    this.graph_filterType = 'weekly';
    this.final_Graph_drawBloodReport(this.graph_filterType,'','blood_pressure');
  }
  
  yearlyData_bloodReport() {
    // this.lineChartDataBlood['label'] ="Blood report";
    this.graph_filterType = 'yearly';
    this.final_Graph_drawBloodReport(this.graph_filterType,'','blood_pressure');
  }
  
  
  //Resporety rate 
  
  weeklyData_ResporetryReport() {
    // this.lineChartDataresporateyrate['label'] ="Respiratory Rate";
    this.graph_filterType = 'weekly';
    this.final_Graph_drawRespiratoryRate(this.graph_filterType,"",'respiratory_rate');
   }
  
  yearlyData_ResporetryReport() {
    // this.lineChartDataresporateyrate['label'] ="Respiratory Rate";
    this.graph_filterType = 'yearly';
    this.final_Graph_drawRespiratoryRate(this.graph_filterType,"",'respiratory_rate')
   }
  
  // Oxygen Saturation 
  
  weeklyData_Oxygensat() {
    // this.lineChartDataOxygensat['label'] ="Oxygen Saturation";
    this.graph_filterType = 'weekly';
    this.final_Graph_drawOxygenSaturation(this.graph_filterType,'','oxygen_saturation')
  }
  yearlyData_Oxygensat() {
    // this.lineChartDataOxygensat['label'] ="Oxygen Saturation";
    this.graph_filterType = 'yearly';
    this.final_Graph_drawOxygenSaturation(this.graph_filterType,"",'oxygen_saturation')
  }
  
  // Temperature
  weeklyData_Temperature() {
    // this.lineChartDataTemperature['label'] ="Temperature";
    this.graph_filterType = 'weekly';
    this.final_Graph_drawTemperature(this.graph_filterType,'','temperature');
  }
  
  yearlyData_Temperature() {
    // this.lineChartDataTemperature['label'] ="Temperature";
    this.graph_filterType = 'yearly';
    this.final_Graph_drawTemperature(this.graph_filterType,'','temperature');
  }
  
  weeklyData_BMI(){
    // this.lineChartDataBMI['label'] ="BMI";
    this.graph_filterType = 'weekly';
    this.final_Graph_drawBMI(this.graph_filterType,'','BMI'); 
  }
  
  yearlyData_BMI(){
    // this.lineChartDataBMI['label'] ="BMI";
    this.graph_filterType = 'yearly';
    this.final_Graph_drawBMI(this.graph_filterType,'min(BMI)','BMI'); 
  }
  
  final_graph_drawHearthRate(type,filterdata,filtertype){
    this.heartData =[];
    this.titleName2 = '';
    this.dayName2 = [];
    this.heartRateCondition = false
    // this.lineChartLabels = [];
    //this.lineChartLabels = [];
    const weeklyheartrate = {
      "member_id": this.member_id,
      "type" : type,
      "filterdata" : null,
      "filtertype" : filtertype
    };
    if(type =='weekly'){
    this.patientdataService.dashboardChart(weeklyheartrate).pipe(
      map(result=> {
        this.heartRateCondition = false;
        this.datarespose = result.data.DayName;
          if(result.data.length > 0){
            for(var i = 0, len = result.data.length; i < len; i++){
              // this.lineChartLabels.push(result.data[i].DayName);
              this.heartData.push(result.data[i].heart_rate);
              this.dayName2.push(result.data[i].DayName);
            }
            this.heartData = this.heartData.reverse();
            this.dayName2 = this.dayName2.reverse()
            this.heartRateCondition = true;
            this.titleName2 = "Week";
            // this.lineChartLabels = this.lineChartLabels.reverse()
            // this.lineChartData[0].data = this.lineChartData[0].data.reverse();
          }
          setTimeout(() => {
            this.chart2();
          }, 400);
      } )
    ).subscribe(
      (result) => {
       // this.lineChartLabels = ["Sun", "Mon", "Tue", "Wed","Thu","Fri","Sat"];
      },
      (err) => {
        console.log(err);
      }
    );
    }
  
    if(type == 'yearly'){
      // this.lineChartLabels = [];
      // this.lineChartLabels =  this.lineChartLabels.reverse();
      this.heartData = [];
      this.dayName2 = []
      const monthlyheartrate = {
        "member_id":  this.member_id,
        "type" : "",
        "filterdata" : null,
        "filtertype" : filtertype
      };
      this.patientdataService.dashboardChart(monthlyheartrate).pipe(
        map(result=> {
          if(result.data.length > 0){
            for(var i = 0, len = result.data.length; i < len; i++){
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
        } )
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
  
  final_Graph_drawBloodReport(type,filterdata,filtertype){
    this.highBloodPressure_Data =[];
    this.lowBloodPressure_Data =[];
    this.dayName1 = [];
  
    const weeklyBP = {
      "member_id": this.member_id,
      "type" : type,
      // "filterdata" : filterdata,
      "filtertype" : filtertype
    };
    if(type =='weekly'){
  
    this.patientdataService.dashboardChart(weeklyBP).pipe(
      map(result=> {
        this.bpCondition =false;
        this.datarespose = result.data.DayName;
        this.highBloodPressure_Data =[];
        this.lowBloodPressure_Data =[];
        this.dayName1 = [];
       
        if(result.data.length > 0){
          for (var i = 0; i <  result.data.length; i++) {
              this.blood_pressure = result.data[i].blood_pressure.split("/");
              this.highBloodPressure_Data.push(this.blood_pressure[0]);
              this.lowBloodPressure_Data.push(this.blood_pressure[1]);
              this.dayName1.push(result.data[i].DayName);
          }
            this.bpCondition =true;
            this.highBloodPressure_Data = this.highBloodPressure_Data.reverse();
            this.lowBloodPressure_Data = this.lowBloodPressure_Data.reverse();
            this.dayName1 = this.dayName1.reverse()
        }
        this.titleName1 = "Week"
        setTimeout(() => {
          this.chart1();
        }, 400);
         
      } )
    ).subscribe(
      (result) => {
        // this.lineChartLabelsBlood = ["Sun", "Mon", "Tue", "Wed","Thu","Fri","Sat"];
      },
      (err) => {
        console.log(err);
      }
    );
    }
     if(type == 'yearly'){
     
      // this.lineChartLabelsBlood = [];
     
      
      // this.lineChartLabelsBlood =  this.lineChartLabelsBlood.reverse();
      // this.lineChartDataBlood[0].data = [];
      const weeklyBP = {
        "member_id": this.member_id,
        "type" : '',
        // "filterdata" : filterdata,
        "filtertype" : filtertype
      };
      this.patientdataService.dashboardChart(weeklyBP).pipe(
        map(result=> {
          this.highBloodPressure_Data =[];
          this.lowBloodPressure_Data =[];
          this.dayName1 = [];
          this.bpCondition =false;
           this.datarespose = result.data.MonthName;     
          if(result.data.length > 0){
            for (var i = 0,  len = result.data.length; i < len; i++) {
                this.blood_pressure = result.data[i].blood_pressure.split("/");
                this.highBloodPressure_Data.push(this.blood_pressure[0]);
                this.lowBloodPressure_Data.push(this.blood_pressure[1]); 
                this.dayName1.push(result.data[i].MonthName.slice(0,3))
              }
                this.titleName1 = "Year"; 
                this.bpCondition =true;
          }      
          setTimeout(() => {
            this.chart1();
          }, 400);
        } )
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
  
  final_Graph_drawRespiratoryRate(type,filterdata,filtertype){
   this.respiratoryData = []
    const weeklyRR = {
      "member_id": this.member_id,
      "type" : type,
      "filterdata" : null,
      "filtertype" : filtertype
    };
    if(type =='weekly'){
      this.respiratoryData = [];
      this.titleName3 = '';
      this.dayName3 = [];
      this.respiratoryCondition = false;
    this.patientdataService.dashboardChart(weeklyRR).pipe(
      map(result=> {
        this.datarespose = result.data.DayName;
        if(result.data.length > 0){
          for(var i = 0, len = result.data.length; i < len; i++){
            this.dayName3.push(result.data[i].DayName.slice(0, 3));
            this.respiratoryData.push(result.data[i].respiratory_rate);
          }
          this.respiratoryCondition = true;
          this.titleName3 = 'Week'
          this.respiratoryData =  this.respiratoryData.reverse();
          this.dayName3 = this.dayName3.reverse();
        }
        setTimeout(() => {
          this.chart3();
        }, 400);
         
      } )
    ).subscribe(
      (result) => {
       // this.lineChartLabelsresporetryRate = ["Sun", "Mon", "Tue", "Wed","Thu","Fri","Sat"];
      },
      (err) => {
        console.log(err);
      }
    );
    }  
    if(type == 'yearly'){
      this.respiratoryData = [];
      this.titleName3 = '';
      this.dayName3 = [];
      this.respiratoryCondition = false;
      
      const weeklyRR = {
        "member_id":  this.member_id,
        "type" : "",
        "filterdata" : null,
        "filtertype" : filtertype
      };
      this.patientdataService.dashboardChart(weeklyRR).pipe(
        map(result=> {
  
          if(result.data.length > 0){
            for(var i = 0, len = result.data.length; i < len; i++){
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
             
        } )
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
  
  final_Graph_drawOxygenSaturation(type,filterdata,filtertype){
    this.oxygenData = [];
    const weeklyOS = {
      "member_id": this.member_id,
      "type" : type,
      "filterdata" : "",
      "filtertype" : filtertype
    };
    if(type =='weekly'){
    this.oxygenData = [];
    this.oxygenCondition = false;
    this.titleName4 = '';
    this.dayName4 = []
    this.patientdataService.dashboardChart(weeklyOS).pipe(
      map(result=> {
        this.datarespose = result.data.DayName;
        if(result.data.length > 0){
          for(var i = 0, len = result.data.length; i < len; i++){
            this.dayName4.push(result.data[i].DayName);
            this.oxygenData.push(result.data[i].oxygen_saturation);
          }
          this.titleName4 = "Week";
          this.dayName4 = this.dayName4.reverse();
          this.oxygenData= this.oxygenData.reverse();
          this.oxygenCondition = true;
        }
        setTimeout(() => {
          this.chart4();
        }, 400); 
      } )
    ).subscribe(
      (result) => {
        //this.lineChartLabelsoxygensat = ["Sun", "Mon", "Tue", "Wed","Thu","Fri","Sat"];
      },
      (err) => {
        console.log(err);
      }
    );
    }
  
    if(type == 'yearly'){
      this.oxygenData = [];
      this.oxygenCondition = false;
      this.titleName4 = '';
      this.dayName4 = []
      const weeklyOS = {
        "member_id":  this.member_id,
        "type" : "",
        "filterdata" : null,
        "filtertype" : filtertype
      };
     
      this.patientdataService.dashboardChart(weeklyOS).pipe(
        map(result=> {
          if(result.data.length > 0){
            for(var i = 0, len = result.data.length; i < len; i++){
              this.dayName4.push(result.data[i].MonthName.slice(0, 3));
              this.oxygenData.push(result.data[i].oxygen_saturation);
            }
            this.titleName4 = "Year";
            this.oxygenCondition = true;
            this.dayName4 =  this.dayName4.reverse();
            this.oxygenData =  this.oxygenData.reverse();
          }
          setTimeout(() => {
            this.chart4();
          }, 400); 
        } )
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
  
  final_Graph_drawTemperature(type,filterdata,filtertype){
    this.temperatureData = [];
    this.temperatureCondition = false;
    this.titleName5 = '';
    this.dayName5 = []
    const weeklyTemprature = {
      "member_id": this.member_id,
      "type" : type,
      "filterdata" : null,
      "filtertype" : filtertype
    };
    if(type =='weekly'){
      this.temperatureData = [];
      this.temperatureCondition = false;
      this.titleName5 = '';
      this.dayName5 = []
    this.patientdataService.dashboardChart(weeklyTemprature).pipe(
      map(result=> {
        this.datarespose = result.data.DayName;
        if(result.data.length > 0){
          for(var i = 0, len = result.data.length; i < len; i++){
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
       
      } )
    ).subscribe(
      (result) => {
       // this.lineChartLabelsTemperature = ["Sun", "Mon", "Tue", "Wed","Thu","Fri","Sat"];
      },
      (err) => {
        console.log(err);
      }
    );
    }
    if(type == 'yearly'){
      this.temperatureData = [];
      this.temperatureCondition = false;
      this.titleName5 = '';
      this.dayName5 = []
      const weeklyTemprature = {
        "member_id": this.member_id,
        "type" : "",
        "filterdata" : null,
        "filtertype" : filtertype
      };
      this.patientdataService.dashboardChart(weeklyTemprature).pipe(
        map(result=> {
  
          if(result.data.length > 0){
            for(var i = 0, len = result.data.length; i < len; i++){
              this.dayName5.push(result.data[i].MonthName.slice(0, 3));
              this.temperatureData.push(result.data[i].temperature);
            }
            this.temperatureCondition = true;
          }
          this.titleName5 = "Year"
          setTimeout(() => {
            this.chart5();
          }, 400); 
         
        } )
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
  
  final_Graph_drawBMI(type,filterdata,filtertype){
    this.bmiData =[];
    this.dayName6 = [];
    this.titleName6 = '';
    this.bmiCondition = false;
    const weeklyBMI = {
      "member_id":  this.member_id,
      "type" : type,
      "filterdata" : null,
      "filtertype" : filtertype
    };
    if(type =='weekly'){
      this.bmiData =[];
      this.dayName6 = [];
      this.titleName6 = '';
      this.bmiCondition = false;
    this.patientdataService.dashboardChart(weeklyBMI).pipe(
      map(result=> {
        this.datarespose = result.data.DayName;
        if(result.data.length > 0){
          for(var i = 0, len = result.data.length; i < len; i++){
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
         
      } )
    ).subscribe(
      (result) => {
      //  this.lineChartLabelsBMI = ["Sun", "Mon", "Tue", "Wed","Thu","Fri","Sat"];
      },
      (err) => {
        console.log(err);
      }
    );
    }
    if(type == 'yearly'){
      this.bmiData =[];
      this.dayName6 = [];
      this.titleName6 = '';
      this.bmiCondition = false;
     
      const weeklyBMI = {
        "member_id": this.member_id,
        "type" : "",
        "filterdata" : null,
        "filtertype" : filtertype
      };
      this.patientdataService.dashboardChart(weeklyBMI).pipe(
        map(result=> {
          if(result.data.length > 0){
            for(var i = 0, len = result.data.length; i < len; i++){
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
        } )
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

  monthlyData_heartData(event:any){
    this.heartData = [];    
    this.dayName2 = [];
    this.heartRateCondition = false
    const monthlyheartrate = {
      "member_id": this.member_id,
      "type" : event.value,
       "filterdata" : null,
      "filtertype" : 'heart_rate'
    };

    this.patientdataService.dashboardChart(monthlyheartrate).pipe(
      map(result=> {
        // console.log('MM', result.data)
        if(result.data.length > 0){
          for(var i = 0, len = result.data.length; i < len; i++){
            var datePipe = new DatePipe("en-US");
            let date = datePipe.transform(result.data[i].createdate,"dd")
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

monthlyData_ResporetryReportData(event:any){
  this.respiratoryData = [];
    this.titleName3 = '';
    this.dayName3 = [];
    this.respiratoryCondition = false;
    const weeklyRR = {
      "member_id":  this.member_id,
      "type" : event.value,
      "filterdata" : "",
      "filtertype" : 'respiratory_rate'
    };

    this.patientdataService.dashboardChart(weeklyRR).pipe(
      map(result=> { 
        if(result.data.length > 0){
          for(var i = 0, len = result.data.length; i < len; i++){
            var datePipe = new DatePipe("en-US");
            let date = datePipe.transform(result.data[i].createdate,"dd")
            this.dayName3.push(date);
            this.respiratoryData.push(result.data[i].respiratory_rate);
          }
          this.titleName3 = "Month";
          this.respiratoryCondition = true;
          this.dayName3 =  this.dayName3.reverse();
          this.respiratoryData = this.respiratoryData.reverse();
        }
        setTimeout(() => {
          this.chart3();
        }, 400);
      } )
    ).subscribe( 
      (result) => {
        //this.lineChartLabels = ["Sun", "Mon", "Tue", "Wed","Thu","Fri","Sat"];
      },
      (err) => {
        console.log(err);
      }
    );
   
}

monthlyData_OxygensatData(event:any){

  this.dayName4 = [];
  this.oxygenData = [];  
  this.titleName4 = '';
  this.oxygenCondition = false
    const weeklyOS = {
      "member_id": this.member_id,
      "type" : event.value,
      "filterdata" : '',
      "filtertype" : 'oxygen_saturation'
    };

    this.patientdataService.dashboardChart(weeklyOS).pipe(
      map(result=> {
        if(result.data.length > 0){
          for(var i = 0, len = result.data.length; i < len; i++){
            var datePipe = new DatePipe("en-US");
            let date = datePipe.transform(result.data[i].createdate,"dd")
            this.dayName4.push(date);
            this.oxygenData.push(result.data[i].oxygen_saturation);
          }
          this.dayName4 =  this.dayName4.reverse();
          this.oxygenData =  this.oxygenData.reverse();
          this.oxygenCondition = true;
          this.titleName4 = "Month"
        }
        setTimeout(() => {
          this.chart4();
        }, 400);
      } )
    ).subscribe(
      (result) => {
        //this.lineChartLabels = ["Sun", "Mon", "Tue", "Wed","Thu","Fri","Sat"];
      },
      (err) => {
        console.log(err);
      }
    );
  }
monthlyData_TemperatureData(event:any){
      this.dayName5 = [];
      this.temperatureData = [];  
      this.titleName5 = '';
      this.temperatureCondition = false

        const weeklyTemprature = {
          "member_id":  this.member_id,
          "type" : event.value,
          // "filterdata" : filterdata,
          "filtertype" : 'temperature'
        };
    
        this.patientdataService.dashboardChart(weeklyTemprature).pipe(
          map(result=> {
            if(result.data.length > 0){
              for(var i = 0, len = result.data.length; i < len; i++){
                var datePipe = new DatePipe("en-US");
                let date = datePipe.transform(result.data[i].createdate,"dd")
                this.dayName5.push(date);
                this.temperatureData.push(result.data[i].temperature);
              }
              this.dayName5 =  this.dayName5.reverse();
              this.temperatureData= this.temperatureData.reverse();
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

monthlyData_BMIData(event:any){
      this.bmiData =[];
      this.dayName6 = [];
      this.titleName6 = '';
      this.bmiCondition = false;
      const weeklyBMI = {
        "member_id":  this.member_id,
        "type" : event.value,
        // "filterdata" : filterdata,
        "filtertype" : 'BMI'
      };
    
      this.patientdataService.dashboardChart(weeklyBMI).pipe(
        map(result=> {
    
          if(result.data.length > 0){
            for(var i = 0, len = result.data.length; i < len; i++){
              var datePipe = new DatePipe("en-US");
              let date = datePipe.transform(result.data[i].createdate,"dd")
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

monthlyData_BloodReportData(event:any){
      // this.lineChartLabelsBlood = [];
      this.highBloodPressure_Data =[];
      this.lowBloodPressure_Data =[];
      this.dayName1 = [];
      this.bpCondition = false;

      const weeklyBP = {
        "member_id": this.member_id,
        "type" : event.value,
        "filtertype" : 'blood_pressure'
      };
      
      this.patientdataService.dashboardChart(weeklyBP).pipe(
        map(result=> {
          this.datarespose = result.data.Date;
          if(result.data.length > 0){
            for (var i = 0; i < result.data.length; i++) {
                var datePipe = new DatePipe("en-US");
                let date = datePipe.transform(result.data[i].createdate,"dd")
                this.blood_pressure =  result.data[i].blood_pressure.split("/");
                this.highBloodPressure_Data.push(this.blood_pressure[0]);
                this.lowBloodPressure_Data.push(this.blood_pressure[1]);
                this.dayName1.push(date)
              }
              this.highBloodPressure_Data = this.highBloodPressure_Data.reverse();
              this.lowBloodPressure_Data = this.lowBloodPressure_Data.reverse();
              this.dayName1 = this.dayName1.reverse();
              this.titleName1 = "Month"
              this.bpCondition=true;
          }
            setTimeout(() => {
              this.chart1();
            }, 400);
        } )
      ).subscribe(
        (result) => {
        
        },
        (err) => {
          console.log(err);
        }
      );
    
}

}
