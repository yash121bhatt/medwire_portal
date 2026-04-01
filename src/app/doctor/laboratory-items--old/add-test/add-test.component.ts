import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators, } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { AuthService } from 'src/app/core/service/auth.service';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import Swal from 'sweetalert2';
// import { CKEditorModule } from "@ckeditor/ckeditor5-angular";

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.sass']
})
export class AddTestComponent implements OnInit {
  private form : FormData;
  addtestForm: FormGroup;
  submitted = false;
  returnUrl: string;
  public selection: string;
  public Editor = ClassicEditor;

  public variables = ['Adrenal Function Test','Allergy Testing','Allergy Testing', 'Anemia Profiles', 'Body Minerals Test', 'Bone Profile Blood Test', 'Cancer Testing', 'Cardiac Testing', 'Coagulation Tests', 'Covid Monitoring Test', 'Diabetes Test','Doctor Prescribed Tests', 'Discount Panels', 'Drug and Alcohol Tests', 'Exposure Tests', 'Heart Health Tests', 'Home Test Kits', 'Hormone Tests', 'Immunity Tests', 'Infectious Disease Tests', 'Kidney Tests', 'Eye Care Test', 'Liver Tests', 'STD Tests', 'Men Specific Tests', 'Stress and Fatigue Tests', 'Thyroid Tests', 'Vitamin, Mineral & Nutrition Tests', 'Wellness Panels', 'Women Specific Tests'];
  
  public filteredList2 = this.variables.slice();
  user_id: any;
  image: any;
  accept: string =".jpeg,.png,.jpg";
  urlparameter: any;
  cat_id: string | Blob;


  constructor(
    private fb: FormBuilder,
    private patientServiceService : PatientServiceService,
    private authService : AuthService,
    private router: Router,
    private route: ActivatedRoute,
    ) {
    this.addtestForm = this.fb.group({
      test_name: ["", [Validators.required]],
      test_report: ["", [Validators.required]],
      fast_time: ["", [Validators.required]],
      test_recommended: ["", [Validators.required]],
      description: ["", [Validators.required]],
      amount: ["", [Validators.required]],
      cat_id: ["", [Validators.required]],
      image: [""],
    });
    
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
            console.log(result.data);
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

  onSubmit() {
    this.submitted = true;
    console.log("Form Value", this.addtestForm.value);
    this.user_id = this.authService.currentUserValue.userid;
    this.urlparameter = this.route.snapshot.paramMap.get('catid')

    this.form = new FormData();
   
    // this.form.append('cat_id', this.route.snapshot.paramMap.get('catid'));
    this.form.append("test_category_id" ,this.addtestForm.value.cat_id);
    this.form.append('lab_id', this.user_id);
    this.form.append("test_name" ,this.addtestForm.value.test_name);
    this.form.append("test_report" , this.addtestForm.value.test_report);
    this.form.append("fast_time" , this.addtestForm.value.fast_time);
    this.form.append("test_recommended" , this.addtestForm.value.test_recommended);
    this.form.append("amount" , this.addtestForm.value.amount);
    this.form.append("description" , this.addtestForm.value.description);
    this.form.append("image" , this.image);


    this.patientServiceService.addTest(this.form).subscribe (
      (result) => {
        if(result.status_code == 200){
          setTimeout(()=> {
            this.router.navigate(['/doctor/laboratory-items/test-list']);
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
