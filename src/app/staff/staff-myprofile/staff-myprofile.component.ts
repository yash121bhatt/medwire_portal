import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConfirmedValidator } from '../../../app/confirmed.validator';
import { AuthService } from 'src/app/core/service/auth.service';
import { ClinicServiceService } from 'src/app/services/clinic-service.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-staff-myprofile',
  templateUrl: './staff-myprofile.component.html',
  styleUrls: ['./staff-myprofile.component.sass']
})
export class StaffMyprofileComponent implements OnInit {
  profilepassform: FormGroup;
  submitted = false;
  returnUrl: any;
  token: any;
  showAge: any;
  Users: any;
  user_id: number;
  error_message_text: string;
  hide = true;
  chide = true;
  error_message: boolean = false;
  success_message: boolean = false;
  imageURL = `${environment.documentUrl}`;
  imageURLprofile = `${environment.documentUrl}`;
  imagedocURL = `${environment.labDocumentUrl}`;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private clinicServices: ClinicServiceService
  ) { }

  ngOnInit() {
    this.profilepassform = this.formBuilder.group({
      opassword: ["", Validators.required],
      npassword: ["", [Validators.required,
      Validators.pattern(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,30})/
      )]],
      cpassword: ["", Validators.required],

    },
      {
        validator: ConfirmedValidator('npassword', 'cpassword')
      });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
    //API Call
    this.user_id = this.authService.currentUserValue.userid;
    this.token = this.authService.currentUserValue.token;
    const data = { id: this.user_id };
    // console.log('---------',data);
    this.clinicServices.profileStaff(data).subscribe(
      (result) => {
        // console.log('Data = ', result.data);
        if (result.data.date_of_birth != null) {
          const convertAge = new Date(result.data.date_of_birth);
          const timeDiff = Math.abs(Date.now() - convertAge.getTime());
          this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
        }
        else {
          this.showAge = '-';
        }
        this.Users = result.data;
        // console.log(this.Users);


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

      this.clinicServices.updatePassword(user_passDetail).subscribe(
        (res) => {
          if (res.status_code == 200) {
            this.success_message = true;
            this.error_message = false;
            setTimeout(() => {
              this.success_message = false;
              this.router.navigate(["/staff/dashboard"]);
            }, 2000);
            Swal.fire(
              '',
              res.message,
              'success'
            )
          }
          // if (this.profilepassform.valid) {
          //   this.profilepassform.reset();
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
}