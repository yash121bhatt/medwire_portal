import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators, } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { ClinicServiceService } from 'src/app/services/clinic-service.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prescription-footer',
  templateUrl: './prescription-footer.component.html',
  styleUrls: ['./prescription-footer.component.sass']
})
export class PrescriptionFooterComponent  {
  prescriptionForm: FormGroup;
  submitted = false;
  returnUrl: string;
  public clinic_address: string;
  clinicAddress: any;
  
  constructor(
    private fb: FormBuilder,
    private activatedRoute : ActivatedRoute,
    private authService : AuthService,
    private clinicServiceService : ClinicServiceService,
    private router : Router
    ) {
    this.prescriptionForm = this.fb.group({
      clinic_address: ["", [Validators.required]],
    });
    
  }
  
  success_message:boolean= false;
  error_message:boolean = false;
  error_message_text:string;

  ngOnInit(){

    if((this.authService.currentUserValue.address==null || this.authService.currentUserValue.address=='') || (this.authService.currentUserValue.pin_code==null || this.authService.currentUserValue.pin_code=='')){
      Swal.fire(
        '',
        `${environment.profileCompleteMessage}`,
        'info'
      )
      this.router.navigate(["/clinic/clinic-editmyprofile"]);

    }
    else{

    }
    
    this.getfooter()
  }

  getfooter(){
    const data = {
      clinic_id : this.authService.currentUserValue.userid
    }

    this.clinicServiceService.getPrescriptionDetail(data).subscribe(
      (result)=>{
        this.clinic_address = result.data.clinic_address;
      },
      (err)=>{

      }
    )
  }
  onSubmit() {
    this.submitted = true;
    // console.log("Form Value", this.prescriptionForm.value);

     const address = {
     clinic_address: this.prescriptionForm.value.clinic_address ,
     clinic_id : this.authService.currentUserValue.userid 
     }

    this.clinicServiceService.addprescriptionFooter(address).subscribe(
      (result)=>{
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
    );
  }
}


