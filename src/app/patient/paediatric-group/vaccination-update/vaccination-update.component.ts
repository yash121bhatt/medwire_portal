//import { Component, OnInit } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
import { ActivatedRoute ,Router} from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { PatientdataService } from 'src/app/services/patientdata.service';


@Component({
  selector: 'app-vaccination-update',
  templateUrl: './vaccination-update.component.html',
  styleUrls: ['./vaccination-update.component.sass']
})
export class VaccinationUpdateComponent implements OnInit {
  labreportForm: FormGroup;
  deleteId: number;
  submitted = false;
  private form : FormData;
  maxDate = new Date();
  
  constructor(
    private fb: FormBuilder,
    private authService : AuthService,
    private patientdataService : PatientdataService,
    private router : Router,
    private route:ActivatedRoute,
  ) { }

 


  ngOnInit(): void {
    this.labreportForm = this.fb.group({
      dose_date: ["", [Validators.required]],
    });
  }

 


  onSubmit(fData: any,formDirective: FormGroupDirective) {

    //console.log("Form Value", this.labreportForm.value);
    this.submitted = true;

    if (this.labreportForm.invalid) {
      return;
    } else {
      this.form = new FormData();
      this.form.append('user_id',this.authService.currentUserValue.userid);
      this.form.append('member_id',this.route.snapshot.paramMap.get('type'));
      this.form.append('document_title',this.labreportForm.value.docname);
      this.form.append('document_date',this.labreportForm.value.dob);
      this.form.append('type','lab_report');
    
      this.patientdataService.documentAdd(this.form).subscribe (
        (result) => {
          if(result.status_code == 200){
            setTimeout(()=> {
              formDirective.resetForm();
              this.labreportForm.reset();
             
             // this.router.navigate(["/patient/lab-m-report/"+this.route.snapshot.paramMap.get('type')]);
              this.ngOnInit();
            }, 300 );
  
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

}
