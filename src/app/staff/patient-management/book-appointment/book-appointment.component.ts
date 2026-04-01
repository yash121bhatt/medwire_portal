import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators, } from "@angular/forms";
import { ThemePalette } from "@angular/material/core";
// import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { MatTableDataSource } from '@angular/material/table';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatAutocompleteActivatedEvent, MatAutocompleteTrigger, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AuthService } from 'src/app/core/service/auth.service';
import { ClinicServiceService } from 'src/app/services/clinic-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
/**
 * @title Chips Autocomplete
 */
@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.sass']
})
export class BookAppointmentComponent implements OnInit{
  separatorKeysCodes: number[] = [ENTER, COMMA];
  historyCtrl = new FormControl('');
  filteredHistorys: Observable<string[]>;
  historys: string[] = [];
  allHistorys: string[] = ['Joint Pain', 'Weight Loss', 'Weight Gain', 'Fever', 'Cold', 'Night Sweats', 'Early Satiety', 'Dry eye', 'Wet eye', 'Dry mouth', 'Wet mouth', 'Headaches', 'Headaches with lightheadedness', 'nausea', 'Lymphadenopathy', 'Facial Rash', 'weakness', 'decreased RBC', 'decreased Hemoglobin', 'increase RBC', 'increase Hemoglobin', 'no wheezes in lungs ', 'no crackles in lungs', ' No pallor', 'hair loss', 'dry or brittle nails', 'Positive for fatigue', 'traumatic injury', 'loss of sensation', 'No changes to hearing' , 'discharge from ear' ];
  @ViewChild('prescriptionInput') prescriptionInput: ElementRef<HTMLInputElement>;
  grid = true;
  selectedStatus:number;
  bookappointmentForm: FormGroup;
  submitted = false;
  returnUrl: string;
  color: ThemePalette = "accent";
  public variables = [];
  public filteredList:any;
  userId:any
  doctorId : any;
  consulting_fee:any;
  newDate : Date = new Date();
  patientId : any
  created_by_id:any;

  constructor(private router:Router ,private fb: FormBuilder , private clinicServiceService: ClinicServiceService, private activatedRoute:ActivatedRoute, private authService:AuthService , private clinicService:ClinicServiceService) {
    this.filteredHistorys = this.historyCtrl.valueChanges.pipe(
      startWith(null),
      map((history: string | null) => (history ? this._filter(history) : this.allHistorys.slice())),
    );
    this.bookappointmentForm = this.fb.group({
      doctor_id: ["", [Validators.required]],
      appointment_date: [""],
      patient_id : [""],
      clinic_id : [""],
      total_amount : [""],
      grand_total : [""],
      reason : [""],
      consulting_fee: [""],
      type : [""],
      time_slot: [""],
      payment_status: ["", [Validators.required]],
    });
    
  }

 ngOnInit(): void {
     this.userId = this.authService.currentUserValue.userid;
     this.patientId = this.activatedRoute.snapshot.paramMap.get("id")
     this.staffDetail();
     setTimeout(() => {
      this.doctorList();      
     }, 2000);
 }

onSelect(e){
  //  console.log(e.value)
  //  console.log(id);
  this.consulting_fee = e.value.clinic_visit_consulting_fee
  this.doctorId = e.value.doctor_id
}

  doctorList(){
    let data = {
      clinic_id : this.created_by_id
   }
   this.clinicService.doctorFeesList(data).subscribe((result)=>{
      this.variables = result.data;
      this.filteredList = this.variables.slice();
  });
  }

 
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.historys.push(value);
      
    }
    // Clear the input value
    event.chipInput!.clear();
    this.historyCtrl.setValue(null);
  }

  remove(history: string): void {
    const index = this.historys.indexOf(history);

    if (index >= 0) { 
      this.allHistorys.push(history);
      this.historys.splice(index, 1);
      this.filteredHistorys = this.historyCtrl.valueChanges.pipe(
        startWith(null),
        map((history: string | null) => (history ? this._filter(history) : this.allHistorys.slice())),
      );
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.historys.push(event.option.viewValue);
    // this.prescriptionInput.nativeElement.value = '';
    this.historyCtrl.setValue(null);
    let index = this.allHistorys.indexOf(event.option.viewValue);
    this.allHistorys.splice(index, 1);
    this.filteredHistorys = this.historyCtrl.valueChanges.pipe(
      startWith(null),
      map((history: string | null) => (history ? this._filter(history) : this.allHistorys.slice())),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allHistorys.filter(history => history.toLowerCase().includes(filterValue));
  }
  success_message:boolean= false;
  error_message:boolean = false;
  error_message_text:string;

  timeSlot(time){
    let hours =  new Date(time).getHours();
    let minutes:any =  new Date(time).getMinutes();
    var newformat = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = (minutes < 10) ? ('0' + minutes) : minutes;
    return hours+":"+minutes+newformat;
  }

  onSubmit() {
    this.submitted = true;
    var date = new Date();

let day = ((date.toString().slice(8,10)))
let month = ('0' + (date.getMonth()+1)).slice(-2);
let year = date.getFullYear();
var get_formate = year+'-'+month+'-'+day+'T00:00:00.000Z';
let time = date.getTime();
let time1 = date.getTime() + 15*60000;
let openTime = this.timeSlot(time);
let closeTime =  this.timeSlot(time1);
let timeSlotMain = openTime+"-"+closeTime


let data ={ 
      doctor_id: this.doctorId,
      clinic_id: this.created_by_id,
      staff_id: this.userId,
      patient_id: this.patientId,
      total_amount: this.consulting_fee,
      grand_total:this.consulting_fee,
      appointment_date:get_formate,
      reason:JSON.stringify([this.historys]),
      consulting_fee:this.consulting_fee,
      type:"offline",
      time_slot:timeSlotMain,
      member_id:"[]",
      user_id:this.patientId,
      payment_status : "Success"
}

    // console.log("data--------",data);
    this.clinicService.bookAppointmentForPatient(data).subscribe((res:any)=>{
      if(res.status_code == 200){
        // console.log(res);
        
        setTimeout(()=> {
          this.router.navigate(['/staff/patient-management/patient-list']);
        }, 600 );

      }
      Swal.fire(
        '',
        res.message,
        'success'
      )
    },(error:any)=>{
      Swal.fire(
        '',
        error.message,
        'error'
      )
    })
  }


  staffDetail() {
    let data = {
      staff_id: this.authService.currentUserValue.userid,
    }
    this.clinicServiceService.staffDetail(data).subscribe(
      (result) => {
        if (result.status_code == 200) {
          // console.log(result);
          this.created_by_id = result.data[0].created_by_id;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}