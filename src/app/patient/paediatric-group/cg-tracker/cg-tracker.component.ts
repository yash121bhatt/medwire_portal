import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PatientdataService } from "src/app/services/patientdata.service";
import { AuthService } from "src/app/core/service/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from 'sweetalert2';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
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


@Component({
  selector: 'app-cg-tracker',
  templateUrl: './cg-tracker.component.html',
  styleUrls: ['./cg-tracker.component.sass']
})
export class CgTrackerComponent implements OnInit {
  docForm: any;
  fb: any;
  eventEditForm: any;
  selectedStatus: string;
  gender_f: string;
  gender_m:string;
  baby_gender: string;
  baby_date : string;
  baby_name: number;
  baby_ofbirthdate: any;
  error_message:boolean = false;
  female_type:boolean = false;
  male_type:boolean = false;
  error_message_text:string;


  gridsize: number = 30;
  showAge: number;
  idealBabyWeight: any;
  babyMonth: number;
  father_height: string;
  mother_height: string;
  totalHeight: Number;
  idealBabyHeight: number;
  updateSetting(event) {
    this.gridsize = event.value;
  }

  gridsize1: number = 30;
  updateSettingweight(event) {
    this.gridsize1 = event.value;
  }
  constructor(
    private router: Router,
    private authService:AuthService,
    private route:ActivatedRoute,
    private patientdataService:PatientdataService
  ) { 
    // this.docForm = this.fb.group({
    //   dob: ["", [Validators.required]],
    // });
    this.eventEditForm = new FormGroup({          
      'completed': new FormControl()
      });      
    this.selectedStatus = 'Female';
    this.gender_f= 'Female';
    this.gender_m='Male';
  }


  @ViewChild("chart", { static: true }) chart: ChartComponent;
  // public barChartOptions: any;
  public barChartOptions: Partial<ChartOptions>;
  public barChart2Options: any;
  public lineChartOptions: any;
  public lineChart2Options: any;
  public lineColumnChartOptions: any;
  public areaChartOptions: any;
  public pieChartOptions: any;
  public radarChartOptions: any;


  ngOnInit() {
    Swal.fire(
      '',
      'Child Growth Tracker Coming Soon',
      'success'
    );

    setTimeout(() => {
      this.router.navigate(["/patient/dashboard"]);
    }, 1000);

   

  
 this.chart1();
  const babydist = {
    "baby_id" : this.router.url.split('?')[0].split('/').pop(),
    "user_id" : this.authService.currentUserValue.userid
    }

    this.patientdataService.singleBaby(babydist).subscribe(
      (result)=>
      {
       console.log(result.data);  
       this.selectedStatus = result.data.baby_gender;
       if(this.selectedStatus=='Female'){
        this.female_type = true;
        this.male_type = false;
       }
       if(this.selectedStatus=='Male'){
        this.female_type = false;
        this.male_type = true;
       }
       this.baby_name = result.data.baby_name;
       this.baby_ofbirthdate = result.data.date_of_birth;
       this.father_height = result.data.father_height;
       this.mother_height = result.data.mother_height;
       
       const convertAge = new Date(this.baby_ofbirthdate);
       const timeDiff = Math.abs(Date.now() - convertAge.getTime());
       this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
       this.babyMonth = Math.floor((timeDiff / (1000 * 3600 * 24)));
      

      },
      (err)=>{
      console.log(err);  
      }
    );

    setTimeout(() => {
      this.chart1();
    }, 1000);
     
    
  }

  private chart1() {

    if(this.showAge<=1){
      this.idealBabyWeight = (this.babyMonth +9 )/2;
    }
    else if(this.showAge > 1 && this.showAge <= 5){
      this.idealBabyWeight =  2 * (this.showAge + 5);
    }
    else{
      this.idealBabyWeight = ( 4 * this.showAge ) ;
    }

 
   
    if( this.selectedStatus=='Male'){
     this.idealBabyHeight = (parseInt(this.father_height)  + parseInt(this.mother_height)+13)/2;
    }else{
      this.idealBabyHeight = (parseInt(this.father_height)  + parseInt(this.mother_height)-13)/2;
    }

    this.barChartOptions = {

      series: [
        {
          name: "Ideal Height",
          data: [null],
        },
        {
          name: "Input Height",
          data: [null],
        },

        {
          name: "",
          data: [null],
        },
        {
          name: "Ideal Weight",
          data: [null],
        },
        {
          name: "Input Weight",
          data: [null],
        },

        {
          name: "Ideal Circumference",
          data: [null],
        },
        {
          name: "Input Circumference",
          data: [null],
        },
      
      ],
      
      chart: {
        type: "bar",
        height: 350,
        foreColor: "#9aa0ac",
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 5,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "",
          "",
          
        ],
        labels: {
          style: {
            colors: "#9aa0ac",
          },
        },
      },
      yaxis: {
        title: {
          text: "(Child Growth Tracker)",
        },
      },
      fill: {
        opacity: 1,
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

  evalute_graph(height,weight,circumference){
    if(height == '' || weight == '' || circumference == ''){
      this.error_message= true;
      this.error_message_text="All Input Field is required";   
    }
    else{
      this.error_message= false;
    
      this.barChartOptions.series = [
        {
          name: "Ideal Height",
          data: [this.idealBabyHeight],
        },
        {
          name: "Input Height",
          data: [height],
        },
        {
          name: "",
          data: [0],
        },
        
        {
          name: "Ideal Weight",
          data: [this.idealBabyWeight],
        },
        {
          name: "Input Weight",
          data: [weight],
        },
        {
          name: "",
          data: [0],
        },
        
        {
          name: "Ideal Circumference",
          data: [10],
        },
        {
          name: "Input Circumference",
          data: [circumference],
        },
      ];
    }
    
  }

}
