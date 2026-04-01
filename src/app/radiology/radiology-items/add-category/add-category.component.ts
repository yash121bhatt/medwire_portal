import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.sass']
})
export class AddCategoryComponent implements OnInit {

  addcategorytForm: FormGroup;
  submitted = false;
  returnUrl: string;
  public selection: string;
  form: FormData;
  user_id: any;
  public loading: boolean = false;
 
  constructor(
    private fb: FormBuilder,
    private patientServiceService : PatientServiceService,
    private authService : AuthService,
    private router: Router,
    ) {
    this.addcategorytForm = this.fb.group({
      category_name: ["", [Validators.required]],
      
    });
    
  }
  ngOnInit(): void {
  }
  success_message:boolean= false;
  error_message:boolean = false;
  error_message_text:string;


  onSubmit(data) {
    this.submitted = true;
    this.loading = true;
    // console.log("Form Value", this.addcategorytForm.value);
    this.user_id = this.authService.currentUserValue.userid;

    const category ={
      'lab_id': this.user_id,
      
      "category_name":this.addcategorytForm.value.category_name,
    }

    // console.log('category =' , category);
    this.patientServiceService.addCategory(category).subscribe (
      (result) => {
        if(result.status_code == 200){
          setTimeout(()=> {
            this.router.navigate(['/radiology/radiology-items/category-list']);
          }, 600 );

        }
        Swal.fire(
          '',
          'Added successfully!',
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

