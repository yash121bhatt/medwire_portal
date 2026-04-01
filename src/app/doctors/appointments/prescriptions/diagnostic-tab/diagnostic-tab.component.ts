import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {COMMA, ENTER, I} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import { MatAutocompleteActivatedEvent, MatAutocompleteTrigger, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ThemePalette } from "@angular/material/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'src/app/core/service/auth.service';
import { DoctorServiceService } from 'src/app/services/doctor-service.service';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';


/**
 * @title Chips Autocomplete
 */
 export interface PeriodicElement {
  
  no: number;
  patient: string;
  appointment_date: string;
  description: string;
  laboratory: string;
  lab_date: string;
  followup: string;
  actions: any;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {
    no: 1,
    patient: "Sarah Corner",
    appointment_date: "12/10/2022 18:40 PM",
    description: "Renal Profile, Chloride Test",
    laboratory: "Central Lab Indore",
    lab_date: "12/10/2022 18:40 PM",
    followup: "7 days",
    actions: " ",
  },
  {
    no: 2,
    patient: "Sarah Corner",
    appointment_date: "12/10/2022 18:40 PM",
    description: "Chloride Test, Cholesterol Test",
    laboratory: "Unipath Specialty Laboratory",
    lab_date: "12/10/2022 18:40 PM",
    followup: "15 days",
    actions: " ",
  },
  {
    no: 3,
    patient: "Sarah Corner",
    appointment_date: "12/10/2022 18:40 PM",
    lab_date: "NA",
    description: "Insulin Test, Iron Test",
    laboratory: "Central Lab Indore",
    followup: "20 days",
    actions: " ",
  },
  
  
];
@Component({
  providers: [DatePipe],
  selector: 'app-diagnostic-tab',
  templateUrl: './diagnostic-tab.component.html',
  styleUrls: ['./diagnostic-tab.component.sass']
})
export class DiagnosticTabComponent implements OnInit {
  flat = false;
  persentage = false;
  isHidden=true;
  public selection: string;
  public selectionRadio: string;
  public customOption: string = 'customOption';
  radioGroup: any;
  variables3 = [];
  
  filteredList3 = this.variables3.slice();

  variables4 = [];
  
  filteredList4 = this.variables3.slice();
  
  color: ThemePalette = "accent";
  labList: any;
  timeSlot: any;
  showslotMessage: boolean;
  cancelbtnClientId: any;
  timeslotValue: any;



  //mat-tablle-filter
  @ViewChild('empTbSort') empTbSort = new MatSort();
  sort: MatSort;
  urlparameter: any;
  isHiddenonline: boolean;
  onlinevalueStatus: number;
  offlinevalueStatus: number;
  labconditionShow: boolean =false;
  radioconditionShow: boolean = false;
  flatRadio: boolean;
  radiologiList: any;
  timeslotValueRadio: any;
  timeSlotRadio: any;
  labDateToUse: string;
  radioDatetoUse: string;
  ngAfterViewInit() {
    this.dataSource3.sort = this.empTbSort;
  }
  separatorKeysCodes: number[] = [ENTER, COMMA];
  diagnosticCtrl = new FormControl('');
   filteredDiagnostics: Observable<string[]>;
   diagnostics: string[] = [];
   allDiagnostics: string[] = ['ACTH ', 'Ammonia Test', 'Bicarbonate Test', 'Blood Group Test', 'Blood Sugar Test', 'Calcium Test', 'CBC / Hemogram Test', 'Chloride Test', 'Cholesterol Test', 'Creatinine Test', 'Dengue IgG Test', 'DHEA Test', 'Electrolytes Test', 'Folic Acid Test', 'Glucose Tolerance Test (GTT)', 'HIV Test', 'Insulin Test', 'Iron Test', 'Kidney / Renal Function Test', 'Lipid Profile', 'Lithium Test', 'Liver Function Test','Phosphorus Test', 'Pregnancy Test', 'Renal Profile', 'Semen Analysis Test', 'Sodium Test', 'Total Protein Test', 'Typhidot Test', 'Urea Test', 'Uric Acid Test', 'Urine Routine', 'Vitamin B12 Test', 'Vitamin D Test', 'Widal Test'];
 
