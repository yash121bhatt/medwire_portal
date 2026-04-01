import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-package',
  templateUrl: './edit-package.component.html',
  styleUrls: ['./edit-package.component.sass']
})
export class EditPackageComponent implements OnInit {

  submitted = false;
  returnUrl: string;
  public selection: string;
  public Editor = ClassicEditor;

  public variables = ['Adrenal Function Test','Allergy Testing','Allergy Testing', 'Anemia Profiles', 'Body Minerals Test', 'Bone Profile Blood Test', 'Cancer Testing', 'Cardiac Testing', 'Coagulation Tests', 'Covid Monitoring Test', 'Diabetes Test','Doctor Prescribed Tests', 'Discount Panels', 'Drug and Alcohol Tests', 'Exposure Tests', 'Heart Health Tests', 'Home Test Kits', 'Hormone Tests', 'Immunity Tests', 'Infectious Disease Tests', 'Kidney Tests', 'Eye Care Test', 'Liver Tests', 'STD Tests', 'Men Specific Tests', 'Stress and Fatigue Tests', 'Thyroid Tests', 'Vitamin, Mineral & Nutrition Tests', 'Wellness Panels', 'Women Specific Tests'];

  public variables3 = ['2D Echo', '4D Scan', 'Allergy Test', 'Ammonia Test', 'ANC Profile', 'Anti-Mullerian Hormone (AMH) Test', 'ASO Test', 'Biopsy', 'Blood Culture Test', 'Blood Sugar Test', 'Bone Density Test / Dexa Scan', 'Bone Scan', 'Calcium Test', 'CBC / Hemogram Test', 'Chikungunya Test', 'Chlamydia Test', 'Chloride Test', 'Cholesterol Test', 'Color Doppler', 'CT Scan', 'Dengue IgG Test', 'DNA Test', 'ECG',];
  public selectedvariables = [];
  public selectedvariables3 = [];
  public filteredList2 = this.variables.slice();
  public filteredList3 = this.variables3.slice();
  user_id: any;
  urlparameter: any;
  private form : FormData;
  editPackageForm: FormGroup;
  image: string | Blob;
  test_id : any;
  accept: string =".jpeg,.png,.jpg";
  imageURL = `${environment.labDocumentUrl}`;
  images: any;
  package_name: any;
  package_id: string | Blob;
  amount: any;
  description: any;
  test_recommended: any;
  test_name: any;
  category_name: any;
  category_id: any;
  testData: any;
  cat_id: any;
  imageChanged: any;
  onSelect(e) {
    // console.log(e.value);
    this.cat_id = e.value;
    this.test()
    // this.subCategories = this.getSubCategory().filter((item) => item.test_name == categoryname.value);

  }

  constructor(
    private fb: FormBuilder,
    private patientServiceService : PatientServiceService,
    private authService : AuthService,
    private router: Router,
    private route: ActivatedRoute,
    ) {
    this.editPackageForm = this.fb.group({
      package_name: [""],
      test_id: [""],
      // test_report_time: ["", [Validators.required]],
      // fasting_time: ["", [Validators.required]],
      test_recommended: [""],
      description: [""],
      amount: [""],
      cat_id: [""],
      images: [""],
    });
    
  }
  ngOnInit(): void {
    this.test();
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

    //Test List Api
    this.user_id = this.authService.currentUserValue.userid;
    // this.token = this.authService.currentUserValue.token;
    const data1 = {
      "lab_id" : this.user_id,
    }   
    this.patientServiceService.testList(data1).subscribe(
      (result:any) => {
        this.filteredList3 = result.data;
            // console.log('------',result.data);
      },
      
      (err) => {
        console.log(err);
      }
    );

    this.urlparameter = this.route.snapshot.paramMap.get('packageId');
    this.user_id = this.authService.currentUserValue.userid;

    const dataPackage = { 
      'lab_id': this.user_id,
      "package_id":  this.route.snapshot.paramMap.get('packageId'),
    }
    // console.log('test list =' , data1)
    this.patientServiceService.singlePackage(dataPackage).subscribe(
      (result) => {
          let packageTest = result.data[0];
          // console.log("package-- ",packageTest);
          this.amount = packageTest.amount;
          this.description = packageTest.description;
          this.package_name = packageTest.package_name;
          this.test_recommended = packageTest.test_recommended;
          this.test_name = packageTest.test_name;
          this.image = packageTest.image;
          this.images = packageTest.images;
          this.category_name = packageTest.category_name;
          this.category_id = packageTest.test_category_id;
          // this.test_id = packageTest.test_id
          this.test_id = JSON.parse(packageTest.test_id);
          
 // console.log('-----',this.test_id);        
      },
      (err) => {
        console.log(err);
      }
    );
  }

  async fileChange($event){
    this.imageChanged = null;
    if($event && $event.length){
      this.imageChanged = $event[0];
    }
  }

  test() {
    this.user_id = this.authService.currentUserValue.userid;
    const data1 = {
      "lab_id": this.user_id,
      "cat_id": this.cat_id
    }
    this.patientServiceService.testList(data1).subscribe(
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
    this.submitted = true;
    // console.log("Form Value", this.editPackageForm.value);
    this.user_id = this.authService.currentUserValue.userid;
    this.urlparameter = this.route.snapshot.paramMap.get('catid');
    this.urlparameter = this.route.snapshot.paramMap.get('packageId');
    this.urlparameter = this.route.snapshot.paramMap.get('testId');

    this.form = new FormData();
   
    this.form.append("test_category_id" ,this.editPackageForm.value.cat_id);
    this.form.append('lab_id', this.user_id);
    this.form.append("test_id" ,JSON.stringify(this.editPackageForm.value.test_id));
    this.form.append("package_id" , this.route.snapshot.paramMap.get('packageId'));
    this.form.append("package_name" , this.editPackageForm.value.package_name);
    this.form.append("test_recommended" , this.editPackageForm.value.test_recommended);
    this.form.append("amount" , this.editPackageForm.value.amount);
    this.form.append("description" , this.editPackageForm.value.description);
    this.form.append("image" , this.imageChanged);
    // console.log(this.form);
    this.patientServiceService.editPackage(this.form).subscribe (
      (result) => {
        // console.log('=======', result);
        if(result.status_code == 200){
          setTimeout(()=> {
            this.router.navigate(['/doctor/laboratory-items/package-list']);
          }, 600 );

        }
        Swal.fire(
          '',
           'Package edited successfully.',
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
