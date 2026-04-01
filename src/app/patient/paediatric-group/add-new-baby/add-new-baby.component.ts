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
  selector: 'app-add-new-baby',
  templateUrl: './add-new-baby.component.html',
  styleUrls: ['./add-new-baby.component.sass']
})
export class AddNewBabyComponent implements OnInit {
  maxDate = new Date(); 
  addBabyForm: FormGroup;
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
    private userdata:PatientdataService,
    private router: Router,
    private authService:AuthService
  ) { 
        
    this.selectedStatus = 'Female';
    this.gender_f= 'Female';
    this.gender_m='Male';
  }

  ngOnInit(): void {
    this.addBabyForm = this.formBuilder.group({
      baby_gender: ["", Validators.required],
      baby_name: ["", Validators.required],
      dateofbirth: ["", Validators.required], 
      father_height:["",Validators.required],
      mother_height:["",Validators.required] 
    });
  }

  onSubmit(data) {
    // "approve_document":data.doc_file
     this.submitted = true;
     const signupLabradio_data = {
       "user_id":this.authService.currentUserValue.userid,
       "baby_name":data.baby_name,
       "date_of_birth":data.dateofbirth,
       "baby_gender":data.baby_gender,
       "father_height":data.father_height,
       "mother_height":data.mother_height

      }
     // stop here if form is invalid
     if (this.addBabyForm.invalid) {
       return;
     } else {

      const convertAge = new Date(data.dateofbirth);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      this.agecalculated = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
     if(this.agecalculated > 10){
      this.error_message = true;
      this.success_message=false;
      this.error_message_text = data.baby_name+' is elder than 10 year !';    
     }
     else{
      this.userdata.addBaby(signupLabradio_data).subscribe(
        (result)=>{
          if(result.status=="success"){
            Swal.fire(
              '',
              result.message,
              'success'
            )
          
            setTimeout(() => {
              this.router.navigate(["/patient/paediatric-group/add-child"]);
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
     
       
 
        }
       //this.router.navigate(["/authentication/registerotpsubmit"]);
     }

}
