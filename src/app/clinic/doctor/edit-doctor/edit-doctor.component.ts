import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ClinicServiceService } from 'src/app/services/clinic-service.service';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'src/app/core/service/auth.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { environment } from "src/environments/environment";
import doctorDegree from 'src/assets/data/doctor_degree.json';
import doctorSpecility from 'src/assets/data/doctor_specility.json';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteActivatedEvent, MatAutocompleteTrigger, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  providers: [DatePipe],
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.sass']
})
export class EditDoctorComponent {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  specialityCtrl = new FormControl('');
  filteredSpecialitys: Observable<string[]>;
  specialitys: string[] = [];
  allSpecialitys: string[];
  // [
  //   "Centre for Accident","Emergency Centre for Bone Joint", "Centre for Cancer", "Centre for Cardiac Sciences", "Centre for Children", "Centre for Childrens Heart", "Centre for Cosmetology Plastic Surgery", "Centre for Critical Care", "Centre for Diabetes Bariatric Surgery", "Centre for Mother Child", "Centre for Neurosciences", "Centre for Physical Medicine Rehabilitation", "Centre for Robotic Surgery", "Centre for Sports Medicine", "Centre for Transplant", "Anaesthesiology", "Bariatric Surgery", "Clinical Haematology", "Cosmetology", "Dental Surgery", "Dermatology","Development Disorders", "Endocrinology Diabetes","ENT", "Fetal Medicine", "Gastroenterology", "General Surgery", "Genetics Molecular Medicine", "Gynaecology Obstetrics", "Hepato Pancreato Biliary", "Internal Medicine", "Interventional Radiology", "Laboratory Medicine", "Minimal Access Surgery", "Nephrology", "Nuclear Medicine", "Nutrition Therapy","Ophthalmology", "Pain Management Palliative Care", "Plastic Reconstructive Surgery", "Psychiatry", "Pulmonary Medicine", "Radiology", "Regenerative Medicine", "Reproductive Endocrinology Fertility", "Transfusion Medicine", "Urology", "Vascular Surgery" ];

  @ViewChild('prescriptionInput') prescriptionInput: ElementRef<HTMLInputElement>;


  editdoctorForm: FormGroup;
  submitted = false;
  returnUrl: string;
  fullnamedoctor: any;
  date_of_birth: any;
  mobile_no: any;
  practicedate: any;
  adharcardno: any;
  speciality: [];
  emailId: any;
  gender: any;
  private form: FormData;
  profile_image: any;
  accept: string = ".jpeg,.png,.jpg,.pdf";
  degrees_doctor: any;
  experience: any;
  alternate_number: any;

  constructor(
    private fb: FormBuilder,
    private clinicServiceService: ClinicServiceService,
    private route: ActivatedRoute,
    private router: Router,
    public datepipe: DatePipe,
    private authService: AuthService,
  ) {

    // this.filteredSpecialitys = this.specialityCtrl.valueChanges.pipe(
    //   startWith(null),
    //   map((speciality: string | null) => (speciality ? this._filter(speciality) : this.allSpecialitys.slice())),
    // );

    this.editdoctorForm = this.fb.group({
      fullname: ["", [Validators.required]],
      dob: ["", [Validators.required]],
      mobile: ["", [Validators.required, Validators.pattern("[6789][0-9]{9}")]],
      email: ["", [Validators.required, Validators.email, Validators.minLength(5)]],
      doctor_degree: ["", [Validators.required]],
      experience: ["", [Validators.required]],
      //position: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
       speciality: [""],
      gender: ["", [Validators.required]],
      alternate_number: [""],
      uploadImg: [""],
    });
  }

  public variables = doctorSpecility;

  public variables3 = doctorDegree;

  public filteredList2 = this.variables.slice();
  public filteredList3 = this.variables3.slice();

  public variables3Selected = ['MBBS', 'BDS'];

  success_message: boolean = false;
  error_message: boolean = false;
  error_message_text: string;
  imageURLprofile = `${environment.documentUrl}`;

