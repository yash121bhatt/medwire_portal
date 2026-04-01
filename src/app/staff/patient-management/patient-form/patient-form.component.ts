import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators, } from "@angular/forms";
import { ThemePalette } from "@angular/material/core";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { ClinicServiceService } from 'src/app/services/clinic-service.service';
import { PatientdataService } from 'src/app/services/patientdata.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.sass']
})
export class PatientFormComponent {
  addpatientForm: FormGroup;
  dateReflect = new Date();
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
  memberData: any;
  patientID: any;
  imageURLprofile = `${environment.documentUrl}`;
  imageCondition: boolean = false;
  profileImg: any;
  userPrimary: any;
  created_by_id: any;


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
    private patientdataService: PatientdataService
  ) {
    this.addpatientForm = this.fb.group({
      memberselected: [""],
      suggested_by: [""],
      doctor: ["",],
      fullname: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      email: ["",],
      pincode: ["", [Validators.pattern("[0-9]{6}")]],
      mobile: ["", [Validators.required, Validators.pattern("[0-9]{10}")]],
      dob: ["", [Validators.required]],
      address: [""],
      enquiryDate: [new Date(), [Validators.required]],
      uploadImg: [""],

    });


  }

  ngOnInit() {

    this.staffDetail();

  }

  //Staff detail api for clinic id
  staffDetail() {
    let data = {
      staff_id: this.authService.currentUserValue.userid,
    }
    this.clinicServiceService.staffDetail(data).subscribe(
      (result) => {
        if (result.status_code == 200) {
         
          this.created_by_id = result.data[0].created_by_id;
        
          this.doctorsList();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  doctorsList() {
    const doctorList = {
      "clinic_id": this.created_by_id
    }

    this.clinicServiceService.doctorList(doctorList).subscribe(
      (result) => {
        this.doctorData = result.data;
        // console.log('all docotor', result);

      },
      (err) => {
        console.log(err);
      }
    );
  }

  success_message: boolean = false;
  error_message: boolean = false;
  error_message_text: string;

  onSubmit() {
    this.submitted = true;
    // console.log("Form Value", this.addpatientForm.value);

    this.form = new FormData();

    this.form.append('search_key', this.addpatientForm.value.mobile);
    this.form.append('suggested_by', this.addpatientForm.value.suggested_by);
    this.form.append('user_id', this.created_by_id);
    this.form.append('staff_id', this.authService.currentUserValue.userid);
    this.form.append('role_id', '8');
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
  

    this.clinicServiceService.addPatient(this.form).subscribe(
      (result) => {
        if (result.status == "success") {
          Swal.fire(
            '',
            result.message,
            'success'
          )
          // localStorage.setItem("regUserID",result.data.id);
          setTimeout(() => {
            this.router.navigate(["/staff/patient-management/patient-list"]);
          }, 1000);

        }
      },
      (err) => {
        Swal.fire(
          '',
          err,
          'error'
        )
        this.error_message = true;
        this.success_message = false;
        this.error_message_text = err;
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
    // $('#my-input-box').keyup(_.debounce(doSomething , 500));

  }

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
        this.profileImg = result.data[0].profile_image_name;
      },
      (err) => {

      }
    );
  }

  showAge(date: any) {
    const convertAge = new Date(date);
    const timeDiff = Math.abs(Date.now() - convertAge.getTime());
    return Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
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

