import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators, } from "@angular/forms";
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { AuthService } from 'src/app/core/service/auth.service';
import { ClinicServiceService } from 'src/app/services/clinic-service.service';
import DoctorDegree from "src/assets/data/doctor_degree.json";
import DoctorSpecility from "src/assets/data/doctor_specility.json";
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-doctor-form',
  templateUrl: './doctor-form.component.html',
  styleUrls: ['./doctor-form.component.sass']
})
export class DoctorFormComponent {
  adddoctorForm: FormGroup;
  submitted = false;
  returnUrl: string;
  private form: FormData;
  maxDate = new Date();

  public variables = DoctorSpecility;

  public variables3 = DoctorDegree;

  public filteredList2 = this.variables.slice();
  public filteredList3 = this.variables3.slice();
  profile_image: any;
  created_by_id: any;
  specialityCtrl = new FormControl('');
  filteredSpecialitys: Observable<string[]>;
  specialitys: string[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  allSpecialitys: string[] ;
  // [
  //   "Centre for Accident", "Emergency Centre for Bone Joint", "Centre for Cancer", "Centre for Cardiac Sciences", "Centre for Children", "Centre for Childrens Heart", "Centre for Cosmetology Plastic Surgery", "Centre for Critical Care", "Centre for Diabetes Bariatric Surgery", "Centre for Mother Child", "Centre for Neurosciences", "Centre for Physical Medicine Rehabilitation", "Centre for Robotic Surgery", "Centre for Sports Medicine", "Centre for Transplant", "Anaesthesiology", "Bariatric Surgery", "Clinical Haematology", "Cosmetology", "Dental Surgery", "Dermatology", "Development Disorders", "Endocrinology Diabetes", "ENT", "Fetal Medicine", "Gastroenterology", "General Surgery", "Genetics Molecular Medicine", "Gynaecology Obstetrics", "Hepato Pancreato Biliary", "Internal Medicine", "Interventional Radiology", "Laboratory Medicine", "Minimal Access Surgery", "Nephrology", "Nuclear Medicine", "Nutrition Therapy", "Ophthalmology", "Pain Management Palliative Care", "Plastic Reconstructive Surgery", "Psychiatry", "Pulmonary Medicine", "Radiology", "Regenerative Medicine", "Reproductive Endocrinology Fertility", "Transfusion Medicine", "Urology", "Vascular Surgery"];

  @ViewChild('prescriptionInput') prescriptionInput: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private clinicServiceService: ClinicServiceService,
    private router: Router,
    private clinicService: ClinicServiceService
  ) {
    this.filteredSpecialitys = this.specialityCtrl.valueChanges.pipe(
      startWith(null),
      map((speciality: string | null) => (speciality ? this._filter(speciality) : this.allSpecialitys.slice())),
    );

    this.adddoctorForm = this.fb.group({
      fullname: ["", [Validators.required]],
      dob: ["", [Validators.required]],
      experience_in_year: ["", [Validators.required]],
      mobile: ["", [Validators.required, Validators.pattern("[6789][0-9]{9}")]],
      email: ["", [Validators.required, Validators.email, Validators.minLength(5)]],
      speciality: [""],
      alternate_mobile: ["", Validators.pattern("[6789][0-9]{9}")],
      doctor_degree: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      uploadImg: [""],
    });

  }
  success_message: boolean = false;
  error_message: boolean = false;
  error_message_text: string;

  ngOnInit() {
    this.doctorspecility();

    this.staffDetail();


  }

  //Staff detail api for clinic id
  staffDetail() {
    let data = {
      staff_id: this.authService.currentUserValue.userid,
    }
    this.clinicService.staffDetail(data).subscribe(
      (result) => {
        if (result.status_code == 200) {
          // console.log(result);
          this.created_by_id = result.data[0].created_by_id;
        }
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
    this.form = new FormData();
    this.form.append('staff_id', this.authService.currentUserValue.userid)
    this.form.append('full_name', this.adddoctorForm.value.fullname);
    this.form.append('email_id', this.adddoctorForm.value.email);
    this.form.append('date_of_birth', this.adddoctorForm.value.dob);
    this.form.append('mobile_number', this.adddoctorForm.value.mobile);
    this.form.append('gender', this.adddoctorForm.value.gender);
    this.form.append('role_id', '5');
    this.form.append('clinic_id', this.created_by_id);
    this.form.append('experience_in_year', this.adddoctorForm.value.experience_in_year);
    this.form.append('specialities',this.specialitys.toString());
    this.form.append('degrees', this.adddoctorForm.value.doctor_degree);
    this.form.append('alternate_mobile_number', this.adddoctorForm.value.alternate_mobile);
    this.form.append('profile_image', this.profile_image);
    // console.log('Form Data = ', this.form);

    this.clinicServiceService.addDoctor(this.form).subscribe(
      (result) => {
        // console.log('result', result);

        if (result.status === "success") {
          Swal.fire(
            '',
            result.message,
            'success'
          )
          setTimeout(() => {
            this.router.navigate(["/staff/fees/add-doctor-fees"]);
          }, 1000);

        }

      },
      (error) => {

        console.log('errror', error);
        // console.log('Inside 400');
        Swal.fire(
          '',
          error,
          'error'
        )
      });
  }

  async fileChange($event) {
    this.profile_image = null;
    if ($event && $event.length) {
      this.profile_image = $event[0];
      // console.log(this.profile_image);
    }
  }

  doctorspecility()
 {
  const data ={

  }
  this.clinicServiceService.getDoctorSpecialitiy(data).subscribe(
    (result)=>{
      this.allSpecialitys = result.data;

      this.filteredSpecialitys = this.specialityCtrl.valueChanges.pipe(
        startWith(null),
        map((speciality: string | null) => (speciality ? this._filter(speciality) : this.allSpecialitys.slice())),
      );
   
    },
    (err)=>{

    }
  );
}


}

