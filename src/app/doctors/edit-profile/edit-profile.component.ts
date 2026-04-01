import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientdataService } from "src/app/services/patientdata.service";
import { AuthService } from "src/app/core/service/auth.service";
import { User } from "src/app/core/models/user";
import { DateAdapter } from '@angular/material/core';
import Swal from 'sweetalert2';
import { formatDate } from '@fullcalendar/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import  doctorDegree  from 'src/assets/data/doctor_degree.json';
import doctorSpecility from 'src/assets/data/doctor_specility.json';
import { environment } from "src/environments/environment";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {map, startWith} from 'rxjs/operators';
import { MatAutocompleteActivatedEvent, MatAutocompleteTrigger, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { DoctorServiceService } from 'src/app/services/doctor-service.service';



@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.sass']
})
export class EditProfileComponent implements OnInit {
  private form : FormData;
  editprofiletForm: FormGroup;
  submitted: boolean;
  registrationForm: any;
  user_id: number;
  token: string;
  Users:any;
  username:string;
  last_name:string;
  email:string;
  mobileno:number;
  adharcardno:number;
  gender:string;
  dob : string;
  success_message:boolean;
  error_message : boolean;
  error_message_text : string;
  profile_image : any;
  maxDate = new Date();
  parameter_id : string;
  imageprofile: any;
  address: any;
  pin_code: any;
  dateOfBirth: Date;

  public variables3 = doctorDegree ;
  public variables  = doctorSpecility;
  public filteredList3 = this.variables3.slice();
  public filteredList2 = this.variables.slice();

  allSpecialitys: string[] ;
  // [
  //   "Centre for Accident","Emergency Centre for Bone Joint", "Centre for Cancer", "Centre for Cardiac Sciences", "Centre for Children", "Centre for Childrens Heart", "Centre for Cosmetology Plastic Surgery", "Centre for Critical Care",
  //    "Centre for Diabetes Bariatric Surgery", "Centre for Mother Child", "Centre for Neurosciences", "Centre for Physical Medicine Rehabilitation", "Centre for Robotic Surgery", "Centre for Sports Medicine", "Centre for Transplant", "Anaesthesiology", "Bariatric Surgery", 
  //    "Clinical Haematology", "Cosmetology", "Dental Surgery", "Dermatology","Development Disorders", "Endocrinology Diabetes","ENT", "Fetal Medicine", "Gastroenterology", "General Surgery", "Genetics Molecular Medicine", "Gynaecology Obstetrics", "Hepato Pancreato Biliary", "Internal Medicine", "Interventional Radiology", "Laboratory Medicine", "Minimal Access Surgery", "Nephrology", "Nuclear Medicine", "Nutrition Therapy","Ophthalmology", "Pain Management Palliative Care", "Plastic Reconstructive Surgery", "Psychiatry", "Pulmonary Medicine", "Radiology", "Regenerative Medicine", "Reproductive Endocrinology Fertility", 
  //    "Transfusion Medicine", "Urology", "Vascular Surgery" ];
     separatorKeysCodes: number[] = [ENTER, COMMA];
     specialityCtrl = new FormControl('');
     filteredSpecialitys: Observable<string[]>;
     specialitys: string[] = [];
     @ViewChild('prescriptionInput') prescriptionInput: ElementRef<HTMLInputElement>;
  degreeNameselect: any =[];
  finalDegree: any;
  experience: any;
  alertnate_mobile_no: any;
  alternate_mobile_no: any;
  constructor(
    private cd: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    private router: Router,
    private patientdataService : PatientdataService,
    private authService: AuthService,
    private http: HttpClient,
    private dateAdapter: DateAdapter<Date>,
    private doctorServiceService : DoctorServiceService
  ) {
   // this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
   this.filteredSpecialitys = this.specialityCtrl.valueChanges.pipe(
    startWith(null),
    map((speciality: string | null) => (speciality ? this._filter(speciality) : this.allSpecialitys.slice())),
  );

   }

