import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from 'src/app/core/service/auth.service';
import { DoctorServiceService } from 'src/app/services/doctor-service.service';
import { environment } from "src/environments/environment";
import { ConfirmedValidator } from '../../../app/confirmed.validator';
import Swal from 'sweetalert2'; 
import { PatientdataService } from 'src/app/services/patientdata.service';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.sass']
})
export class MyProfileComponent implements OnInit {
  profilepassform: FormGroup;
  submitted = false;
  returnUrl: string;
  hide = true;
  chide = true;
  ohide = true;
  userData: any;
  imageURL = `${environment.documentUrl}`;
  showAge: any;
  doctor_degrees: any;
  doctor_specialities: any;
  allDoctorDegree: any=[];
  allDoctorspecilaity: any=[];
  success_message: boolean;
  error_message: boolean;

  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService : AuthService,
    private doctorServiceService : DoctorServiceService,
    private patientdataService: PatientdataService,
  ) { 


  }

  ngOnInit() {
    this.profilepassform = this.formBuilder.group({
      opassword: ["", Validators.required],
      npassword: ["", [Validators.required,
      Validators.pattern(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,30})/
      )]],
      cpassword: ["", Validators.required],

    }, {
      validator: ConfirmedValidator('npassword', 'cpassword')
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";

    const userID = {
      id : this.authService.currentUserValue.userid
    }

    this.doctorServiceService.profileDoctor(userID).subscribe(
      (result)=>{
        this.userData = result.data;
        this.doctor_degrees = result.doctor_degrees;
        this.doctor_specialities = result.doctor_specialities;
      
        for(let i=0; i<this.doctor_degrees.length;i++){
          this.allDoctorDegree.push(this.doctor_degrees[i].degree_name);
        }

        for(let i=0; i<this.doctor_specialities.length;i++){
          this.allDoctorspecilaity.push(this.doctor_specialities[i].speciality_name);
        }
        
      // console.log('add degree', this.allDoctorDegree);
        if(result.data[0].date_of_birth!=null){
          const convertAge = new Date(result.data[0].date_of_birth);
          const timeDiff = Math.abs(Date.now() - convertAge.getTime());
          this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
        }
        else{
          this.showAge ='-';
        }
      },
      (err)=>{
       console.log(err);
      }
    );



  }
  get fun() {
    return this.profilepassform.controls;
  }
  onSubmit(data) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.profilepassform.invalid) {
        // Swal.fire(
        //   // 'New Password And Confirm Password Does Not Match',
        //   '<p>New Password And Confirm Password Does Not Match</p>',
        //   // error,
        //   // 'error'
        // )
    } else {
      const user_passDetail = {
        "id": this.authService.currentUserValue.userid,
        "old_password": data.opassword,
        "password": data.npassword
      };

      this.patientdataService.updatePassword(user_passDetail).subscribe(
        (result) => {
          if (result.status_code == 200) {
            this.success_message = true;
            this.error_message = false;
            setTimeout(() => {
              this.success_message = false;
              const currentUrl = this.router.url;
              // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              //   this.router.navigate([currentUrl]);
              // });
             this.router.navigate(["/doctors/dashboard"]);
            }, 2000);
            Swal.fire(
              '',
              result.message,
              'success'
            )
          }
          if (this.profilepassform.valid) {
            this.profilepassform.reset();
          }
          // else{
          //   Swal.fire(
          //     '',
          //     result.message,
          //     'error'
          //   )
          // }
        },
        (err) => {
          Swal.fire(
            '',
            err,
            'error'
          )
        }
      );
      // this.router.navigate(["/authentication/signin"]);
    }
  }
  // get fun() {
  //   return this.profilepassform.controls;
  // }
  // onSubmit(data) {
  //   this.submitted = true;
  //   console.log(this.profilepassform.value);
    
  //   // stop here if form is invalid
  //   if (this.profilepassform.invalid) {
  //     return;
  //   } else {
  //     const user_passDetail = {
  //       "id":this.authService.currentUserValue.userid,
  //       "old_password":data.opassword,
  //       "password":data.npassword
  //      };

  //      this.doctorServiceService.updatePassword(user_passDetail).subscribe(
  //       (result)=>{
  //         if(result.status_code == 200){
  //         //this.success_message= true;
  //         //this.error_message = false;
  //         setTimeout(() => {
  //          this.router.navigate(["/doctors/my-profile"]);
  //         }, 300);

  //         Swal.fire(
  //           '',
  //           result.message,
  //           'success'
  //         )
  //         }
  //         if (this.profilepassform.valid) {
  //           this.profilepassform.reset();
  //         }
  //       },
  //       (err)=>{
        
  //         Swal.fire(
  //           '',
  //           err,
  //           'error'
  //         )
  //        // this.success_message= false;
  //        // this.error_message = true;
  //        // this.error_message_text = err;  
  //       }
  //      );
  //  //   this.router.navigate(["/authentication/signin"]);
  //   }
  // }
}
