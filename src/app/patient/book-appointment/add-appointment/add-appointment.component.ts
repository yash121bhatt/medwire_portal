import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ActivatedRoute ,Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import { MatAutocompleteActivatedEvent, MatAutocompleteTrigger, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AuthService } from 'src/app/core/service/auth.service';
import { PatientdataService } from 'src/app/services/patientdata.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ClinicServiceService } from 'src/app/services/clinic-service.service';


/**
 * @title Chips Autocomplete
 */
@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.sass']
})
export class AddAppointmentComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  historyCtrl = new FormControl('');
  filteredHistorys: Observable<string[]>;
  historys: string[] = [];
  allHistorys: string[] = ['Joint Pain', 'Weight Loss', 'Weight Gain', 'Fever', 'Cold', 'Night Sweats', 'Early Satiety', 'Dry eye', 'Wet eye', 'Dry mouth', 'Wet mouth', 'Headaches', 'Headaches with lightheadedness', 'nausea', 'Lymphadenopathy', 'Facial Rash', 'weakness', 'decreased RBC', 'decreased Hemoglobin', 'increase RBC', 'increase Hemoglobin', 'no wheezes in lungs ', 'no crackles in lungs', 'No pallor', 'hair loss', 'dry or brittle nails', 'Positive for fatigue', 'traumatic injury', 'loss of sensation', 'No changes to hearing' , 'discharge from ear' ];
  @ViewChild('prescriptionInput') prescriptionInput: ElementRef<HTMLInputElement>;
  bookAppointmentForm: FormGroup;
  imageURL = `${environment.documentUrl}`;
  grid = true;
  doctorRecord: any;
  resultCount: any;
  offlinebtnStatus: boolean =false;
  onlinebtnStatus: boolean =false;
  checkStatus: boolean =false;
  checkPincodeCondition : boolean =  false;
  messageResult: any;
  activatedmemberID: string;
  total: any;
  pagination1: any;

  constructor(
    private fb: FormBuilder,
    private _formBuilder: FormBuilder,
    private authService : AuthService,
    private patientdataService : PatientdataService,
    private router:Router,
    private activatedRoute : ActivatedRoute,
    private clinicServiceService : ClinicServiceService
  ) { 
    this.filteredHistorys = this.historyCtrl.valueChanges.pipe(
      startWith(null),
      map((history: string | null) => (history ? this._filter(history) : this.allHistorys.slice())),
    );
    this.bookAppointmentForm = this.fb.group({
      doctor_name: [""],
      speciality: [""],
      clinic:    [""],
      pincode: [""],
      appointmentType: ["", Validators.required],
      description: [""]
    })
  }

  public variables = []; 
  public variables3 ;//['Centre for Accident', 'Emergency Centre for Bone Joint', 'Centre for Cancer', 'Centre for Cardiac Sciences', 'Centre for Children', 'Centre for Childrens Heart', 'Centre for Cosmetology Plastic Surgery', 'Centre for Critical Care', 'Centre for Diabetes Bariatric Surgery', 'Centre for Mother Child', 'Centre for Neurosciences', 'Centre for Physical Medicine Rehabilitation', 'Centre for Robotic Surgery', 'Centre for Sports Medicine', 'Centre for Transplant', 'Anaesthesiology', 'Bariatric Surgery', 'Clinical Haematology', 'Cosmetology', 'Dental Surgery', 'Dermatology', 'Development Disorders', 'Endocrinology Diabetes', 'ENT', 'Fetal Medicine', 'Gastroenterology', 'General Surgery', 'Genetics Molecular Medicine', 'Gynaecology Obstetrics', 'Hepato Pancreato Biliary', 'Internal Medicine', 'Interventional Radiology', 'Laboratory Medicine', 'Minimal Access Surgery', 'Nephrology', 'Nuclear Medicine', 'Nutrition Therapy', 'Ophthalmology', 'Pain Management Palliative Care', 'Plastic Reconstructive Surgery', 'Psychiatry', 'Pulmonary Medicine', 'Radiology', 'Regenerative Medicine', 'Reproductive Endocrinology Fertility', 'Transfusion Medicine', 'Urology', 'Vascular Surgery'];

  public filteredList2 = this.variables.slice();
  public filteredList3;


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our fruit
    if (value) {
      this.historys.push(value);
      
      // let index = this.allHistorys.indexOf(value);
      // this.allHistorys = this.allHistorys.splice(index, 1);
      // this.historys = this.historys.filter((item, index, array) => array.indexOf(item) === index);
      
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
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.historys.push(event.option.viewValue);
    // this.prescriptionInput.nativeElement.value = '';
    this.historyCtrl.setValue(null);
    let index = this.allHistorys.indexOf(event.option.viewValue);
    this.allHistorys.splice(index, 1);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allHistorys.filter(history => history.toLowerCase().includes(filterValue));
  }
  ngOnInit(): void {

    this.doctorspecility();
     
    const data = {
    "doctor_name":"",
    "speciality":"",
    "clinic_name":"",
    "pin_code":"",
    "user_id":this.authService.currentUserValue.userid
    };

    this.activatedmemberID = this.activatedRoute.snapshot.paramMap.get('id');

    this.getClinic();
    this.doctorSearch(data);

  }

  getClinic(){

    this.patientdataService.getClinic().subscribe(
      (result)=>{
          for (let i=0; i<result.data.length;i++){
             this.variables.push(result.data[i].clinic_name);
          }
         
      },
      (err)=>{
         console.log(err);
      }
    );
  }

  filterDoctor(){
  const data ={
    "doctor_name" : this.bookAppointmentForm.value.doctor_name,
    "speciality"  : this.bookAppointmentForm.value.speciality,
    "clinic_name" : this.bookAppointmentForm.value.clinic,
    "pin_code"    : this.bookAppointmentForm.value.pincode,
    "user_id"     :  this.authService.currentUserValue.userid

  }
  this.doctorSearch(data);
  }

  doctorSearch(data:any){
    this.patientdataService.searchDoctorAppointment(data).subscribe(
      (result)=>{
       this.doctorRecord =  result.data;
       this.resultCount  = result.data.length;
       
        if(this.resultCount>0){
          this.checkPincodeCondition = false;
          this.messageResult = result.message;
        }
        else{
          this.messageResult = 'Opps! There is no clinic or doctor in your area';
          this.checkPincodeCondition = true;
        }


        
      },
      (err)=>{
        console.log(err);
      }
    );
  }

  offlineValue(value:any){
    if(value=='' || value==null){
      this.offlinebtnStatus =  false;
    }
    else{
      this.offlinebtnStatus =  true;
    }
  }

  onlineValue(value:any){
    if(value=='' || value==null){
      this.onlinebtnStatus = false;
    }
    else{
      this.onlinebtnStatus = true;
    }
  }

  conditionCheck(type:any, id:number)
{
 
     // localStorage.setItem('reasonAppointment',JSON.stringify(this.historys));
      this.router.navigate(['/patient/book-appointment/doctor-appointment/'+this.activatedmemberID+'/'+type+'/'+id]);
 
}

checkerrormessage(){

setTimeout(() => {
  if(this.historys.length>0){
    this.checkStatus = false;
  }else{
    window.scroll(0,1);
    this.checkStatus = true;
  } 
}, 800);

}

doctorspecility()
{
 const data ={

 }
 this.clinicServiceService.getDoctorSpecialitiy(data).subscribe(
   (result)=>{
     this.variables3 = result.data;
     this.filteredList3 = this.variables3.slice();
    
   },
   (err)=>{

   }
 );
}

resetFilter(){
  const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
}


}
