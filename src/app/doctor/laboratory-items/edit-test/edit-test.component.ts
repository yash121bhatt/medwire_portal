import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators, } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { AuthService } from 'src/app/core/service/auth.service';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-test',
  templateUrl: './edit-test.component.html',
  styleUrls: ['./edit-test.component.sass']
})
export class EditTestComponent implements OnInit {
  private form: FormData;
  edittestForm: FormGroup;
  submitted = false;
  returnUrl: string;
  public selection: string;
  public Editor = ClassicEditor;

  public variables = ['Adrenal Function Test', 'Allergy Testing', 'Allergy Testing', 'Anemia Profiles', 'Body Minerals Test', 'Bone Profile Blood Test', 'Cancer Testing', 'Cardiac Testing', 'Coagulation Tests', 'Covid Monitoring Test', 'Diabetes Test', 'Doctor Prescribed Tests', 'Discount Panels', 'Drug and Alcohol Tests', 'Exposure Tests', 'Heart Health Tests', 'Home Test Kits', 'Hormone Tests', 'Immunity Tests', 'Infectious Disease Tests', 'Kidney Tests', 'Eye Care Test', 'Liver Tests', 'STD Tests', 'Men Specific Tests', 'Stress and Fatigue Tests', 'Thyroid Tests', 'Vitamin, Mineral & Nutrition Tests', 'Wellness Panels', 'Women Specific Tests'];

  public filteredList2 = this.variables.slice();
  user_id: string | Blob;
  image: any;
  urlparameter: string;
  accept: string = ".jpeg,.png,.jpg";
  test_name: any;
  category_name: any;
  test_recommended: string;
  test_id: any;
  test_report: any;
  amount: any;
  description: any;
  fast_time: any;
  category_id: any;
  imageURL = `${environment.labDocumentUrl}`;
  images: any;

  constructor(
    private fb: FormBuilder,
    private patientServiceService: PatientServiceService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.edittestForm = this.fb.group({
      test_name: [""],
      test_report: [""],
      fast_time: [""],
      test_recommended: [""],
      description: [""],
      amount: [""],
      cat_id: [""],
      image: [""],
    });

  }
  ngOnInit(): void {
    //Category Api
    this.user_id = this.authService.currentUserValue.userid;
    const data = {
      "lab_id": this.user_id,
    }
    this.patientServiceService.labcategoryList(data).subscribe(
      (result: any) => {
        this.filteredList2 = result.data;
        // console.log(result.data);
      },

      (err) => {
        console.log(err);
      }
    );


    this.urlparameter = this.route.snapshot.paramMap.get('testId');
    this.user_id = this.authService.currentUserValue.userid;

    const data1 = {
      'lab_id': this.user_id,
      "test_id": this.route.snapshot.paramMap.get('testId'),
    }
    // console.log('test list =' , data1)
    this.patientServiceService.singleTest(data1).subscribe(
      (result) => {
        let test = result.data[0];
        // console.log("test-- ", test);
        this.amount = test.amount;
        this.description = test.description;
        this.fast_time = test.fast_time;
        this.test_recommended = test.test_recommended;
        this.test_report = test.test_report;
        this.test_name = test.test_name;
        this.image = test.image;
        this.images = test.images;
        this.category_name = test.category_name;
        this.category_id = test.test_category_id;

      },
      (err) => {
        console.log(err);
      }
    );
  }
  success_message: boolean = false;
  error_message: boolean = false;
  error_message_text: string;


  async fileChange($event) {
    this.image = null;
    if ($event && $event.length) {
      this.image = $event[0];
    }
  }

  onSubmit() {
    this.submitted = true;
    // console.log("Form Value", this.edittestForm.value);
    this.user_id = this.authService.currentUserValue.userid;
    this.urlparameter = this.route.snapshot.paramMap.get('testId')

    this.form = new FormData();

    // this.form.append('cat_id', this.route.snapshot.paramMap.get('catid'));
    this.form.append("test_id", this.route.snapshot.paramMap.get('testId'));
    this.form.append("test_category_id", this.edittestForm.value.cat_id);
    this.form.append('lab_id', this.user_id);
    this.form.append("test_name", this.edittestForm.value.test_name);
    this.form.append("test_report", this.edittestForm.value.test_report);
    this.form.append("fast_time", this.edittestForm.value.fast_time);
    this.form.append("test_recommended", this.edittestForm.value.test_recommended);
    this.form.append("amount", this.edittestForm.value.amount);
    this.form.append("description", this.edittestForm.value.description);
    this.form.append("image", this.image);
    this.form.append("role_id" , '3');


    this.patientServiceService.editTest(this.form).subscribe(
      (result) => {
        if (result.status_code == 200) {
          setTimeout(() => {
            this.router.navigate(['/doctor/laboratory-items/test-list']);
          }, 600);

        }
        Swal.fire(
          '',
          'Test edited successfully.',
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
      });
  }
}
