import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators, } from "@angular/forms";
import { ThemePalette } from "@angular/material/core";
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-notification-form',
  templateUrl: './notification-form.component.html',
  styleUrls: ['./notification-form.component.sass']
})
export class NotificationFormComponent implements OnInit {
  private form : FormData;
  addnotificationForm: FormGroup;
  submitted = false;
  returnUrl: string;
  color: ThemePalette = "accent";
  promo_code = false;
  test = false;
  general = false;
  notification_type : any;
  pincode_radio = false;
  patient_radio = false;
  date_time = false;
  isHidden=true;
  public selection: string;
  public selectiontwo: string;
  public customOption: string = 'customOption';
  radioGroup: any;
  user_id : any;
  role_id : any = 3;
  notification_id : any = null;
  notification_for : any ;
  notification_sent_by : any ;
  test_id :any;
  promo_code_id :any;
  patient_ids:any;
  notification_title:any;
  notification_date_time:any;
  description:any;
  patient_pin_code : any ;
  type: string;
  currentDate : Date = new Date();
  toggle(){
    this.isHidden=!this.isHidden;
  }

  ngOnInit(): void {
     this.user_id = this.authService.currentUserValue.userid    
     this.notification_id =this.activatedRoute.snapshot.paramMap.get("id");
     let testdata = {
      user_id : this.user_id,
      role_id : this.role_id
    }
     this.patientService.patientList(testdata).subscribe((result)=>{
     this.variables4 = result.data;
     this.filteredList4 = this.variables4.slice();
    })

     if(this.notification_id){
      this.singleNotification();
     }
  }
 
  singleNotification(){
    let data = {
      notification_id : this.notification_id
    }
    this.patientService.singleNotification(data).subscribe((result)=>{
       if(result.status_code == 200){
           let data = result.data[0];
           this.notification_for = data.notification_for;
           this.notification_sent_by = data.notification_sent_by;
           this.notification_title = data.notification_title;
           this.description = data.description;
           this.type = data.type;
           if(this.notification_for == "test"){
            this.promo_code = true;
            this.test = false;
            this.general = false;
            this.test_id = data.test_id;
            let testdata = {
              lab_id : this.user_id
            }
            this.patientService.testList(testdata).subscribe((result)=>{
              this.variables3 = result.data;
              this.filteredList3 = this.variables3.slice();
            })
           }else if(this.notification_for == "promo_code"){
            this.promo_code_id = data.promo_code_id;
            this.promo_code = false;
            this.test = true;
            this.general = false;
            
            let testdata = {
              user_id : this.user_id,
              role_id : this.role_id     
            }
            this.patientService.promocodeList(testdata).subscribe((result)=>{
              this.variables = result.data;
              this.filteredList2 = this.variables.slice();
            });
           }else if(this.notification_for == "general"){
            this.promo_code = false;
            this.test = false;
            this.general = true;
           }
          
           if(this.type == "1"){
            this.date_time = false
            this.notification_type = "on_spot"  
           }else if(this.type == "2"){
            this.date_time = true      
            this.notification_type = "date_time" 
            this.notification_date_time = data.notification_date_time;
           }

           if(this.notification_sent_by == "pin_code"){
              this.pincode_radio = true;
              this.patient_radio = false;
              this.patient_pin_code = data.pin_code
           }else if(this.notification_sent_by == "patient"){
            this.pincode_radio = false;
            this.patient_radio = true;
            this.patient_ids = data.patient_ids.split(",") ?? "-";        
            let patientData1 = []
            for(let i = 0 ; i< this.patient_ids.length ; i++){
              patientData1.push(parseInt(this.patient_ids[i]));
            }
            this.patient_ids = patientData1;
           }
       }
    });
  }

