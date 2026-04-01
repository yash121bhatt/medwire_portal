import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.sass']
})
export class EditCategoryComponent implements OnInit {

  editcategorytForm: FormGroup;
  submitted = false;
  returnUrl: string;
  public selection: string;
  user_id: any;
  category_name: any;
  urlparameter: string;

  constructor(
    private fb: FormBuilder,
    private patientServiceService: PatientServiceService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.editcategorytForm = this.fb.group({
      category_name: [""],

    });

  }
  ngOnInit(): void {
    this.urlparameter = this.route.snapshot.paramMap.get('catid');
    this.user_id = this.authService.currentUserValue.userid;

    const data = {
      'lab_id': this.user_id,
      "cat_id": this.route.snapshot.paramMap.get('catid'),
    }
    // console.log('test list =' ,data1);
    this.patientServiceService.singleCategory(data).subscribe(
      (result) => {
        // console.log('Single Category =',result);
        let test = result.message[0];
        // console.log("test-- ", test);
        this.category_name = test.category_name;
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
    // console.log("Form Value", this.editcategorytForm.value);
    this.urlparameter = this.route.snapshot.paramMap.get('catid')
    this.user_id = this.authService.currentUserValue.userid;

    const categoryEdit = {
      'lab_id': this.user_id,
      "cat_id": this.route.snapshot.paramMap.get('catid'),
      "category_name": this.editcategorytForm.value.category_name,
    }

    // console.log('edit =', categoryEdit);

    this.patientServiceService.editCategory(categoryEdit).subscribe(
      (result) => {
        // console.log(result);

        setTimeout(() => {
          // this.router.navigate(['/doctor/laboratory-items/category-list']){
          //   // window.location.reload();
          // });
          this.router.navigate(['/doctor/laboratory-items/category-list']);
        }, 600);
        Swal.fire(
          '',
           'Category edited successfully.',
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
