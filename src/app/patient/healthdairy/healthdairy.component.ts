import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import Swal from 'sweetalert2';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-healthdairy',
  templateUrl: './healthdairy.component.html',
  styleUrls: ['./healthdairy.component.sass']
})
export class HealthdairyComponent {
  healthdairyForm: FormGroup;
  public Editor = ClassicEditor;
  user_id: any;
  description:any;
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
    this.healthdairyForm = this.fb.group({
      created_date: [""],
      description: ["", [Validators.required]],
    });

    this.memberID = this.route.snapshot.paramMap.get('type');
    
  }


  onSubmit(data: any) {

    const historyData = {
      "user_id": this.authService.currentUserValue.userid,
      "member_id": atob(this.route.snapshot.paramMap.get('type')),
      "type": "personal_health_dairy",
      "description": this.healthdairyForm.value.description,
      "created_date": this.yearMonthValue,

    };

    this.user_id = this.authService.currentUserValue.userid;
    this.patientServiceService.addHistoryNotepad(historyData).subscribe(
      (result) => {
        console.log(result.data)
        if (result.status_code == 200) {
          setTimeout(() => {
            this.router.navigate(['/patient/healthdiarylist/' + this.route.snapshot.paramMap.get('type')]);
          }, 1000);

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
      });
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

}