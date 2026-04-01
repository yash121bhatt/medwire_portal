import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators, } from "@angular/forms";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { PatientdataService } from 'src/app/services/patientdata.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.sass']
})
export class AddDoctorComponent implements OnInit {
  private form : FormData;
  doctorForm: FormGroup;
  submitted = false;
  returnUrl: string;
  public selection: string;
  public Editor = ClassicEditor;
  variables3 = [];
  // public variables3 = ['Dr. Arvind Mittal', 'Dr. Abdhesh Tomar', 'DR. R.K. SINGHAL', 'DR. Omeshwar Gupta', 'Dr A.k. Sharma', 'DR. Rustam',];
 
  public filteredList3 = this.variables3.slice();
  dataSource3: any;
  variables2: any;
  filteredList5: any;
  

  constructor(
    private fb: FormBuilder,
    private patientdataService: PatientdataService,
    private authService:AuthService, 
    private route:ActivatedRoute,
    private router : Router,
    
    ) {
      
    this.doctorForm = this.fb.group({
      doctor: ["", [Validators.required]],   
    });
    
  }

  
  ngOnInit(){  
    this.searchDoctor() ;
   
    }
  
  success_message:boolean= false;
  error_message:boolean = false;
  error_message_text:string;

  onSubmit() {
    this.submitted = true;
    this.form = new FormData();
    this.form.append('doctor',this.doctorForm.value.doctor);

    let data = {
       user_id : this.doctorForm.value.doctor.id,
       created_by_id : this.authService.currentUserValue.userid
    }


    this.patientdataService.addDoctor(data).subscribe(
      (res)=>{
      if(res.status_code == 200){
        setTimeout(()=> {
          this.router.navigate(['/patient/patient-doctor//doctor-list']);
        }, 600 );

      }
      Swal.fire(
        '',
        res.message,
        'success'
      )
      
    },
    (error)=>{
      Swal.fire(
        '',
        error.message,
        'error'
      )
    })
}


searchDoctor(){
  let data = {
    user_id : this.authService.currentUserValue.userid
  }
  let myData = this.patientdataService.searchDoctor(data).subscribe((res:any)=>{
     //this.variables3 = res.data;
     this.variables2 = res.data;
    // this.filteredList5 =this.variables2.slice();
    // console.log('vasr2', this.variables2);
     this.filteredList3 =this.variables2.slice();

      
  },(error:any)=>{
    console.log(error);
  })
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource3.filter = filterValue.trim().toLowerCase();
}


onKey(value) {
 
  if(value.length!=0){
    console.log('Value Key if',value.length);
    this.filteredList3 = this.search(value);
  }
  else{
    console.log('else ',value.length);
    this.ngOnInit();
  }

    
}

search(value: string) {
  let filter = this.filteredList3.filter(item =>
    item.doctor.toLowerCase().includes(value.toLowerCase())
  );
  return [...filter];
}


}
