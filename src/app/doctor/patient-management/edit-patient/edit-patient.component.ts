import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { ClinicServiceService } from 'src/app/services/clinic-service.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.sass']
})
export class EditPatientComponent implements OnInit {

  addpatientForm: FormGroup;
  submitted = false;
  returnUrl: string;
  patientData: any;
  doctorData: any;
  color: ThemePalette = "accent";
  flat = false;
  persentage = false;
  isHidden = true;
  public selection: string;
  public customOption: string = 'customOption';
  radioGroup: any;
  timeout: any;
  mobile_no: any;
  search_key: any;
  suggested_by_name: any;
  user_id: any;
  role_id: any;
  suggested_by_id: any;
  full_name: any;
  email: any;
  date_of_birth: any;
  aadhar_card_number: any;
  sex: any;
  gender: any;
  pin_code: any;
  address: any;
  enquiry_date: any;
  profile_image: any;
  profile_image_name: any;
  mobile_number: any;
  doctor: any;
  checkedStatus: boolean = false;
  private form: FormData;
  checkedDoctor: boolean = false;
  maxDate = new Date();
  minDate = new Date();
  planModel: any = {start_time: new Date() };

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
  constructor(private fb: FormBuilder,
    private clinicServiceService: ClinicServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) {

    this.addpatientForm = this.fb.group({
      suggested_by_name: [""],
      mobile_number: ["",[Validators.required]],
      doctor: [""],
      full_name: ["", [Validators.required]],
      gender: [""],
      email: [""],
      pin_code: ["",],
      // search_key        : ["", [Validators.required]],
      date_of_birth: ["", [Validators.required]],
      address: [""],
      enquiry_date: ["", [Validators.required]],
      profile_image: [""],

    });



  }

  ngOnInit() {
    const data = {
      patient_id: this.route.snapshot.paramMap.get('id'),
    }

    this.clinicServiceService.patientDetail(data).subscribe((res: any) => {
      if (res.status_code == 200) {
        // console.log(res);

        this.patientData = res.data[0];
        this.doctor = this.patientData.doctor;
        this.mobile_number = this.patientData.mobile_number;
        this.suggested_by_name = this.patientData.suggested_by_name;
        this.user_id = this.patientData.user_id;
        this.role_id = this.patientData.role_id;
        this.full_name = this.patientData.full_name;
        this.email = this.patientData.email;
        this.date_of_birth = new Date(this.patientData.date_of_birth);
        this.gender = this.patientData.gender;
        this.pin_code = this.patientData.pin_code;
        this.address = this.patientData.address;
        this.enquiry_date = new Date(this.patientData.enquiry_date);
        this.profile_image_name = this.patientData.profile_image;
        //  console.log('suggest ',this.suggested_by_name);
        if (this.suggested_by_name == 'self') {
          this.checkedStatus = true;
        } else {
          this.checkedDoctor = true;
          this.flat = true;
        }
      }
    }, (error: any) => {
      Swal.fire(
        '',
        error.message,
        'error'
      )
    }
    )
    this.doctorList();
  }


  doctorList() {
    const doctorList = {
      "clinic_id": this.authService.currentUserValue.userid
    }

    this.clinicServiceService.doctorList(doctorList).subscribe(
      (result) => {
        this.doctorData = result.data;
        //console.log('all docotor', result);

      },
      (err) => {
        console.log(err);
      }
    );
  }

  success_message: boolean = false;
  error_message: boolean = false;
  error_message_text: string;
  imageURLprofile = `${environment.documentUrl}`;
  onSubmit() {
    this.submitted = true;

    this.form = new FormData();

    this.form.append('search_key', this.addpatientForm.value.mobile_number);
    this.form.append('suggested_by', this.addpatientForm.value.suggested_by_name);
    this.form.append('user_id', this.authService.currentUserValue.userid);
    this.form.append('role_id', '3');
    this.form.append('suggested_by_id', this.addpatientForm.value.doctor);
    this.form.append('full_name', this.addpatientForm.value.full_name);
    this.form.append('email_id', this.addpatientForm.value.email);
    this.form.append('date_of_birth', this.addpatientForm.value.date_of_birth);
    this.form.append('sex', this.addpatientForm.value.gender);
    this.form.append('pin_code', this.addpatientForm.value.pin_code);
    this.form.append('address', this.addpatientForm.value.address);
    this.form.append('profile_image', this.profile_image);
    this.form.append('enquiry_date', this.addpatientForm.value.enquiry_date);
    this.clinicServiceService.updatePatient(this.form).subscribe((res: any) => {
      if (res.status_code == 200) {
        // console.log(res);

        setTimeout(() => {
          this.router.navigate(['/doctor/patient-management/patient-list']);
        }, 600);

      }
      Swal.fire(
        '',
        'Update Successful',
        'success'
      )
    }, (error: any) => {
      Swal.fire(
        '',
        error.message,
        'error'
      )
    })

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
            this.full_name = result.data[0].full_name;
            this.gender = result.data[0].gender;
            this.email = result.data[0].email;
            this.pin_code = result.data[0].pin_code;
            this.mobile_number = result.data[0].mobile_number;
            this.date_of_birth = new Date(result.data[0].date_of_birth);
            this.address = result.data[0].address;
          },
          (err) => {
            console.log(err);
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

}