  ngOnInit() {
    this.doctorspecility();

    const doctorList = {
      "user_id": this.route.snapshot.paramMap.get('type')
    }

    this.clinicServiceService.doctorEdit(doctorList).subscribe(
      (result) => {
        // console.log('re',result.data[0].alternate_mobile_number);
        const [day, month, year] = result.data[0].date_of_birth.split('/');
        const resultDate_of_birth = [year, month, day].join('-');
        // const [daypractice, monthpractise, yearpractise] = result.data[0].pratice_start_date.split('/');
        //   const resultPractiseDate  = [yearpractise, monthpractise, daypractice].join('-');
        this.fullnamedoctor = result.data[0].full_name;
        this.date_of_birth = new Date(result.data[0].date_of_birth);
        this.mobile_no = result.data[0].mobile_number;
        // this.practicedate         = resultPractiseDate;
        this.experience = result.data[0].experience_in_year;

        this.specialitys = result.data[0].specialities.split(',');
        this.degrees_doctor = result.data[0].degrees.split(',');
        this.emailId = result.data[0].email;
        // console.log('')
        this.gender = result.data[0].gender;
        this.imageURLprofile = this.imageURLprofile + result.data[0].profile_image_name;
        this.alternate_number = result.data[0].alternate_mobile_number;
      },
      (err) => {
        console.log(err);
      }
    );
  }


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.specialitys.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.specialityCtrl.setValue(null);
  }

  remove(speciality: string): void {
    const index = this.specialitys.indexOf(speciality);

    if (index >= 0) {
      this.specialitys.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.specialitys.push(event.option.viewValue);
    this.prescriptionInput.nativeElement.value = '';
    this.specialityCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allSpecialitys.filter(speciality => speciality.toLowerCase().includes(filterValue));
  }




  onSubmit() {
    this.submitted = true;
    // console.log("Form Value", this.editdoctorForm.value);

    this.form = new FormData();

    this.form.append('full_name', this.editdoctorForm.value.fullname);
    this.form.append('email_id', this.editdoctorForm.value.email);
    this.form.append('date_of_birth', this.editdoctorForm.value.dob);
    this.form.append('mobile_number', this.editdoctorForm.value.mobile);
    this.form.append('experience_in_year', this.editdoctorForm.value.experience);
    this.form.append('gender', this.editdoctorForm.value.gender);
    this.form.append('role_id', '5');
    this.form.append('clinic_id', this.authService.currentUserValue.userid);
    this.form.append('doctor_id', this.route.snapshot.paramMap.get('type'));
    this.form.append('specialities', this.specialitys.toString());
    this.form.append('degrees', this.editdoctorForm.value.doctor_degree);
    this.form.append('alternate_mobile_number', this.editdoctorForm.value.alternate_number);
    this.form.append('profile_image', this.profile_image);
    // console.log('Form Data = ', this.form);

    this.clinicServiceService.updateDoctor(this.form).subscribe(
      (result) => {
        if (result.status == "success") {
          Swal.fire(
            '',
            result.message,
            'success'
          )
          // localStorage.setItem("regUserID",result.data.id);
          setTimeout(() => {
            this.router.navigate(["/clinic/doctor/doctor-list"]);
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
    //this.submitted = true;
    //console.log("Form Value", this.editdoctorForm.value);
  }

  async fileChange($event) {
    this.profile_image = null;
    if ($event && $event.length) {
      this.profile_image = $event[0];
      // console.log(this.profile_image);
    }
  }

  doctorspecility() {
    const data = {

    }
    this.clinicServiceService.getDoctorSpecialitiy(data).subscribe(
      (result) => {
        this.allSpecialitys = result.data;

        this.filteredSpecialitys = this.specialityCtrl.valueChanges.pipe(
          startWith(null),
          map((speciality: string | null) => (speciality ? this._filter(speciality) : this.allSpecialitys.slice())),
        );

      },
      (err) => {

      }
    );
  }
}
