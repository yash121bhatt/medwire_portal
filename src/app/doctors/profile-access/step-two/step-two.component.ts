import { Component, OnInit ,Input} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatStepperModule } from "@angular/material/stepper";
import { AuthService } from 'src/app/core/service/auth.service';
import { DoctorServiceService } from 'src/app/services/doctor-service.service';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import { PatientdataService } from 'src/app/services/patientdata.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';


interface Category {
  shortName: string;
  name: string;
}
@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.sass']
})
export class StepTwoComponent implements OnInit {
  @Input() mobileNo: any;

  
  selectedStatus:  number ;  
  eventEditForm: FormGroup;
  public toggleForm:boolean;

  isLinear = false;
  HFormGroup2: FormGroup;
  patientForm: any;
  fb: any;
  imageURL = `${environment.documentUrl}`;
  categories:  [
    {
      "name" : "Blood Test"
    },
  ];
  subcategories: string[];
  form: FormGroup;
  category: any;
  subcategory :any;
  memberData: any;
  primaryUserData: any=[];
  member_id: any;
  mainUserID: any;
  conditionForcheck: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private patientdataService : PatientdataService,
    private patientServiceService : PatientServiceService,
    private authService : AuthService,
    private doctorServiceService : DoctorServiceService,
    private router: Router
    ) {
      
     }

  fetch(mobileNo){
    // console.log('mobile No. two STEP', mobileNo); 
    const data={
      mobile:mobileNo
    } 

    this.patientServiceService.memberSearch(data).subscribe((result)=>{
      console.log('count = ',result.parentuser.length);
      if(result.parentuser.length==0){
        this.conditionForcheck = false;
      }
      else{
        this.conditionForcheck = true;
      }
      this.primaryUserData = result.parentuser;
      this.member_id = result.parentuser.id;
      this.mainUserID = result.parentuser.id;
      this.memberData = result.subuser;
      Swal.fire(
        '',
        result.message,
        'success'
      )

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

  ngOnInit() {
    
    this.HFormGroup2 = this._formBuilder.group({
      completed: ["", Validators.required],
    });

    this.eventEditForm = new FormGroup({          
      'completed': new FormControl()
      });      
    this.selectedStatus = 1;

   
  }
  showAge(date:any) {
    const convertAge = new Date(date);
    const timeDiff = Math.abs(Date.now() - convertAge.getTime());
    return Math.floor((timeDiff / (1000 * 3600 * 24))/365);
  }

  radioChange(event: MatRadioChange) {
    this.member_id = event.value;
  }

  ngformSubmit(){
    // console.log('console form submit');

    const data = {
        "doctor_id":this.authService.currentUserValue.userid,
        "patient_id": this.mainUserID,
        "member_id": this.mainUserID==this.member_id?'':this.member_id
    }

   this.doctorServiceService.profileAccessRequest(data).subscribe(
    (result)=>{
      Swal.fire(
        '',
        result.message,
        'success'
      )
      this.router.navigate(['/doctors/profile-access/patient-list']);
    },
    (err)=>{
      Swal.fire(
        '',
        err,
        'error'
      )
    }
   )
    // console.log('data', data);

  }
}

  
