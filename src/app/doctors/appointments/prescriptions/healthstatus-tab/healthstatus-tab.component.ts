import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import { MatAutocompleteActivatedEvent, MatAutocompleteTrigger, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/core/service/auth.service";
import { DoctorServiceService } from 'src/app/services/doctor-service.service';
import Swal from 'sweetalert2';


/**
 * @title Chips Autocomplete
 */
 export interface PeriodicElement {
  no: number;
  patient: string;
  appointment_date: string;
  description: string;
  followup: string;
  actions: any;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {
    no: 1,
    patient: "Sarah Corner",
    appointment_date: "12/10/2022 18:40 PM",
    description: "Now you can book your appointment online Cunsultant too.",
    followup: "7 days",
    actions: " ",
  },
  {
    no: 2,
    patient: "Sarah Corner",
    appointment_date: "12/10/2022 18:40 PM",
    description: "As Per Concern, taste is important",
    followup: "15 days",
    actions: " ",
  },
  {
    no: 3,
    patient: "Sarah Corner",
    appointment_date: "12/10/2022 18:40 PM",
    description: "As Per Concern, taste is important",
    followup: "20 days",
    actions: " ",
  },
  
  
];

@Component({
  selector: 'app-healthstatus-tab',
  templateUrl: './healthstatus-tab.component.html',
  styleUrls: ['./healthstatus-tab.component.sass']
})
export class HealthstatusTabComponent implements OnInit {
  //mat-tablle-filter
  @ViewChild('empTbSort') empTbSort = new MatSort();
  sort: MatSort;
  urlparameter: any;
  cancelbtnClientId: any;
 
  ngAfterViewInit() {
    this.dataSource3.sort = this.empTbSort;
  }
 

  @ViewChild('followInput') followInput: ElementRef<HTMLInputElement>;
  displayedColumns: string[] = [
    "no",
    "patient",
    "appointment_date",
    "description",
    "followup",
    "actions",
  ];
  dataSource = ELEMENT_DATA;
  dataSource2 = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource3 = new MatTableDataSource(ELEMENT_DATA);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  } 
  vitalTabForm: FormGroup;
  submitted = false;
  returnUrl: string;
  public Editor = ClassicEditor;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private authService: AuthService,
    private doctorServiceService : DoctorServiceService

    ) { 
    this.vitalTabForm = this.fb.group({
      heart_rate : [""],
      high_blood_pressure : [""],
      low_blood_pressure : [""],
      respiratory_rate   : [""],
      oxygen_saturation  : [""],
      temperature        : [""],
      bmi                : [""],
    })
  }
 
  ngOnInit() {
    this.dataSource3.paginator = this.paginator;
    this.cancelbtnClientId = JSON.parse(localStorage.getItem('clientData'));
  }
  success_message:boolean= false;
  error_message:boolean = false;
  error_message_text:string;
  onSubmit() {
    this.submitted = true;

    const data ={
    doctor_id: this.authService.currentUserValue.userid,
    appointment_id:this.activatedRoute.snapshot.paramMap.get('appointment_id'),
    heart_rate:this.vitalTabForm.value.heart_rate,
    blood_pressure:this.vitalTabForm.value.high_blood_pressure?this.vitalTabForm.value.high_blood_pressure +'/'+this.vitalTabForm.value.low_blood_pressure:'',
    respiratory_rate:this.vitalTabForm.value.respiratory_rate,
    oxygen_saturation:this.vitalTabForm.value.oxygen_saturation,
    temperature:this.vitalTabForm.value.temperature,
    bmi:null
    }


    this.doctorServiceService.addvitalInfo(data).subscribe((result)=>{
      Swal.fire(
        '',
        result.message,
        'success'
      )
     
        this.router.navigate(["/doctors/appointments/prescriptions/prescription-tabstwo/"+2+'/'+this.activatedRoute.snapshot.paramMap.get('appointment_id')])
        
    },
    (err)=>{
      Swal.fire(
        '',
       err,
        'error'
      );
        
    }
    );

    
    //this.router.navigate(["/doctors/appointments/prescriptions/prescription-tabs-second/"+2])


  }
  }
