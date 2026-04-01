import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientdataService } from "src/app/services/patientdata.service";
import { AuthService } from "src/app/core/service/auth.service";
import { User } from "src/app/core/models/user";
import Swal from 'sweetalert2';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { DatePipe } from '@angular/common';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-radioeditprofile',
  templateUrl: './radioeditprofile.component.html',
  styleUrls: ['./radioeditprofile.component.sass']
})
export class RadioeditprofileComponent implements OnInit {
  private form: FormData;
  editprofiletForm: FormGroup;
  submitted: boolean;
  registrationForm: any;
  userNameinput: string;
  emailadd: string;
  mobileno: StaticRange;
  user_id: number;
  token: string;
  Users: any;
  username: string;
  last_name: string;
  email: string;
  mobileNo: number;
  adharcardno: number;
  gender: string;
  dob: string;
  success_message: boolean;
  error_message: boolean;
  error_message_text: string;
  date_formate: any;
  maxDate = new Date();
  profile_image: any;
  imageprofile: any;
  imageURLprofile = `${environment.documentUrl}`;
  imagedocURL = `${environment.labDocumentUrl}`;
  address: any;
  pin_code: any;
  opening_time: any;
  closing_time: any;
  approvedoc: any;
  imageURL: any;
  constructor(
    private cd: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private patientdataService: PatientdataService,
    private authService: AuthService,
    private dateAdapter: DateAdapter<Date>
  ) {

    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  ngOnInit(): void {
    this.editprofiletForm = this.formBuilder.group({
      username: ["",[Validators.required,Validators.pattern("[A-Za-z ]{1,32}")]],
      email: [
        "",
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      mobile: ["",],
      file: [null],
      opening_time: ["", Validators.required],
      closing_time: ["", Validators.required],
      address: ["", Validators.required],
      pin_code: ["", Validators.required]
    });

    this.user_id = this.authService.currentUserValue.userid;
    this.token = this.authService.currentUserValue.token;
    const data = { id: this.user_id };
    this.patientdataService.profile(data).subscribe(
      (result) => {

        this.Users = Array(result.data);
        this.username = result.data[0].first_name;
        this.approvedoc = result.data[0].approve_document;
        this.email = result.data[0].email;
        this.mobileNo = result.data[0].mobile;
        this.gender = result.data[0].gender;
        this.adharcardno = result.data[0].adhar_card;
        this.dob = result.data[0].date_of_birth;
        // this.imageprofile = result.data[0].imgName??'demouser.png';
        this.address = result.data[0].address;
        this.pin_code = result.data[0].pin_code;
        this.opening_time = result.data[0].opening_time;
        this.closing_time = result.data[0].closing_time;
        this.imageprofile = result.data[0].imgName != '' && result.data[0].imgName != null ? result.data[0].imgName : 'demouser.png';
        this.imageUrl = this.imageURLprofile + this.imageprofile;
      },
      (err) => {
        console.log(err);
      }
    );


  }
  @ViewChild('fileInput') el: ElementRef;
  imageUrl: any = '';
  editFile: boolean = true;
  removeUpload: boolean = false;


  uploadfileForm = this.fb.group({
    file: [null],
  });

  uploadFile(event) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.registrationForm.patchValue({
          file: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }

  onSubmit(data) {
    var datePipe = new DatePipe("en-GB");
    this.date_formate = datePipe.transform(data.dob, 'dd/MM/yyyy');

    if (this.editprofiletForm.invalid) {

      window.scroll(0, 1);
      return;
    }
    else {
      this.submitted = true;
      this.form = new FormData();
      this.form.append('first_name', this.editprofiletForm.value.username);
      //this.form.append('adhar_card',this.editprofiletForm.value.adharcardno);
      this.form.append('date_of_birth', this.editprofiletForm.value.dob);
      this.form.append('mobile', this.editprofiletForm.value.mobile);
      this.form.append('gender', this.editprofiletForm.value.gender);
      this.form.append('user_id', this.authService.currentUserValue.userid);
      this.form.append('address', this.editprofiletForm.value.address);
      this.form.append('pin_code', this.editprofiletForm.value.pin_code);
      this.form.append('opening_time', this.editprofiletForm.value.opening_time);
      this.form.append('closing_time', this.editprofiletForm.value.closing_time);
      this.form.append('profile_image', this.profile_image);


      this.patientdataService.profileupdate(this.form).subscribe(
        (result) => {
          this.http.post<any>(`${environment.apiUrl}auth/profile`, {
            id: this.authService.currentUserValue.userid,
          }, { headers: { 'x-access-token': this.authService.currentUserValue.token } }).subscribe(
            (result_profile) => {

              const user_detail = {
                userid: result_profile.data[0].id,
                img: result_profile.data[0].img ?? "assets/image/user/demouser.png",
                username: result_profile.data[0].username,
                password: "",
                firstName: result_profile.data[0].first_name,
                lastName: result_profile.data[0].last_name,
                role: this.authService.currentUserValue.role,
                roleID: result_profile.data[0].role_id,
                token: this.authService.currentUserValue.token,
                address: result_profile.data[0].address,
                pin_code: result_profile.data[0].pin_code,
                image_name: result_profile.data[0].imgName ?? 'demouser.png'


              };
              localStorage.setItem("currentUser", JSON.stringify(user_detail));
              Swal.fire(
                '',
                result.message,
                'success'
              )
              setTimeout(() => {
                this.router.navigate(["/radiology/radiomyprofile"]).then(() => {
                  window.location.reload();
                });
              }, 1000);
            },
            (err) => {
              Swal.fire(
                '',
                err,
                'error'
              )

            }
          );
        }

      );
    }


  }

  async fileChange($event) {
    this.profile_image = null;
    if ($event && $event.length) {
      this.profile_image = $event[0];
    }
  }


}