  changediv(divid) {
 
    if (divid === "promo_code") {
      this.promo_code = true;
      this.test = false;
      this.general = false;
      let data = {
        lab_id : this.user_id
      }
      this.patientService.testList(data).subscribe((result)=>{
        this.variables3 = result.data;
        this.filteredList3 = this.variables3.slice();
      })
    }
    else if (divid === "test") {
      this.promo_code = false;
      this.test = true;
      this.general = false;
      
      let data = {
        user_id : this.user_id,
        role_id : this.role_id     
      }
      this.patientService.promocodeList(data).subscribe((result)=>{
        this.variables = result.data;
        this.filteredList2 = this.variables.slice();
      });
    }
    else if (divid === "general") {
      this.promo_code = false;
      this.test = false;
      this.general = true;
    }

  }
  changedivtwo(divid) {
    if (divid === "pincode_view") {
      this.pincode_radio = true;
      this.patient_radio = false;
      
    }
    else if (divid === "patient_view") {
      this.pincode_radio = false;
      this.patient_radio = true;
      let data = {
        user_id : this.user_id,
        role_id : this.role_id
     }
     this.patientService.patientList(data).subscribe((result)=>{
       this.variables4 = result.data;
       this.filteredList4 = this.variables4.slice();
     })
    }

  }

  changedivthree(divid){
    if (divid === "onTheSpot") {
      // this.pincode_radio = true;
      this.date_time = false;
      
    }
    else if (divid === "dateandTime") {
      // this.pincode_radio = false;
      this.date_time = true;
    }

  }

  public variables = [];
  public filteredList2:any;
  public variables3 = [];
  public filteredList3:any;
  public variables4 = [];
  public filteredList4:any;
  constructor(private fb: FormBuilder , private patientService : PatientServiceService , private authService:AuthService , private router : Router, private activatedRoute : ActivatedRoute) {
    this.addnotificationForm = this.fb.group
    ({
      notification_for: ["", [Validators.required]],
      promo_code_id: [""],
      test_id: [""],
      notification_sent_by: ["", [Validators.required]],
      patient_pin_code: [""],
      patient_ids: [""],
      notification_date_time: [""],
      notification_title: ["", [Validators.required]],
      description: ["", [Validators.required]],
      notification_type : ["", [Validators.required]],
    });
  }
  success_message:boolean= false;
  error_message:boolean = false;
  error_message_text:string;
  onSubmit() {
    this.submitted = true;
    let notification_type;
    let promo_code_id:any = 0; 
    let test_id : any = 0;
    let patient_pin_code : any = 0;
    let patient_ids : any = "";
    let notification_date_time;
    if(this.addnotificationForm.value.notification_for == "promo_code"){
     promo_code_id = this.addnotificationForm.value.promo_code_id
    }
    if(this.addnotificationForm.value.notification_for == "test"){
     test_id = this.addnotificationForm.value.test_id
    }
    if(this.addnotificationForm.value.notification_sent_by == "pin_code"){
      patient_pin_code =  this.addnotificationForm.value.patient_pin_code
    }
    if(this.addnotificationForm.value.notification_sent_by == "patient"){
      patient_ids = this.addnotificationForm.value.patient_ids
    }
    if(this.addnotificationForm.value.notification_type == "on_spot"){
      notification_date_time = new Date();
      notification_type = 1;
    }
    if(this.addnotificationForm.value.notification_type == "date_time"){
      notification_date_time = this.addnotificationForm.value.notification_date_time
      notification_type = 2;
    }

    let data = {
      user_id : this.user_id,
      role_id : this.role_id,
      notification_for : this.addnotificationForm.value.notification_for,
      notification_sent_by : this.addnotificationForm.value.notification_sent_by,
      promo_code_id : promo_code_id,
      test_id : test_id,
      patient_pin_code : patient_pin_code,
      patient_ids : patient_ids.toString(),
      notification_title : this.addnotificationForm.value.notification_title,
      notification_date_time : notification_date_time,
      type : notification_type,
      description : this.addnotificationForm.value.description
    }
    if(this.notification_id){
       data["notification_id"] = this.notification_id;
      this.patientService.editNotification(data).subscribe(
        (result) => {
          if(result.status_code == 200){
            setTimeout(()=> {
              this.router.navigate(['/doctor/notification/notification-list']);
            }, 600 );
            Swal.fire(
              '',
              result.message,
              'success'
            )
          } 
        }, 
        (err) => {
          console.log(err);
          Swal.fire(
            '',
            err,
            'error'
          )
      })
    }
    else{
      this.patientService.addNotification(data).subscribe(
        (result) => {
          if(result.status_code == 200){
            setTimeout(()=> {
              this.router.navigate(['/doctor/notification/notification-list']);
            }, 600 );
            Swal.fire(
              '',
              result.message,
              'success'
            )
          } 
        }, 
        (err) => {
          console.log(err);
          Swal.fire(
            '',
            err,
            'error'
          )
      })
    }
   
  }

}
