
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { Category } from '../model/category';
import { SubCategory } from '../model/sub-category';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-patient-list-step',
  templateUrl: './patient-list-step.component.html',
  styleUrls: ['./patient-list-step.component.sass']
})
export class PatientListStepComponent implements OnInit {

  categories: Category[];
  subCategories: SubCategory[];

  selectedStatus:  number ;  
  eventEditForm: FormGroup;
  isLinear = false;
  HFormGroup1: FormGroup;
  HFormGroup2: FormGroup;
  HFormGroup3: FormGroup;
  patientForm: any;
  fb: any;
  user_id: any;
  token: any;
  first_name:any;
  patientList: any;
  parentuser: any;
  id: any;
  mainUser: any;
  date_of_birth:any;
  member_id: any;
  img : '';
  lab_id: any;
  imageURL = `${environment.documentUrl}`;
  cat_id: any;
  checkData: boolean = false;
  nextBtnCondition = false;
  public loading: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private patientServiceService: PatientServiceService,
    private authService: AuthService,
    private router: Router
  ) {

   }


  getCategory() {
    return [
      new Category(1, 'X-Ray'), 
      new Category(2, 'Breast Imaging Services'),
      new Category(3, 'Interventional Radiology (IR) Services'),
      new Category(4, 'Nuclear Imaging Services')
    ];
  }

  getSubCategory() {
    return [
      new SubCategory(1, 'X-Ray', 'Joint X-Ray'),
      new SubCategory(2, 'X-Ray', 'Hand X-Ray'),
      new SubCategory(3, 'X-Ray', 'Neck X-Ray'),
      new SubCategory(4, 'X-Ray', 'Chest X-Ray'),
      new SubCategory(5, "X-Ray", 'Abdominal X-Ray'),
      new SubCategory(6, "X-Ray", 'Kidney, Ureter and Bladder X-Ray'),
      new SubCategory(7, "Breast Imaging Services", 'Breast MRI'),
      new SubCategory(8, "Breast Imaging Services", 'MRI (breast) core biopsy'),
      new SubCategory(9, "Breast Imaging Services", 'Breast ultrasound'),
      new SubCategory(10, "Interventional Radiology (IR) Services", 'Chemoembolization'),
      new SubCategory(11, "Interventional Radiology (IR) Services", 'Radioembolization'),
      new SubCategory(12, "Interventional Radiology (IR) Services", 'Fallopian tube recanalization'),
      new SubCategory(10, "Nuclear Imaging Services", 'Bone density scan'),
      new SubCategory(11, "Nuclear Imaging Services", 'Cardiac PET viability'),
      new SubCategory(12, "Nuclear Imaging Services", 'PET/CT Scanning'),
    ];
  }

  public variables = ['Adrenal Function Test', 'Allergy Testing', 'Allergy Testing', 'Anemia Profiles', 'Body Minerals Test', 'Bone Profile Blood Test', 'Cancer Testing', 'Cardiac Testing', 'Coagulation Tests', 'Covid Monitoring Test', 'Diabetes Test', 'Doctor Prescribed Tests', 'Discount Panels', 'Drug and Alcohol Tests', 'Exposure Tests', 'Heart Health Tests', 'Home Test Kits', 'Hormone Tests', 'Immunity Tests', 'Infectious Disease Tests', 'Kidney Tests', 'Eye Care Test', 'Liver Tests', 'STD Tests', 'Men Specific Tests', 'Stress and Fatigue Tests', 'Thyroid Tests', 'Vitamin, Mineral & Nutrition Tests', 'Wellness Panels', 'Women Specific Tests'];

  public filteredList2 = this.variables.slice();

  public variables3 = ['2D Echo', '4D Scan', 'Allergy Test', 'Ammonia Test', 'ANC Profile', 'Anti-Mullerian Hormone (AMH) Test', 'ASO Test', 'Biopsy', 'Blood Culture Test', 'Blood Sugar Test', 'Bone Density Test / Dexa Scan', 'Bone Scan', 'Calcium Test', 'CBC / Hemogram Test', 'Chikungunya Test', 'Chlamydia Test', 'Chloride Test', 'Cholesterol Test', 'Color Doppler', 'CT Scan', 'Dengue IgG Test', 'DNA Test', 'ECG',];

  public filteredList3 = this.variables3.slice();

  onSelect(e) {
    // console.log(e.value);
    this.cat_id = e.value;
    this.test()
    // this.subCategories = this.getSubCategory().filter((item) => item.categoryname == categoryname.value);

  }

  ngOnInit(): void {
    this.test();
    this.categories = this.getCategory();

    // console.log('mobileNO = ',localStorage.getItem("patientMobileno"));
    this.HFormGroup1 = this._formBuilder.group({
      mobile: ["", [Validators.required, Validators.pattern("[789][0-9]{9}"), Number]],
    });
    this.HFormGroup2 = this._formBuilder.group({
      completed: ["", Validators.required],
    });
    this.HFormGroup3 = this._formBuilder.group({
      cat_id: ["", Validators.required],
      test_id: ["", Validators.required],
    });


    this.eventEditForm = new FormGroup({          
      'completed': new FormControl()
      });      
    // this.member_id = this.mainUser.id;

    const formData = {
      "mobile" : localStorage.getItem("patientMobileno"),
    }

    //Category Api
    this.user_id = this.authService.currentUserValue.userid;
    const data = {
      "lab_id": this.user_id,
    }
    this.patientServiceService.labcategoryList(data).subscribe(
      (result: any) => {
        this.filteredList2 = result.data;
      },

      (err) => {
        console.log(err);
      }
    );
    
    //Members Search API
    this.checkData = false;
    this.user_id = this.authService.currentUserValue.userid;
    this.token = this.authService.currentUserValue.token;

    this.patientServiceService.memberSearch(formData).subscribe(

      (result) => {
         
        this.mainUser = result.parentuser;
        
        if( result.parentuser.length==0){
          this.checkData = false;
          this.nextBtnCondition = true;
          
        }
        else{
          this.nextBtnCondition = false;
          this.checkData = true;
        }
      
        this.patientList = result.subuser;
        this.member_id = this.mainUser.id;
 

      },
      (err) => {
        this.nextBtnCondition = true;
        Swal.fire(
          '',
          err.message,
          'error'
        )
      });
  }

  test() {
    this.user_id = this.authService.currentUserValue.userid;
    const data1 = {
      "lab_id": this.user_id,
      "category_name": this.cat_id
    }
    this.patientServiceService.testListdep(data1).subscribe(
      (result: any) => {
        this.filteredList3 = result.data;
        // console.log(result.data);
      },

      (err) => {
        console.log(err);
      }
    );
  }

  showAge(date:any) {
    const convertAge = new Date(date);
    const timeDiff = Math.abs(Date.now() - convertAge.getTime());
    return Math.floor((timeDiff / (1000 * 3600 * 24))/365);
  }
  onSubmit (_data:any){
    this.loading = true;
    
    const data = {
      "mobile" : localStorage.getItem("patientMobileno"),
      "member_id" : this.member_id,
      "category" : this.HFormGroup3.value.cat_id,
      "sub_category" : this.HFormGroup3.value.test_id.toString(),
      "lab_id" : this.user_id,
    }

    this.user_id = this.authService.currentUserValue.userid;
    this.token = this.authService.currentUserValue.token;
    this.patientServiceService.categoryList(data).subscribe(

      (result) => {
        if (result.status_code == 200) {
          setTimeout(() => {
            this.router.navigate(['/doctor/visits-page']);
          }, 500);

          Swal.fire(
            '',
            'New Visit Created successfully!',
            'success'
          )

        }

       

      },
      (err) => {
        Swal.fire(
          '',
          err.message,
          'error'
        )
      });
  }

  radioChange(event: MatRadioChange) {
    this.member_id = event.value;
  }

}