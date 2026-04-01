import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators, } from "@angular/forms";
import { ThemePalette } from "@angular/material/core";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { ClinicServiceService } from 'src/app/services/clinic-service.service';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import { PatientdataService } from 'src/app/services/patientdata.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.sass']
})

export class AddPatientComponent {
  addpatientForm: FormGroup;
  submitted = false;
  returnUrl: string;
  color: ThemePalette = "accent";
  flat = false;
  persentage = false;
  isHidden = true;
  public selection: string = 'self';
  public customOption: string = 'customOption';
  radioGroup: any;
  timeout: any;
  fullName: any;
  gender: any;
  email: any;
  adharcardno: any;
  pincode: any;
  mobile_no: any;
  dob: any;
  address: any;
  private form: FormData;
  profile_image: any;
  accept: string = ".jpeg,.png,.jpg,.pdf";
  doctorData: any;
  maxDate = new Date();
  minDate = new Date();
  planModel: any = { start_time: new Date() };
  memberData: any;
  userPrimary: any;
  dateReflect = new Date();
  imageCondition: boolean = false;
  profileImg: any;
  patientID: any;
  imageURLprofile = `${environment.documentUrl}`;


  changediv(divid) {
    if (divid === "self_div") {
      this.flat = true;
      this.persentage = false;
    }
    else if (divid === "doctor_div") {
      this.flat = false;
      this.persentage = true;
    }
  }
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private clinicServiceService: ClinicServiceService,
    private router: Router,
    private patientdataService: PatientdataService,
    private patientServiceService: PatientServiceService,
  ) {
    this.addpatientForm = this.fb.group({
      suggested_by: ["",],
      doctor: ["",],
      fullname: ["", [Validators.required]],
      gender: ["",[Validators.required]],
      email: [""],
      pincode: [""],
      mobile: ["", [Validators.required, Validators.pattern("[6789][0-9]{9}")]],
      dob: ["", [Validators.required]],
      address: [""],
      enquiryDate: ["", [Validators.required]],
      uploadImg: [""],

    });


  }

  ngOnInit() {
    this.doctorList();
  }

  success_message: boolean = false;
  error_message: boolean = false;
  error_message_text: string;

  doctorList() {

    const doctorList = {
      "user_id": this.authService.currentUserValue.userid
    }

    this.patientServiceService.doctorListLab(doctorList).subscribe(
      (result) => {
        this.doctorData = result.data;
        // console.log('all docotor', result);

      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    // console.log("Form Value", this.addpatientForm.value);

    this.form = new FormData();

    this.form.append('search_key', this.addpatientForm.value.mobile);
    this.form.append('suggested_by', this.addpatientForm.value.suggested_by);
    this.form.append('user_id', this.authService.currentUserValue.userid);
    this.form.append('role_id', '3');
    this.form.append('suggested_by_id', this.addpatientForm.value.doctor !== null && this.addpatientForm.value.doctor !== '' ? this.addpatientForm.value.doctor : this.authService.currentUserValue.userid);
    this.form.append('full_name', this.addpatientForm.value.fullname);
    this.form.append('email_id', this.addpatientForm.value.email);
    this.form.append('date_of_birth', this.addpatientForm.value.dob);
    this.form.append('sex', this.addpatientForm.value.gender);
    this.form.append('pin_code', this.addpatientForm.value.pincode);
    this.form.append('address', this.addpatientForm.value.address);
    this.form.append('profile_image', this.profile_image);
    this.form.append('primary_user_id', this.userPrimary);
    this.form.append('patient_id', this.patientID);
    this.form.append('enquiry_date', this.addpatientForm.value.enquiryDate);
    // this.form.append('appointment_date','10/1/2022')
    // console.log('Form Data = ', this.form);

    this.clinicServiceService.addPatientLabRadio(this.form).subscribe(
      (result) => {
        if (result.status == "success") {
          Swal.fire(
            '',
            'Added Successfully',
            'success'
          )
          // localStorage.setItem("regUserID",result.data.id);
          setTimeout(() => {
            this.router.navigate(["/doctor/patient-management/patient-list"]);
          }, 1000);

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

  searchPatientMobile(event: Event) {
    // this.dataSource3 = new MatTableDataSource ();
    if ((event.target as HTMLInputElement).value != '') {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        const inputData = {
          search_key: (event.target as HTMLInputElement).value,
        }

        this.clinicServiceService.searchPatientMobile(inputData).subscribe(
          (result) => {
            let hasKey = result.hasOwnProperty('data');
            if (hasKey) {

              this.memberData = result.data;
              this.userPrimary = result.data[0].id;
              this.fullName = result.data[0].full_name ?? '';
              this.gender = result.data[0].gender;
              this.email = result.data[0].email;
              this.pincode = result.data[0].pin_code;
              this.mobile_no = result.data[0].mobile_number;
              this.dob = new Date(result.data[0].date_of_birth);
              this.address = result.data[0].address;
              this.patientID = result.data[0].id;
              this.profileImg = result.data[0].profile_image_name;
              this.imageCondition = true;
            }
            else {
              this.memberData = [];
              this.userPrimary = '';
              this.fullName = '';
              this.gender = '';
              this.email = '';
              this.pincode = '';
              this.mobile_no = '';
              this.dob = '';
              this.address = '';
              this.patientID = '';
              this.profileImg = '';
              this.imageCondition = false;
            }

          },
          (err) => {
            console.log(err);
            this.imageCondition = false;
          }
        );
      }, 2000);
    }
    else{
      this.memberData = [];
      this.userPrimary = '';
      this.fullName = '';
      this.gender = '';
      this.email = '';
      this.pincode = '';
      this.mobile_no = '';
      this.dob = '';
      this.address = '';
      this.patientID = '';
      this.profileImg = '';
      this.imageCondition = false;
    }
    // $('#my-input-box').keyup(_.debounce(doSomething , 500));

  }

  showAge(date: any) {
    const convertAge = new Date(date);
    const timeDiff = Math.abs(Date.now() - convertAge.getTime());
    return Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
  }

  // searchPatientMobile(event: Event) {
  //   // this.dataSource3 = new MatTableDataSource ();
  //   if ((event.target as HTMLInputElement).value != '') {
  //     clearTimeout(this.timeout);
  //     this.timeout = setTimeout(() => {
  //       const inputData = {
  //         search_key: (event.target as HTMLInputElement).value,
  //       }

  //       this.clinicServiceService.searchPatientMobile(inputData).subscribe(
  //         (result) => {
  //           this.fullName = result.data[0].full_name;
  //           this.gender = result.data[0].gender;
  //           this.email = result.data[0].email;
  //           this.pincode = result.data[0].pin_code;
  //           this.mobile_no = result.data[0].mobile_number;
  //           this.dob = new Date(result.data[0].date_of_birth);
  //           this.address = result.data[0].address;
  //         },
  //         (err) => {
  //           console.log(err);
  //         }
  //       );
  //     }, 2000);
  //   }
  //   // $('#my-input-box').keyup(_.debounce(doSomething , 500));

  // }

  async fileChange($event) {
    this.profile_image = null;
    if ($event && $event.length) {
      this.profile_image = $event[0];
      // console.log(this.profile_image);
    }
  }

  fetchmemberDetail(data) {
    const patientID = {
      id: data
    }
    this.patientID = data;
    this.patientdataService.profile(patientID).subscribe(
      (result) => {
        this.fullName = result.data[0].first_name;
        this.gender = result.data[0].gender;
        this.dob = new Date(result.data[0].date_of_birth);
        this.profileImg = result.data[0].imgName;
      },
      (err) => {

      }
    );
  }

  checkedTrue(data) {
    if (data == '0') {
      return true;
    }
    else {
      return false;
    }
  }
}