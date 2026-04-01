import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { ClinicServiceService } from 'src/app/services/clinic-service.service';
import Swal from 'sweetalert2';
import { environment } from "src/environments/environment";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-add-fees',
  templateUrl: './add-fees.component.html',
  styleUrls: ['./add-fees.component.sass']
})
export class AddFeesComponent implements OnInit {
  created_by_id: any;
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
  //fb: any;
  

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
    private authService: AuthService,
    private clinicServiceService: ClinicServiceService,
    private router: Router,
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

  ngOnInit(): void {

    if((this.authService.currentUserValue.address==null || this.authService.currentUserValue.address=='') || (this.authService.currentUserValue.pin_code==null || this.authService.currentUserValue.pin_code=='')){
      Swal.fire(
        '',
        `${environment.profileCompleteMessage}`,
        'info'
      )
      this.router.navigate(["/staff/staff-editmyprofile"]);

    }
    else{

    }
    this.staffDetail();
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
          this.doctorsList()
         
         // this.doctorFees();
        }
      },
      (err) => {
        console.log(err);
      }
    );
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
        "clinic_id" : this.created_by_id,
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
            this.router.navigate(["/staff/fees/doctor-fees-list"]);
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

  doctorsList(){
    
    const clinicID = {
      'clinic_id': this.created_by_id
    }

    this.clinicServiceService.getAllDoctorfees(clinicID).subscribe(
      (result)=>{
      this.allDoctor = result.data;
      },
      (err)=>{

      }
    )
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
