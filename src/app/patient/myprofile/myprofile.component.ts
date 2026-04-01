import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PatientdataService } from "src/app/services/patientdata.service";
import { AuthService } from "src/app/core/service/auth.service";
import { ConfirmedValidator } from '../../../app/confirmed.validator';
import { environment } from "src/environments/environment";
import Swal from 'sweetalert2';

import {MainLayoutComponent} from 'src/app/layout/app-layout/main-layout/main-layout.component'
@Component({
  providers:[MainLayoutComponent],
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.sass']
})
export class MyprofileComponent implements OnInit {
  profilepassform: FormGroup;
  submitted = false;
  returnUrl: string;
  hide = true;
  chide = true;
  ohide =true;
  Users : any ;
  user_id: number;
  token: string;
  showAge:any;
  success_message:boolean= false;
  error_message:boolean = false;
  error_message_text:string;
  imageURL = `${environment.documentUrl}`;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private patientdataService : PatientdataService,
    private authService: AuthService,
    private mainComponent:MainLayoutComponent
  ) { 

    this.mainLayout();
  }

  ngOnInit() {
    this.profilepassform = this.formBuilder.group({
      opassword: ["", Validators.required],
      npassword: ["",  [Validators.required,
        Validators.pattern(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,30})/
        )]],
      cpassword: ["", Validators.required],
    },{
      validator: ConfirmedValidator('npassword', 'cpassword')
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
    this.user_id = this.authService.currentUserValue.userid;
    this.token = this.authService.currentUserValue.token;
    const data = { id: this.user_id };
 
    this.patientdataService.profile(data).subscribe(
      (result) => {
        if(result.data[0].date_of_birth!=null){
          const convertAge = new Date(result.data[0].date_of_birth);
          const timeDiff = Math.abs(Date.now() - convertAge.getTime());
          this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
        }
        else{
          this.showAge ='-';
        }
        this.Users = result.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  get fun() {
    return this.profilepassform.controls;
  }
  onSubmit(data) {
    this.submitted = true;
  
    if (this.profilepassform.invalid) {
      // Swal.fire(
      //   // 'New Password And Confirm Password Does Not Match',
      //   '<p>New Password And Confirm Password Does Not Match</p>',
      //   // error,
      //   // 'error'
      // )
    } else {
      const user_passDetail = {
        "id":this.authService.currentUserValue.userid,
        "old_password":data.opassword,
        "password":data.npassword
       };

       this.patientdataService.updatePassword(user_passDetail).subscribe(
        (result)=>{
          if(result.status_code == 200){

          setTimeout(() => {
           this.router.navigate(["/patient/dashboard"]);


          }, 300);
          Swal.fire(
            '',
            result.message,
            'success'
          )
          }
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
  mainLayout(){
    
   // this.mainComponent.reloadComponent();
  }
}
