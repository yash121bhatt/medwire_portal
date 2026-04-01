import { Component , OnInit, ViewChild, ElementRef } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators, } from "@angular/forms";
import { ClinicServiceService } from 'src/app/services/clinic-service.service'; 
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'src/app/core/service/auth.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http'; 
import  doctorDegree  from 'src/assets/data/doctor_degree.json';
import doctorSpecility from 'src/assets/data/doctor_specility.json';
import { MatSort } from '@angular/material/sort';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatAutocompleteActivatedEvent, MatAutocompleteTrigger, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
//import  * as data  from '../doctor_degree.json';


@Component({
  providers: [DatePipe],
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.sass']
})
export class AddDoctorComponent {
  adddoctorForm: FormGroup;
  submitted = false;
  returnUrl: string;
  private form : FormData;
  profile_image : any;
  accept: string =".jpeg,.png,.jpg,.pdf";
  maxDate = new Date();

  //public variables = ['Centre for Accident', 'Emergency Centre for Bone Joint', 'Centre for Cancer', 'Centre for Cardiac Sciences', 'Centre for Children', 'Centre for Childrens Heart', 'Centre for Cosmetology Plastic Surgery', 'Centre for Critical Care', 'Centre for Diabetes Bariatric Surgery', 'Centre for Mother Child', 'Centre for Neurosciences', 'Centre for Physical Medicine Rehabilitation', 'Centre for Robotic Surgery', 'Centre for Sports Medicine', 'Centre for Transplant', 'Anaesthesiology', 'Bariatric Surgery', 'Clinical Haematology', 'Cosmetology', 'Dental Surgery', 'Dermatology', 'Development Disorders', 'Endocrinology Diabetes', 'ENT', 'Fetal Medicine', 'Gastroenterology', 'General Surgery', 'Genetics Molecular Medicine', 'Gynaecology Obstetrics', 'Hepato Pancreato Biliary', 'Internal Medicine', 'Interventional Radiology', 'Laboratory Medicine', 'Minimal Access Surgery', 'Nephrology', 'Nuclear Medicine', '>Nutrition Therapy', 'Ophthalmology', 'Pain Management Palliative Care', 'Plastic Reconstructive Surgery', 'Psychiatry', 'Pulmonary Medicine', 'Radiology', 'Regenerative Medicine', 'Reproductive Endocrinology Fertility', 'Transfusion Medicine', 'Urology', 'Vascular Surgery',];
  //public variables3 = ['MBBS', 'BDS', 'BAMS', 'BUMS', 'BHSM', 'BYNS', 'B.V.Sc & AH', 'B.Pharm.', 'B. Sc. – Nursing', 'B.P.T.', 'B.O.T.', 'B.M.L.T.', 'M.D.', 'M.S.', 'Postgraduate Diploma', 'DM / MCh'];
  public variables  = doctorSpecility;
  public variables3 = doctorDegree ;
  

  public filteredList2 = this.variables.slice();
  public filteredList3 = this.variables3.slice();

  separatorKeysCodes: number[] = [ENTER, COMMA];
  specialityCtrl = new FormControl('',Validators.required);
  filteredSpecialitys: Observable<string[]>;
  specialitys: string[] = [];
  allSpecialitys :string[];
  // allSpecialitys: string[] = [
  //   "Centre for Accident","Emergency Centre for Bone Joint", "Centre for Cancer", "Centre for Cardiac Sciences", "Centre for Children", "Centre for Childrens Heart", "Centre for Cosmetology Plastic Surgery", "Centre for Critical Care", "Centre for Diabetes Bariatric Surgery", "Centre for Mother Child", "Centre for Neurosciences", "Centre for Physical Medicine Rehabilitation", "Centre for Robotic Surgery", "Centre for Sports Medicine", "Centre for Transplant", "Anaesthesiology", "Bariatric Surgery", "Clinical Haematology", "Cosmetology", "Dental Surgery", "Dermatology","Development Disorders", "Endocrinology Diabetes","ENT", "Fetal Medicine", "Gastroenterology", "General Surgery", "Genetics Molecular Medicine", "Gynaecology Obstetrics", "Hepato Pancreato Biliary", "Internal Medicine", "Interventional Radiology", "Laboratory Medicine", "Minimal Access Surgery", "Nephrology", "Nuclear Medicine", "Nutrition Therapy","Ophthalmology", "Pain Management Palliative Care", "Plastic Reconstructive Surgery", "Psychiatry", "Pulmonary Medicine", "Radiology", "Regenerative Medicine", "Reproductive Endocrinology Fertility", "Transfusion Medicine", "Urology", "Vascular Surgery" ];

    @ViewChild('prescriptionInput') prescriptionInput: ElementRef<HTMLInputElement>;
 
 // public variables3Selected = ['MBBS', 'BDS'];
 
