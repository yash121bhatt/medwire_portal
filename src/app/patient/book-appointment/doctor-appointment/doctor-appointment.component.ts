import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { AuthService } from 'src/app/core/service/auth.service';
import { PatientdataService } from 'src/app/services/patientdata.service';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { MatAutocompleteActivatedEvent, MatAutocompleteTrigger, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import Swal from 'sweetalert2';
import { ClinicServiceService } from 'src/app/services/clinic-service.service';
import { DatePipe } from '@angular/common';


@Component({
  providers: [DatePipe],
  selector: 'app-doctor-appointment',
  templateUrl: './doctor-appointment.component.html',
  styleUrls: ['./doctor-appointment.component.sass']
})
export class DoctorAppointmentComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  historyCtrl = new FormControl('');
  filteredHistorys: Observable<string[]>;
  historys: string[] = [];
  allHistorys: string[] = ['Joint Pain', 'Weight Loss', 'Weight Gain', 'Fever', 'Cold', 'Night Sweats', 'Early Satiety', 'Dry eye', 'Wet eye', 'Dry mouth', 'Wet mouth', 'Headaches', 'Headaches with lightheadedness', 'nausea', 'Lymphadenopathy', 'Facial Rash', 'weakness', 'decreased RBC', 'decreased Hemoglobin', 'increase RBC', 'increase Hemoglobin', 'no wheezes in lungs ', 'no crackles in lungs', 'No pallor', 'hair loss', 'dry or brittle nails', 'Positive for fatigue', 'traumatic injury', 'loss of sensation', 'No changes to hearing' , 'discharge from ear' ];
  @ViewChild('prescriptionInput') prescriptionInput: ElementRef<HTMLInputElement>;
  doctorID: any;
  clinicID: any;
  doctorName: any;
  clinicName: any;
  clinicAddress: any;
  speciality: any;
  experence: any;
  clinicaddress: any;
  profileImageurl =  `${environment.documentUrl}`;
  apiRoute        =`${environment.apiUrl}`;
  profileImage: any;
  experience: any;
  appointment_type: string;
  fees: any;
  availableSlot: any;
  payNowbtn : boolean = true;
  loading : boolean = false;
  showslotMessage: boolean = false;
  showslotMessage1: boolean = false;
  selectedTimeSlot: any;
  memberID: string;
  morningavailableSlot: any;
  afternoonavailableSlot: any;
  eveningavailableSlot: any;
  email_id: any;
  weeklyData :any;
  maxDate:any;
  currentDate:Date = new Date();
  public variables = []; 
  public variables3 ;//['Centre for Accident', 'Emergency Centre for Bone Joint', 'Centre for Cancer', 'Centre for Cardiac Sciences', 'Centre for Children', 'Centre for Childrens Heart', 'Centre for Cosmetology Plastic Surgery', 'Centre for Critical Care', 'Centre for Diabetes Bariatric Surgery', 'Centre for Mother Child', 'Centre for Neurosciences', 'Centre for Physical Medicine Rehabilitation', 'Centre for Robotic Surgery', 'Centre for Sports Medicine', 'Centre for Transplant', 'Anaesthesiology', 'Bariatric Surgery', 'Clinical Haematology', 'Cosmetology', 'Dental Surgery', 'Dermatology', 'Development Disorders', 'Endocrinology Diabetes', 'ENT', 'Fetal Medicine', 'Gastroenterology', 'General Surgery', 'Genetics Molecular Medicine', 'Gynaecology Obstetrics', 'Hepato Pancreato Biliary', 'Internal Medicine', 'Interventional Radiology', 'Laboratory Medicine', 'Minimal Access Surgery', 'Nephrology', 'Nuclear Medicine', 'Nutrition Therapy', 'Ophthalmology', 'Pain Management Palliative Care', 'Plastic Reconstructive Surgery', 'Psychiatry', 'Pulmonary Medicine', 'Radiology', 'Regenerative Medicine', 'Reproductive Endocrinology Fertility', 'Transfusion Medicine', 'Urology', 'Vascular Surgery'];

  public filteredList2 = this.variables.slice();
  public filteredList3;
  bookAppointmentForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private activatedRoute : ActivatedRoute,
    private authService    : AuthService,
    private patientdataService : PatientdataService,
    private formBuilder: FormBuilder,
    private router : Router,
    private clinicServiceService : ClinicServiceService,
    private datepipe : DatePipe

  ) { 

    this.bookAppointmentForm = this.fb.group({

      description: [""]
    })
    this.filteredHistorys = this.historyCtrl.valueChanges.pipe(
      startWith(null),
      map((history: string | null) => (history ? this._filter(history) : this.allHistorys.slice())),
    );

  }

  appoitnementForm = this.formBuilder.group({
    dateOfAppointment: '',
    
  });




  myDateFilter = (d: Date | null): boolean => {
    
    // let day ; 
    let statement1:any = true;
    let statement2:any = true;
    let statement3:any = true;
    let statement4:any = true;
    let statement5:any = true;
    let statement6:any = true;
    let statement7:any = true;
    
    if(this.weeklyData.length > 0){
      let day = d.getDay();
      // if(d.getDay() ==)   
      if(this.weeklyData){
      if(this.weeklyData[0].status == 0){
        statement1 = (day!==1)
      }
      if(this.weeklyData[1].status == 0){
        statement2 = (day!==2)
      }
      if(this.weeklyData[2].status == 0){
        statement3 = (day!==3)
      }
      if(this.weeklyData[3].status == 0){
        statement4 = (day!==4)
      }
      if(this.weeklyData[4].status == 0){
        statement5 = (day!==5)
      }
      if(this.weeklyData[5].status == 0){
        statement6 = (day!==6)
      }
      if(this.weeklyData[6].status == 0){
        statement7 = (day!==0)
      }
    }
    }else if(this.weeklyData.length == 0){
      this.showslotMessage = true; 
    }
    

    //  console.log(statement1 , statement2 , statement3 , statement4 , statement5 , statement6 , statement7)
     return statement1 && statement2 && statement3 && statement4 && statement5 && statement6 && statement7
  } 

  blockDateAfterThreeMonth(){
     let dd = this.currentDate
    //  this.maxDate = dd + 3;
     dd.setMonth(dd.getMonth() + 3);
     this.maxDate = dd;
  } 

  ngOnInit(): void {
    this.blockDateAfterThreeMonth();

    this.memberID = this.activatedRoute.snapshot.paramMap.get('memberId')
    const data ={
      id: this.activatedRoute.snapshot.paramMap.get('id')
    }
    this.patientdataService.getDoctordetail(data).subscribe(
      (result)=>{
           this.appointment_type =  this.activatedRoute.snapshot.paramMap.get('type');
           this.doctorID     = result.data[0].doctor_id,
           this.clinicID     = result.data[0].clinic_id,
           this.doctorName   = result.data[0].doctor,
           this.clinicName   = result.data[0].clinic,
           this.speciality   = result.data[0].speciality_name,
           this.clinicAddress = result.data[0].clinic_address,
           this.experience     = result.data[0].experience_in_year,
           this.clinicaddress = result.data[0].clinic_address,
           this.profileImage  = result.data[0].profile_image??'demouser.png' 

          if(this.appointment_type == 'online'){
            this.fees = result.data[0].online_fee;
          }
          else if(this.appointment_type == 'offline'){
            this.fees = result.data[0].ofline_fee;
          }
          else{
            this.fees = '-';
          }
      },
      (err)=>{

      }
    );

    this.getProfile();
    setTimeout(()=>{
      this.viewDoctorWeeklySchedule();
    },1200)


    
  }

  todayDate:Date = new Date();

  viewDoctorWeeklySchedule(){
    let data = {
       doctor_id :this.doctorID,
       clinic_id: this.clinicID,
    }
    this.patientdataService.viewDoctorWeeklySchedule(data).subscribe(result=>{
      if(result.status_code == 200){
         this.weeklyData = result.result;
         if(this.weeklyData[0].status == 0 && this.weeklyData[1].status == 0 && this.weeklyData[2].status == 0 && this.weeklyData[3].status == 0 && this.weeklyData[4].status == 0 && this.weeklyData[5].status == 0 && this.weeklyData[6].status == 0){
          this.showslotMessage1 = true;
         }
      }
    });
  }
  

  getTimeslot(event: any){

     var startDDate = event.startDate;
     var modifiedDate = event.value.toString().slice(4,15);


    const data ={
      doctor_id : this.doctorID,
      clinic_id: this.clinicID,
      date :this.datepipe.transform(modifiedDate, 'dd-MM-yyyy')+'T00:00:00.000Z'
    }
    this.payNowbtn = true;
   // this.loading= false;

    this.patientdataService.getavailableSlot(data).subscribe(
      (result)=>{
        if(result.result){
          this.morningavailableSlot= result.result.morningSlots;
          this.afternoonavailableSlot=result.result.afternoonSlots;
          this.eveningavailableSlot =result.result.eveningSlots;
          let dayStatus = result.result.dayStatus;
          let availability = result.result.availability;
          if(availability.length > 0){
            if(availability[0].morning_shift_status == 1){
              this.morningavailableSlot= [];
            }
            if(availability[0].afternoon_shift_status == 1){
              this.afternoonavailableSlot= [];
            }
            if(availability[0].evening_shift_status == 1){
              this.eveningavailableSlot= [];
            }
            if(availability[0].morning_shift_status == 1 && availability[0].afternoon_shift_status == 1 && availability[0].evening_shift_status == 1){
              this.morningavailableSlot= [];
              this.afternoonavailableSlot=[];
              this.eveningavailableSlot =[];
              this.showslotMessage = true;
            }
          }
          if(dayStatus == "0"){
            this.morningavailableSlot= [];
            this.afternoonavailableSlot=[];
            this.eveningavailableSlot =[];
            this.showslotMessage = true;

          }else{
             if(this.morningavailableSlot.length == 0 && this.afternoonavailableSlot.length == 0 && this.eveningavailableSlot.length == 0){
              this.showslotMessage = true;
             }
             else{
              this.showslotMessage = false;
             }
          }
      }else{
        this.showslotMessage = true;
      }
    },
      (err)=>{

      }
    )

    // console.log('change Date',event.value);
  }

  onFormSubmit(){
   
  }

  slotTimeselected(value:any){
    this.selectedTimeSlot = value;
    this.payNowbtn = false;
    
  }

  processAppointment(){
  this.loading= true;
  var date = new Date(this.appoitnementForm.value.dateOfAppointment);
  // console.log(date);


let day = ((date.toString().slice(8,10)))
// console.log(day); 

let month = ('0' + (date.getMonth()+1)).slice(-2);
// console.log(month); // 8

let year = date.getFullYear();
// console.log(year); // 2022

let hour = date.getHours();
// console.log(hour); // 2022

let min = date.getMinutes();
// console.log(min); // 2022

let second = date.getSeconds();
// console.log(second); // 2022


var get_formate = year+'-'+month+'-'+day+'T00:00:00.000Z';


   const data ={
    patient_id : this.activatedRoute.snapshot.paramMap.get('memberId'),
    doctor_id  :  this.doctorID,
    clinic_id  :  this.clinicID,
    total_amount : this.fees,
    grand_total : this.fees,
    appointment_date : get_formate,
    reason           :JSON.stringify(this.historys),
    consulting_fee   :  this.fees,
    type             : this.activatedRoute.snapshot.paramMap.get('type'),
    time_slot        : this.selectedTimeSlot,
    promo_code_id    : '',
    user_id          : this.authService.currentUserValue.userid
   }

   
   this.patientdataService.addAppointmentDoctor(data).subscribe(
    (result)=>{
      window.location.href = result.data.url;
    },
    (err)=>{
      Swal.fire(
        '',
        err,
        'error'
      )
    }
   );

  }

  paymentNow(){
    const detail = 'doctor_id='+this.doctorID+'&&total_amount='+this.fees+'&&patient_id='+this.activatedRoute.snapshot.paramMap.get('memberId')+'&&clinic_id='+this.clinicID;
    
    const url = this.apiRoute+'auth/payment-now?detail='+btoa(detail);

    /* console.log(this.doctorID); 
      console.log(btoa(this.doctorID)); */
  
    window.location.href = url;
  }

  getProfile(){
    const data ={
      id : this.authService.currentUserValue.userid
    }

    this.patientdataService.profile(data).subscribe(
    (result)=>{
      this.email_id = result.data[0].email;
    },
    (err)=>{

    }
    );
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


}
