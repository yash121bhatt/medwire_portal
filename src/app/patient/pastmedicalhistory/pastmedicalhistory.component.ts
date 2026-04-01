import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { PatientServiceService } from 'src/app/services/patient-service.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as moment from 'moment';
@Component({
  selector: 'app-pastmedicalhistory',
  templateUrl: './pastmedicalhistory.component.html',
  styleUrls: ['./pastmedicalhistory.component.sass']
})
export class PastmedicalhistoryComponent {
  MedicalForm: FormGroup;
  public Editor = ClassicEditor;
  user_id: number;
  description:string;
  memberID: string;
  currentDate:Date = new Date();
  yearMonthValue: any;
  

  constructor(
    private fb: FormBuilder,
    private patientServiceService : PatientServiceService,
    private authService : AuthService,
    private router : Router,
    private route:ActivatedRoute,
    ) {
    this.MedicalForm = this.fb.group({
      created_date: [""],
      description: ["", [Validators.required]],
    });

    this.memberID = this.route.snapshot.paramMap.get('type');
   }
  
   date = new FormControl();

   monthSelected(event, dp, input) {
     dp.close();
var dateParameter =  event.toString().split(' ');
if(dateParameter[1]=='Jan'){
  input.value  = dateParameter[3]+'/'+ 1;
  this.yearMonthValue =  input.value ;
}
if(dateParameter[1]=='Feb'){
  input.value  = dateParameter[3]+'/'+ 2;
  this.yearMonthValue =  input.value ;
}
if(dateParameter[1]=='Mar'){
  input.value  = dateParameter[3]+'/'+ 3;
  this.yearMonthValue =  input.value ;
}
if(dateParameter[1]=='Apr'){
  input.value  = dateParameter[3]+'/'+ 4;
  this.yearMonthValue =  input.value ;
}
if(dateParameter[1]=='May'){
  input.value  = dateParameter[3]+'/'+ 5;
  this.yearMonthValue =  input.value ;
}
if(dateParameter[1]=='Jun'){
  input.value  = dateParameter[3]+'/'+ 6;
  this.yearMonthValue =  input.value ;
}
if(dateParameter[1]=='Jul'){
  input.value  = dateParameter[3]+'/'+ 7;
  this.yearMonthValue =  input.value ;
}
if(dateParameter[1]=='Aug'){
  input.value  = dateParameter[3]+'/'+ 8;
  this.yearMonthValue =  input.value ;
}
if(dateParameter[1]=='Sept'){
  input.value  = dateParameter[3]+'/'+ 9;
  this.yearMonthValue =  input.value ;
}
if(dateParameter[1]=='Oct'){
  input.value  = dateParameter[3]+'/'+ 10;
  this.yearMonthValue =  input.value ;
}
if(dateParameter[1]=='Nov'){
  input.value  = dateParameter[3]+'/'+ 11;
  this.yearMonthValue =  input.value ;
}
if(dateParameter[1]=='Dec'){
  input.value  = dateParameter[3]+'/'+ 12;
  this.yearMonthValue =  input.value ;
}

console.log()
   //  input.value = event.toISOString().split('-').join('/').substr(0, 7);
   
   }


  onSubmit(_data:any) {
    const date1 = this.MedicalForm.value.created_date;
    
    let date = "" +date1;
    // console.log(typeof(date));
    // return true;
    const historyData = {
      "user_id": this.authService.currentUserValue.userid,
      "member_id":atob(this.route.snapshot.paramMap.get('type')),
      "type" : "medical_history",
      "description" : this.MedicalForm.value.description,
      "created_date" :  this.yearMonthValue
      
    };

    this.user_id = this.authService.currentUserValue.userid;
    this.patientServiceService.addHistoryNotepad(historyData).subscribe (
      (result) => {
        if(result.status_code == 200){
          setTimeout(()=> {
            this.router.navigate(['/patient/pastmedicallist/'+this.route.snapshot.paramMap.get('type')]);
          }, 1000 );

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