  constructor(
    private fb: FormBuilder,
    private clinicServiceService : ClinicServiceService,
    private route: ActivatedRoute,
    private router: Router,
    public datepipe: DatePipe,
    private authService: AuthService,
    private http: HttpClient
    ) {
      // this.filteredSpecialitys = this.specialityCtrl.valueChanges.pipe(
      //   startWith(null),
      //   map((speciality: string | null) => (speciality ? this._filter(speciality) : this.allSpecialitys.slice())),
      // );
      
    this.adddoctorForm = this.fb.group({
      fullname: ["", [Validators.required]],
      dob: ["", [Validators.required]],
      experience_in_year: ["", [Validators.required]],
      mobile: ["", [Validators.required, Validators.pattern("[6789][0-9]{9}")]],
      email: [ "", [Validators.required, Validators.email, Validators.minLength(5)]],
    // position: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      //  speciality: ["", [Validators.required]],
      alternate_mobile: ["",Validators.pattern("[6789][0-9]{9}")],
      doctor_degree: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      uploadImg: [""],
    });

   // console.log("json Data",this.getJSON());
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.specialitys.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.specialityCtrl.setValue(null);
  }

  remove(speciality: string): void {
    const index = this.specialitys.indexOf(speciality);

    if (index >= 0) {
      this.specialitys.splice(index, 1);
      this.filteredSpecialitys = this.specialityCtrl.valueChanges.pipe(
        startWith(null),
        map((speciality: string | null) => (speciality ? this._filter(speciality) : this.specialitys.slice())),
      );
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.specialitys.push(event.option.viewValue);
    this.prescriptionInput.nativeElement.value = '';
    this.specialityCtrl.setValue(null);
    this.filteredSpecialitys = this.specialityCtrl.valueChanges.pipe(
      startWith(null),
      map((speciality: string | null) => (speciality ? this._filter(speciality) : this.specialitys.slice())),
    );
    
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allSpecialitys.filter(speciality => speciality.toLowerCase().includes(filterValue));
  }

  success_message:boolean= false;
  error_message:boolean = false;
  error_message_text:string;

  ngOnInit(){
    //const content = require('src/assets/data/doctor_degree.json');

    //console.log('content data', myData);
    this.doctorspecility();
   
  }
  onSubmit() {
    this.submitted = true; 
    this.form = new FormData();
    this.form.append('full_name',this.adddoctorForm.value.fullname);
    this.form.append('email_id',this.adddoctorForm.value.email);
    this.form.append('date_of_birth',this.adddoctorForm.value.dob);
    this.form.append('mobile_number',this.adddoctorForm.value.mobile);
    this.form.append('gender',this.adddoctorForm.value.gender);
    this.form.append('role_id','5');
    this.form.append('clinic_id',this.authService.currentUserValue.userid);
    this.form.append('experience_in_year',this.adddoctorForm.value.experience_in_year);
     this.form.append('specialities',this.specialitys.toString());
    //  this.form.append('specialities',this.adddoctorForm.value.speciality);
    this.form.append('degrees',this.adddoctorForm.value.doctor_degree);
    this.form.append('alternate_mobile_number',this.adddoctorForm.value.alternate_mobile);
    this.form.append('profile_image',this.profile_image);
    // console.log('Form Data = ',this.form);
 
 
    this.clinicServiceService.addDoctor(this.form).subscribe(
      (result)=>{
        
        if(result.status==="success"){
          Swal.fire(
            '',
            "Please add the doctor's fee to publish the doctor.",
            'success'
          )
         // localStorage.setItem("regUserID",result.data.id);
          setTimeout(() => {
           this.router.navigate(["/clinic/price-management/add-doctor-fees"]);
          }, 1000);
          
        }  

        if(result.status==="error"){
          Swal.fire(
            '',
            result.message,
            'error'
          )
         // localStorage.setItem("regUserID",result.data.id);
          setTimeout(() => {
           this.router.navigate(["/clinic/plan-list"]);
          }, 1000);
          
        }  
         
       },
     (error) => {
      
      console.log('errror', error);
     // console.log('any error is occur',err);
     // if(err.status_code==400){
        // console.log('Inside 400');
        Swal.fire(
          '',
          error,
          'error'
        )
     // } 
    //  this.error_message = true;
     // this.success_message=false;
     // this.error_message_text = err;
     });
  }

  async fileChange($event){
    this.profile_image = null;
    if($event && $event.length){
      this.profile_image = $event[0];
      // console.log(this.profile_image);
    }
  }

//   public getJSON(): Observable<any> {
//     return this.http.get("./assets/doctor_degree.json");
// }

doctorspecility()
{
  const data ={

  }
  this.clinicServiceService.getDoctorSpecialitiy(data).subscribe(
    (result)=>{
      this.allSpecialitys = result.data;

      this.filteredSpecialitys = this.specialityCtrl.valueChanges.pipe(
        startWith(null),
        map((speciality: string | null) => (speciality ? this._filter(speciality) : this.allSpecialitys.slice())),
      );

    },
    (err)=>{

    }
  );
}

}
