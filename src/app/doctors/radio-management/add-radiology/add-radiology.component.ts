import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators, } from "@angular/forms";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { DoctorServiceService } from 'src/app/services/doctor-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-radiology',
  templateUrl: './add-radiology.component.html',
  styleUrls: ['./add-radiology.component.sass']
})
export class AddRadiologyComponent implements OnInit {
  radiologyForm: FormGroup;
  submitted = false;
  returnUrl: string;
  public selection: string;
  public Editor = ClassicEditor;
  public variables = [];
  public filteredList2 = this.variables.slice();
  doctor_id: string;


  constructor(
    private fb: FormBuilder,
    private doctorService:DoctorServiceService,
    private router : Router,
    private authService:AuthService,
    private route:ActivatedRoute,
    ) {
    this.radiologyForm = this.fb.group({
      laboratory_name: ["", [Validators.required]],   
    });
    
  }

  ngOnInit(){
    this.doctor_id = this.route.snapshot.paramMap.get('id');
    this.labRadioList();
  }

  success_message:boolean= false;
  error_message:boolean = false;
  error_message_text:string;
  onSubmit() {
    this.submitted = true;
    this.radiologyForm.value.laboratory_name
    // console.log( this.radiologyForm.value.laboratory_name);
    
    const data = {
      doctor_id : this.authService.currentUserValue.userid,
      user_ids : this.radiologyForm.value.laboratory_name
      // doctor_id : this.route.snapshot.paramMap.get('id'),
      // doctor_name:this.radiologyForm.value.doctor_name
    }
    this.doctorService.addLabRadio(data).subscribe((res:any)=>{
      // console.log(res);
      if(res.status_code == 200){
        setTimeout(()=> {
          this.router.navigate(['/doctors/radio-management/radiology-list']);
        }, 600 );

        Swal.fire(
          '',
          res.message,
          'success'
        )
      }
    },(error:any)=>{
      console.log(error);
      Swal.fire(
        '',
        error.message,
        'error'
      )
      
    })
}

 
 labRadioList(){
  const data = {
    // doctor_id : this.route.snapshot.paramMap.get('id'),
    doctor_id : this.authService.currentUserValue.userid,
    role_id : 4
  }
  this.doctorService.labRadioList(data).subscribe((res:any)=>{
    // console.log(res);
    this.filteredList2 = res.data;
    // console.log(this.filteredList2);
  },(error:any)=>{
    // console.log(error);

  })
}


onKey(value) {
 
  if(value.length!=0){
    this.filteredList2 = this.search(value);
  }
  else{
    console.log('else ',value.length);
    this.ngOnInit();
  }

    
}

search(value: string) {

  
  let filter = this.filteredList2.filter(item =>
    item.first_name.toLowerCase().includes(value.toLowerCase())
  );

  console.log(...filter);
  return [...filter];
}



}
