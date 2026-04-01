import { Component, OnInit } from '@angular/core';
import { FormControl} from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { Role } from "src/app/core/models/role";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { PatientdataService } from "src/app/services/patientdata.service";
import { AuthService } from "src/app/core/service/auth.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-pregnant-women',
  templateUrl: './add-pregnant-women.component.html',
  styleUrls: ['./add-pregnant-women.component.sass']
})
export class AddPregnantWomenComponent implements OnInit {
  maxDate = new Date(); 
  pregnantWomenBabyForm: FormGroup;
  selectedStatus: string;
  gender_f: string;
  gender_m:string;
  submitted = false;
  success_message:boolean= false;
  error_message:boolean = false;
  error_message_text:string;
  active_formstatus_patient:boolean= true;
  active_formstatus_labRadio:boolean = false;
  agecalculated: number;

  constructor(
    private formBuilder: FormBuilder,
    private patientdataService:PatientdataService,
    private router: Router,
    private authService:AuthService
  ) { 
        
    this.selectedStatus = 'Female';
    this.gender_f= 'Female';
    this.gender_m='Male';
  }

  ngOnInit(): void {
    this.pregnantWomenBabyForm = this.formBuilder.group({
      women_name: ["", Validators.required],
      dateofPregency: ["", Validators.required],   
    });
  }

  onSubmit(data) {
    // "approve_document":data.doc_file
     this.submitted = true;
     const pregantWomen = {
       "user_id":this.authService.currentUserValue.userid,
       "name":data.women_name,
       "date_of_pregnancy":data.dateofPregency, 
      }
     // stop here if form is invalid
     if (this.pregnantWomenBabyForm.invalid) {
       return;
     } else {

      this.patientdataService.addWoman(pregantWomen).subscribe(
        (result)=>{
          if(result.status=="success"){
            Swal.fire(
              '',
              result.message,
              'success'
            )
          
            setTimeout(() => {
              this.router.navigate(["/patient/pregnant-woman/pregnent-womenList"]);
            }, 2000);
            
          }  
         },
       (err) => {
        Swal.fire(
          '',
          err,
          'error'
        )
       });
    
     
       
 
        }
       //this.router.navigate(["/authentication/registerotpsubmit"]);
     }

}
