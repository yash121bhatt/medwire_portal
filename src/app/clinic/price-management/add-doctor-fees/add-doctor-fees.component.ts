import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators, } from "@angular/forms";
import { ThemePalette } from "@angular/material/core";
import { AuthService } from 'src/app/core/service/auth.service';
import { ClinicServiceService } from 'src/app/services/clinic-service.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-add-doctor-fees',
  templateUrl: './add-doctor-fees.component.html',
  styleUrls: ['./add-doctor-fees.component.sass']
})
export class AddDoctorFeesComponent {
  addfeeForm: FormGroup;
  submitted = false;
  returnUrl: string;
  color: ThemePalette = "accent";
  online = false;
  offline = false;
  isHidden=true;
  public selection: string;
  public customOption: string = 'customOption';
  radioGroup: any;
  allDoctor: any;
  isHiddenonline: boolean = true;
  onlinevalueStatus: number;
  offlinevalueStatus: number;
  errorMessageDisplay: boolean = false;
  

  changediv(divid) {
    if (divid === "online_visit") {
      this.online = true;
      this.offline = false;
    }
    else if (divid === "offline_visit") {
      this.online = false;
      this.offline = true;
    }
    else{

    }

  }
  constructor(
    private fb: FormBuilder,
    private authService:AuthService,
    private clinicServiceService : ClinicServiceService,
    private router : Router
    ) {
    this.addfeeForm = this.fb.group({
      doctor: ["", [Validators.required]],
      visit: [""],
      checkedoffline: [""],
      online_doctor_fee: [""],
      offline_doctor_fee: [""],
      clinic_doctor_fee: [""],
    });
    
  }
  success_message:boolean= false;
  error_message:boolean = false;
  error_message_text:string;

  ngOnInit(){
   
    const clinicID = {
      'clinic_id': this.authService.currentUserValue.userid
    }

    this.clinicServiceService.getAllDoctorfees(clinicID).subscribe(
      (result)=>{
      this.allDoctor = result.data;
      },
      (err)=>{

      }
    )


  }
  onSubmit() {
    this.submitted = true;
    // console.log('ok');
   
    if((this.addfeeForm.value.online_doctor_fee=='' || this.addfeeForm.value.online_doctor_fee==null) && (this.addfeeForm.value.offline_doctor_fee=='' || this.addfeeForm.value.offline_doctor_fee==null) ){
      this.errorMessageDisplay = true;
    }
    else{
      this.errorMessageDisplay = false;
      const addDoctorfees = {
        "doctor_id": this.addfeeForm.value.doctor,
        "clinic_id" : this.authService.currentUserValue.userid,
        "is_available_for_offline_visit": this.offlinevalueStatus??null,
        "is_available_for_online_visit"  : this.onlinevalueStatus??null,
        "online_consulting_fee":this.onlinevalueStatus==1?this.addfeeForm.value.online_doctor_fee:null,
        "clinic_visit_consulting_fee": this.offlinevalueStatus==1?this.addfeeForm.value.offline_doctor_fee:null
      }
  
      this.clinicServiceService.addDoctorfess(addDoctorfees).subscribe(
        (result)=>{
          Swal.fire(
            '',
            result.message,
            'success'
          )
          setTimeout(() => {
            this.router.navigate(["/clinic/price-management/fee-management"]);
           }, 500);
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
 
  
  }

  toggleonline(event){
    if(event.checked===true){
      this.isHiddenonline = false;
      this.onlinevalueStatus = 1;
    }
    else{
      this.isHiddenonline = true;
      this.onlinevalueStatus = 0;
    }
      
  }
  toggleoffline(event){
    if(event.checked===true){
      this.isHidden = false;
      this.offlinevalueStatus = 1;
    }
    else{
      this.isHidden = true;
      this.offlinevalueStatus = 0;
    }
  
}

}
