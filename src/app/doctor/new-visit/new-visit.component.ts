import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatStepperModule } from "@angular/material/stepper";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import Swal from 'sweetalert2';


interface Category {
  shortName: string;
  name: string;
}

@Component({
  selector: 'app-new-visit',
  templateUrl: './new-visit.component.html',
  styleUrls: ['./new-visit.component.sass']
})
export class NewVisitComponent implements OnInit {
  selectedStatus:  number ;  
  eventEditForm: FormGroup;
  public toggleForm:boolean;

  isLinear = false;
  HFormGroup1: FormGroup;
  HFormGroup2: FormGroup;
  HFormGroup3: FormGroup;
  patientForm: any;
  fb: any;

  categories:  [
    {
      "name" : "Blood Test"
    },
  ];
  subcategories: string[];

  // country = new FormControl(null, [Validators.required]);
  // state = new FormControl({ value: null, disabled: true }, [
  //   Validators.required,
  // ]);
  form: FormGroup;
  category: any;
  subcategory :any;
  user_id: number;
  token: string;
  first_name:any;

  constructor(
    private _formBuilder: FormBuilder,
    private patientServiceService: PatientServiceService,
    private authService: AuthService,
    private router: Router
    ) {
    
  }
  ngOnInit() {
    this.HFormGroup1 = this._formBuilder.group({
      mobile: ["", [Validators.required, Validators.pattern("[6789][0-9]{9}"), Number]],
    });
    this.HFormGroup2 = this._formBuilder.group({
      completed: ["", Validators.required],
    });
    this.HFormGroup3 = this._formBuilder.group({
      category: ["", Validators.required],
      subcategory: ["", Validators.required],
    });


    this.eventEditForm = new FormGroup({          
      'completed': new FormControl()
      });      
    this.selectedStatus = 1;
  }



  onSubmit (_data:any){
   
      const formData = {
        "mobile": this.HFormGroup1.value.mobile,

      }

    

      this.user_id = this.authService.currentUserValue.userid;
      this.token = this.authService.currentUserValue.token;
      this.patientServiceService.memberSearch(formData).subscribe(
        (result) => {
          
          if(result.status_code == 200){
            localStorage.removeItem("patientMobileno");
            localStorage.setItem("patientMobileno",this.HFormGroup1.value.mobile);
            this.router.navigate(["/doctor/patient-list-step"]);

            if(result.parentuser.length == 0){
              Swal.fire(
                '',
                'User not found!',
                'error'
              )
            }
            // else{
            //   Swal.fire(
            //     '',
            //     'Search Successfully !',
            //     'success'
            //   )
            // }
          }
         

        },
        (err) => {
          console.log(err);
          Swal.fire(
            '',
            err,
            'error'
          )
        });
  }

}