   @ViewChild('diagnosticInput') diagnosticInput: ElementRef<HTMLInputElement>;
   displayedColumns: string[] = [
    "no",
    "patient",
    "appointment_date",
    "description",
    "laboratory",
    "lab_date",
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
   diagnosticTabForm: FormGroup;
   submitted = false;
   returnUrl: string;
   public Editor = ClassicEditor;
 
   constructor(
    private fb: FormBuilder,
    private router : Router,
    private authService: AuthService,
    private doctorServiceService: DoctorServiceService,
    private patientServiceService : PatientServiceService,
    private activatedRoute: ActivatedRoute,
    private datepipe :DatePipe

    ) { 
     this.filteredDiagnostics = this.diagnosticCtrl.valueChanges.pipe(
       startWith(null),
       map((diagnostic: string | null) => (diagnostic ? this._filter(diagnostic) : this.allDiagnostics.slice())),
     );

     this.diagnosticTabForm = this.fb.group({
      lab_name: [""],
      radio_name : [""],
      Book_test: [""],
      book_radio_test : [""],
      lab_test_name: [""],
      radio_test_name: [""],
      booking_date: [""],
      radio_booking_date : [""],
      description: [""],
     })
   }

   changediv(divid) {
    if (divid === "self_div") {
      this.flat = true;
      this.persentage = false;
    }
    else if (divid === "doctor_div") {
      this.flat = false;
      this.persentage = true;
    }

  }

  changeRadiodiv(divid) {
    if (divid === "self_div") {
      this.flatRadio = true;
      this.persentage = false;
    }
    else if (divid === "doctor_div") {
      this.flatRadio = false;
      this.persentage = true;
    }

  }


   add(event: MatChipInputEvent): void {
     const value = (event.value || '').trim();
 
     // Add our fruit
     if (value) {
       this.diagnostics.push(value);
     }
 
     // Clear the input value
     event.chipInput!.clear();
 
     this.diagnosticCtrl.setValue(null);
   }
 
   remove(diagnostic: string): void {
     const index = this.diagnostics.indexOf(diagnostic);
 
     if (index >= 0) {
       this.diagnostics.splice(index, 1);
     }
   }
 
   selected(event: MatAutocompleteSelectedEvent): void {
     this.diagnostics.push(event.option.viewValue);
     this.diagnosticInput.nativeElement.value = '';
     this.diagnosticCtrl.setValue(null);
   }
 
   private _filter(value: string): string[] {
     const filterValue = value.toLowerCase();
 
     return this.allDiagnostics.filter(diagnostic => diagnostic.toLowerCase().includes(filterValue));
   }
   ngOnInit() {
    this.dataSource3.paginator = this.paginator;
    this.cancelbtnClientId = JSON.parse(localStorage.getItem('clientData'));
    this.laborateryList();
    this.radiologyList();
   }
   todayDate:Date = new Date();
   success_message:boolean= false;
   error_message:boolean = false;
   error_message_text:string;


   onSubmit() {
     this.submitted = true;

     const newData = {
     is_booK_radio_test : this.offlinevalueStatus,
     is_booK_lab_test: this.onlinevalueStatus,
     diagnostic_names:this.diagnosticTabForm.value.description,
     doctor_id:this.authService.currentUserValue.userid, 
     lab_id:this.diagnosticTabForm.value.lab_name,
     appointment_id:this.activatedRoute.snapshot.paramMap.get('appointment_id'),
     lab_time_slot: this.timeslotValue,
     lab_appointment_date:this.labDateToUse,
     lab_test_ids:this.diagnosticTabForm.value.lab_test_name,
     is_lab_appointment  :this.flat===true?1:0,
     is_radio_appointment:this.flatRadio===true?1:0,
     radio_id:this.diagnosticTabForm.value.radio_name,
     radio_time_slot :this.timeslotValueRadio,
     radio_appointment_date: this.radioDatetoUse,
     radio_test_ids:this.diagnosticTabForm.value.radio_test_name,
     }

     const data = {
      doctor_id: this.authService.currentUserValue.userid,
      appointment_id:this.activatedRoute.snapshot.paramMap.get('appointment_id'),
      diagnostic_names:this.diagnostics,
      lab_id:this.diagnosticTabForm.value.lab_name,
      test_ids:this.diagnosticTabForm.value.lab_test_name.toString(),
      is_book_lab_test: this.flat===true?'yes':'no',
      appointment_date:new Date(this.diagnosticTabForm.value.booking_date),
      appointment_time: this.timeslotValue
  }

  
this.doctorServiceService.addDiagonist(newData).subscribe(
  (result)=>{
    Swal.fire(
      '',
      'Diagnostic Test Added Successfully',
      'success'
    );
    this.router.navigate(["/doctors/appointments/prescriptions/prescription-tabsfour/"+4+'/'+this.activatedRoute.snapshot.paramMap.get('appointment_id')])
   
  }, 
  (err)=>{
    Swal.fire(
      '',
     err,
      'error'
    );

  }
);
    // this.router.navigate(["/doctors/appointments/prescriptions/prescription-tabsfour/"+4]) 
   }


   laborateryList(){
    const data ={
      doctor_id : this.authService.currentUserValue.userid,
      role_id   :'3'
    }
    this.doctorServiceService.getLaborateryList(data).subscribe(
      (result)=>{
        this.labList = result.data;
      },
      (err)=>{
       
      }
    );
   }

   radiologyList(){
    const data ={
      doctor_id : this.authService.currentUserValue.userid,
      role_id   :'4'
    }
    this.doctorServiceService.getLaborateryList(data).subscribe(
      (result)=>{
        this.radiologiList = result.data;
      },
      (err)=>{
       
      }
    );
   }


   onChangelab (eventid:any){
    // console.log(eventid);
    if(eventid){
      const data ={
        lab_id : eventid
      }

      this.doctorServiceService.getallTest(data).subscribe(
        (result)=>{
        
        this.variables3 = result.data;
        this.filteredList3 = this.variables3.slice();
        }, 
        (err)=>{

        }
      )
    }
   
   }


   onChangeradio (eventid:any){
    // console.log(eventid);
    if(eventid){
      const data ={
        lab_id : eventid
      }

      this.doctorServiceService.getallTest(data).subscribe(
        (result)=>{

          // console.log('radio result', result);
        
        this.variables4 = result.data;
        this.filteredList4 = this.variables4.slice();
        }, 
        (err)=>{

        }
      )
    }
   }

   getTimeslot(event: any){
   // console.log(event);
    //var startDDate = event.startDate;
    var modifiedDate = event.value.toString().slice(4,15);

   this.labDateToUse = this.datepipe.transform(modifiedDate, 'yyyy-MM-dd')+'T00:00:00.000Z';

    this.timeslotValue = '';
    const data ={
      user_id : this.diagnosticTabForm.value.lab_name,
      appoin_date :  this.datepipe.transform(modifiedDate, 'dd-MM-yyyy')+'T00:00:00.000Z'
    }


    this.patientServiceService.checkDatetime(data).subscribe(
      (result)=>{
        this.timeSlot = result.Remaining_Slots;
        
          if(result.data.length >0){
              this.showslotMessage = false;
          }
          else{
            this.showslotMessage = true;
          }
      },
      (err)=>{

      }
    )

    // console.log('change Date',event.value);
  }

  //Radio Slot
  getTimeslotRadio(event: any){
    var startDDate = event.startDate;
    var modifiedDate = event.value.toString().slice(4,15);

    this.radioDatetoUse = this.datepipe.transform(modifiedDate, 'yyyy-MM-dd')+'T00:00:00.000Z';

    this.timeSlotRadio = '';
    const data ={
      user_id : this.diagnosticTabForm.value.radio_name,
      appoin_date : this.datepipe.transform(modifiedDate, 'dd-MM-yyyy')+'T00:00:00.000Z'
    }



    this.patientServiceService.checkDatetime(data).subscribe(
      (result)=>{
        this.timeSlotRadio = result.Remaining_Slots;
        
          if(result.data.length >0){
              this.showslotMessage = false;
          }
          else{
            this.showslotMessage = true;
          }
      },
      (err)=>{

      }
    )

    // console.log('change Date',event.value);
  }

  getSlotvalue (value:any){
    this.timeslotValue = value;
  }

  getSlotvalueRadio (value:any){
    this.timeslotValueRadio = value;
  }


  togglelaboratery(event){
    if(event.checked===true){
      this.labconditionShow = true;
      this.onlinevalueStatus = 1;
    }
    else{
      this.labconditionShow = false;     
       this.onlinevalueStatus = 0;
    }
      
  }
  toggleradiology(event){
    if(event.checked===true){
      this.radioconditionShow = true;
      this.offlinevalueStatus = 1;
    }
    else{
      this.radioconditionShow = false;
      this.offlinevalueStatus = 0;
    }
  
}
}
 
 
 