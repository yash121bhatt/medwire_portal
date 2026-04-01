import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators, } from "@angular/forms";
import { ThemePalette } from "@angular/material/core";
import { Router,ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { ClinicServiceService } from 'src/app/services/clinic-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-doctor-fees',
  templateUrl: './edit-doctor-fees.component.html',
  styleUrls: ['./edit-doctor-fees.component.sass']
})
export class EditDoctorFeesComponent {
  editfeeForm: FormGroup;
  submitted = false;
  returnUrl: string;
  color: ThemePalette = "accent";
  online = false;
  offline = false;
  isHidden:boolean;
  public selection: string;
  public customOption: string = 'customOption';
  radioGroup: any;
  feesdoctorDetail: any;
  isHiddenonline: boolean;
  onlinevalueStatus: number;
  offlinevalueStatus: number;
  offlineValueChecked: boolean = false;
  onlineValueChecked: boolean=false;
  
  toggle(){
 //   this.isHidden=!this.isHidden;
  }

  changediv(divid) {
    if (divid === "online_visit") {
      this.online = true;
      this.offline = false;
    }
    else if (divid === "offline_visit") {
      this.online = false;
      this.offline = true;
    }

  }
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router : Router,
    private clinicServiceService : ClinicServiceService,
    private authService : AuthService
    ) {
    this.editfeeForm = this.fb.group({
      doctor: [""],
      visit: [""],
      online_doctor_fee: [""],
      offline_doctor_fee: [""],
      clinic_doctor_fee: [""],
      
    });
    
  }
  
  ngOnInit(){
       const data ={
          "fee_id" : this.route.snapshot.paramMap.get('type')
       }

       this.clinicServiceService.feesDetail(data).subscribe(
        (result)=>{
          this.feesdoctorDetail = result.data; 
          if( this.feesdoctorDetail.is_available_for_offline_visit=='1'){
          this.offlineValueChecked =true;
          this.isHidden=false;
          this.offlinevalueStatus = 1;
          }
          else{
            this.offlineValueChecked =false;
            this.isHidden=true;
            this.offlinevalueStatus = null;
          }

          if( this.feesdoctorDetail.is_available_for_online_visit=='1'){
            this.onlineValueChecked =true;
            this.isHiddenonline =false;
            this.onlinevalueStatus = 1;
            }
          else{
              this.onlineValueChecked =false;
              this.isHiddenonline =true;
              this.onlinevalueStatus = null;
            }
               },
        (err)=>{
          console.log(err);
        }
       );
  }

  success_message:boolean= false;
  error_message:boolean = false;
  error_message_text:string;
  onSubmit() {
    this.submitted = true;

    const updateDoctorfees = {
      "fee_id":this.route.snapshot.paramMap.get('type'),
      "doctor_id": this.editfeeForm.value.doctor,
      "is_available_for_offline_visit": this.offlinevalueStatus??null,
      "is_available_for_online_visit"  : this.onlinevalueStatus??null,
      "online_consulting_fee":this.onlinevalueStatus==1?this.editfeeForm.value.online_doctor_fee:null,
      "clinic_visit_consulting_fee": this.offlinevalueStatus==1?this.editfeeForm.value.offline_doctor_fee:null
    }
    this.clinicServiceService.updateDoctorFees(updateDoctorfees).subscribe(
      (result)=>{
        Swal.fire(
          '',
          'Fee Details Updated',
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