  ngOnInit(): void {
  
    this.editprofiletForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      mobile: ["",],
      alternate_mobile: ["", [Validators.pattern("[6789][0-9]{9}")]],
      gender:["", Validators.required],
      dob: ["",Validators.required],
      doctor_degree: ["",Validators.required],
      experience:["",Validators.required],
      address: ["",Validators.required],
      pin_code: ["",Validators.required],
      file: [null],
    })
    ;
    this.user_id = this.authService.currentUserValue.userid;
    this.token = this.authService.currentUserValue.token;
    const data = { id: this.user_id };
    this.patientdataService.profile(data).subscribe(
      (result) => {
       
        this.Users = result.data;
        
       const [day, month, year]  = result.data[0].date_of_birth.split('/');
       const resultDate_of_birth = [year, month, day].join('-');
        this.username = result.data[0].first_name;
        this.email = result.data[0].email;
        this.mobileno = result.data[0].mobile;
        this.alternate_mobile_no = result.data[0].alternate_mobile;
        this.gender = result.data[0].gender;
        this.dateOfBirth =  new Date(result.data[0].date_of_birth);
        this.address = result.data[0].address;
        this.pin_code = result.data[0].pin_code;
        this.experience = result.data[0].experience_in_year;
        this.imageprofile = result.data[0].imgName??'demouser.png';

        for(let i =0; i< result.doctor_specialities.length;i++){
           this.specialitys.push(result.doctor_specialities[i].speciality_name);
        }


        for(let i =0; i< result.doctor_degrees.length;i++){
         
          this.degreeNameselect.push(result.doctor_degrees[i].degree_name);
       }
       
        this.finalDegree = this.degreeNameselect.toString().split(',');

        this.imageUrl = encodeURI(this.imageURLprofile+result.data[0].imgName);
        //console.log('ImageURl', this.imageUrl);
      },
      (err) => {
        console.log(err);
      }
    );

    this.doctorspecility();
    
  }
  @ViewChild('fileInput') el: ElementRef;
  imageUrl: any = '';
  editFile: boolean = true;
  removeUpload: boolean = false;
  imageURLprofile = `${environment.documentUrl}`;

  uploadfileForm = this.fb.group({
    file: [null],
  });
  
  uploadFile(event) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.registrationForm.patchValue({
          file: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();        
    }
  }

  async fileChange($event){
    this.profile_image = null;
    if($event && $event.length){
      this.profile_image = $event[0];
    }
  }
 
  onSubmit() {
      
     
    // stop here if form is invalid
    if (this.editprofiletForm.invalid) {
      window.scroll(0,1);
      return;
    } else {

    this.form = new FormData();
    this.form.append('first_name',this.editprofiletForm.value.username);
    this.form.append('date_of_birth',this.editprofiletForm.value.dob);
    this.form.append('experience_in_year',this.editprofiletForm.value.experience);
    this.form.append('specialities',this.specialitys.toString());
    this.form.append('degrees',this.editprofiletForm.value.doctor_degree);
    this.form.append('mobile',this.editprofiletForm.value.mobile);
    this.form.append('alternate_mobile',this.editprofiletForm.value.alternate_mobile);
    this.form.append('gender',this.editprofiletForm.value.gender);
    this.form.append('address',this.editprofiletForm.value.address);
    this.form.append('pin_code',this.editprofiletForm.value.pin_code);
    this.form.append('user_id',this.authService.currentUserValue.userid);
    this.form.append('profile_image',this.profile_image);

      this.doctorServiceService.doctorprofileupdate(this.form).subscribe(
        (result) => {
          this.http.post<any>(`${environment.apiUrl}auth/profile`, {
            id:  this.authService.currentUserValue.userid,
           },{headers:{'x-access-token': this.authService.currentUserValue.token}}).subscribe(
            (result_profile)=>{
            
            const user_detail ={
            userid:result_profile.data[0].id,
            img: result_profile.data[0].img??"assets/image/user/demouser.png",
            username: result_profile.data[0].username,
            password: "",
            firstName: result_profile.data[0].first_name,
            lastName: result_profile.data[0].last_name,
            role:  this.authService.currentUserValue.role,
            roleID :result_profile.data[0].role_id,
            token:  this.authService.currentUserValue.token,
            image_name:result_profile.data[0].imgName??'demouser.png'
          
          };
          Swal.fire(
                '',
                result.message,
                'success'
              )
          localStorage.setItem("currentUser", JSON.stringify(user_detail));
              setTimeout(() => {
                //this.router.navigate(["/patient/myprofile"]);
                this.router.navigate(["/doctors/my-profile"]).then(() => {
                   window.location.reload();
                 });
              }, 2000);

              
        },
        (err) => {
          Swal.fire(
            '',
            err,
            'error'
          )
         
        }
      );
      //this.router.navigate(["/patient/myprofile"]);
    }
      )
    
  }
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
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.specialitys.push(event.option.viewValue);
    this.prescriptionInput.nativeElement.value = '';
    this.specialityCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allSpecialitys.filter(speciality => speciality.toLowerCase().includes(filterValue));
  }

  doctorspecility(){
    {
      const data ={
    
      }
      this.doctorServiceService.getDoctorSpecialitiy(data).subscribe(
        (result)=>{
          this.allSpecialitys = result.data;
    
          this.filteredSpecialitys = this.specialityCtrl.valueChanges.pipe(
            startWith(null),
            map((speciality: string | null) => (speciality ? this._filter(speciality) : this.allSpecialitys.slice())),
          );
        // console.log('ok',result);
        },
        (err)=>{
    
        }
      );
    }
  }
 
}