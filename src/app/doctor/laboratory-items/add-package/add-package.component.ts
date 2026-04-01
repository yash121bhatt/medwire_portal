import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators, } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { AuthService } from 'src/app/core/service/auth.service';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import Swal from 'sweetalert2';

ClassicEditor.defaultConfig = {
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      '|',
      'bulletedList',
      'numberedList',
      '|',
      'insertTable',
      '|',
      'undo',
      'redo'
    ]
  },
  image: {
    toolbar: [
      'imageStyle:full',
      'imageStyle:side',
      '|',
      'imageTextAlternative'
    ]
  },
  table: {
    contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
  },
  language: 'en'
};



@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.sass']
})
export class AddPackageComponent implements OnInit {

  submitted = false;
  returnUrl: string;
  public selection: string;
  public Editor = ClassicEditor;
  public loading: boolean = false;

  public variables = ['Adrenal Function Test','Allergy Testing','Allergy Testing', 'Anemia Profiles', 'Body Minerals Test', 'Bone Profile Blood Test', 'Cancer Testing', 'Cardiac Testing', 'Coagulation Tests', 'Covid Monitoring Test', 'Diabetes Test','Doctor Prescribed Tests', 'Discount Panels', 'Drug and Alcohol Tests', 'Exposure Tests', 'Heart Health Tests', 'Home Test Kits', 'Hormone Tests', 'Immunity Tests', 'Infectious Disease Tests', 'Kidney Tests', 'Eye Care Test', 'Liver Tests', 'STD Tests', 'Men Specific Tests', 'Stress and Fatigue Tests', 'Thyroid Tests', 'Vitamin, Mineral & Nutrition Tests', 'Wellness Panels', 'Women Specific Tests'];

  public variables3 = ['2D Echo', '4D Scan', 'Allergy Test', 'Ammonia Test', 'ANC Profile', 'Anti-Mullerian Hormone (AMH) Test', 'ASO Test', 'Biopsy', 'Blood Culture Test', 'Blood Sugar Test', 'Bone Density Test / Dexa Scan', 'Bone Scan', 'Calcium Test', 'CBC / Hemogram Test', 'Chikungunya Test', 'Chlamydia Test', 'Chloride Test', 'Cholesterol Test', 'Color Doppler', 'CT Scan', 'Dengue IgG Test', 'DNA Test', 'ECG',];
  
  public filteredList2 = this.variables.slice();
  public filteredList3 = this.variables3.slice();
  user_id: any;
  urlparameter: any;
  private form : FormData;
  addPackageForm: FormGroup;
  image: string | Blob;
  test_id : [];
  accept: string =".jpeg,.png,.jpg";
  cat_id: any;


  constructor(
    private fb: FormBuilder,
    private patientServiceService : PatientServiceService,
    private authService : AuthService,
    private router: Router,
    private route: ActivatedRoute,
    ) {
    this.addPackageForm = this.fb.group({
      package_name: ["", [Validators.required]],
      test_id: ["", [Validators.required]],
      // test_report_time: ["", [Validators.required]],
      // fasting_time: ["", [Validators.required]],
      test_recommended: ["", [Validators.required]],
      description: ["", [Validators.required]],
      amount: ["", [Validators.required]],
      cat_id: ["", [Validators.required]],
      image: [""],
    });
    
  }

  onSelect(e) {
    // console.log(e.value);
    this.cat_id = e.value;
    this.test()
    // this.subCategories = this.getSubCategory().filter((item) => item.test_name == categoryname.value);

  }
  
  ngOnInit(): void {
    //Category Api
    this.user_id = this.authService.currentUserValue.userid;
    const data = {
      "lab_id" : this.user_id,
    }   
    this.patientServiceService.labcategoryList(data).subscribe(
      (result:any) => {
        this.filteredList2 = result.data;
            // console.log(result.data);
      },
      
      (err) => {
        console.log(err);
      }
    );

    this.test();

    //Test List Api
    this.user_id = this.authService.currentUserValue.userid;
    // this.token = this.authService.currentUserValue.token;
    const data1 = {
      "lab_id" : this.user_id,
    }   
    this.patientServiceService.testList(data1).subscribe(
      (result:any) => {
        this.filteredList3 = result.data;
            // console.log(result.data);
      },
      
      (err) => {
        console.log(err);
      }
    );
  }
  success_message:boolean= false;
  error_message:boolean = false;
  error_message_text:string;


  async fileChange($event){
    this.image = null;
    if($event && $event.length){
      this.image = $event[0];
    }
  }

  test() {
    this.user_id = this.authService.currentUserValue.userid;
    const data1 = {
      "lab_id": this.user_id,
      "cat_id": this.cat_id
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

  onSubmit() {
    this.loading = true;
    // console.log('TEST',this.addPackageForm.value.test_id);
    this.submitted = true;
    // console.log("Form Value", this.addPackageForm.value);
    this.user_id = this.authService.currentUserValue.userid;
    this.urlparameter = this.route.snapshot.paramMap.get('catid')

    this.form = new FormData();
   
    this.form.append("test_category_id" ,this.addPackageForm.value.cat_id);
    this.form.append('lab_id', this.user_id);
    this.form.append("test_id" ,JSON.stringify(this.addPackageForm.value.test_id));
    this.form.append("package_name" , this.addPackageForm.value.package_name);
    this.form.append("test_recommended" , this.addPackageForm.value.test_recommended);
    this.form.append("amount" , this.addPackageForm.value.amount);
    this.form.append("description" , this.addPackageForm.value.description);
    this.form.append("image" , this.image);

    // console.log('test id =' ,this.form);

    this.patientServiceService.addPackage(this.form).subscribe (
      (result) => {
        // console.log(this.form);
        if(result.status_code == 200){
          setTimeout(()=> {
            this.router.navigate(['/doctor/laboratory-items/package-list']);
          }, 600 );

        }
        Swal.fire(
          '',
          result.message,
          'success'
        )
        
      }, 
      (err) => {
        console.log(err);
        Swal.fire(
          '',
          err.message,
          'error'
        )
    } ) ;
  }

}
