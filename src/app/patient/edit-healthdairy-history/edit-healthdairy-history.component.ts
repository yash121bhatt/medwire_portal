import { Component, Input, OnInit } from '@angular/core';
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { PatientServiceService } from 'src/app/services/patient-service.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-healthdairy-history',
  templateUrl: './edit-healthdairy-history.component.html',
  styleUrls: ['./edit-healthdairy-history.component.sass']
})
export class EditHealthdairyHistoryComponent implements OnInit {

  editHistoryForm: FormGroup;
  public Editor = ClassicEditor;
  public editorData = "loading content";
  
  user_id: number;
  type: any;
  userid: any;
  description: any = '';
  result: any;
  created_date: string;
  token: string;
  urlparameter: string;
  hn_id: any;
  member_id: any;
  Users: any[];
  currentDate : Date = new Date();
  yearMonthValue: string;
  constructor(
    private fb: FormBuilder,
    private patientServiceService: PatientServiceService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.editHistoryForm = this.fb.group({
      created_date: ["", [Validators.required]],
      description: [this.route.snapshot.paramMap.get('description'), [Validators.required]],

    });
  }

  
  @Input() embedSrc: string = this.route.snapshot.paramMap.get('description');

  ngOnInit() {
    this.urlparameter = this.route.snapshot.paramMap.get('type')

    const data = {
      "user_id": this.authService.currentUserValue.userid,
      "member_id": atob(this.route.snapshot.paramMap.get('type')),
      "hn_id": this.route.snapshot.paramMap.get('hnid'),
      
    }
    this.patientServiceService.signlehistoryNotepad(data).subscribe(
      (result) => {
        this.Users = Array(result.data);

        this.hn_id = result.data.hn_id;
        this.member_id = result.data.member_id;
        this.user_id = result.data.user_id;
        this.created_date = result.data.created_date;
        this.description = result.data.description;
        this.editorData = result.data.description;
        this.convertDateFormate( new Date(this.created_date));
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSubmit(_data:any) {

    //Edit History Notepad

    const data = {
      "user_id": this.authService.currentUserValue.userid,
      "member_id": atob(this.route.snapshot.paramMap.get('type')),
      "type": "personal_health_dairy",
      "description": this.editHistoryForm.value.description,
      "created_date": this.editHistoryForm.value.created_date,
      "hn_id":  this.route.snapshot.paramMap.get('hnid'),

    }
 

    this.user_id = this.authService.currentUserValue.userid;
    this.token = this.authService.currentUserValue.token;
    this.patientServiceService.edithistoryNotepad(data).subscribe(
      (result: any) => {
        this.result = result.data;
        if (result.status_code == 200) {
          setTimeout(() => {
            this.router.navigate(['/patient/healthdiarylist/' + this.route.snapshot.paramMap.get('type')]);
          }, 100);

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


  convertDateFormate(date){
   var dateParameter =  date.toString().split(' ');
if(dateParameter[1]=='Jan'){
 this.yearMonthValue = dateParameter[3]+'/'+ 1;
 
}
if(dateParameter[1]=='Feb'){
 this.yearMonthValue = dateParameter[3]+'/'+ 2;
 
}
if(dateParameter[1]=='Mar'){
 this.yearMonthValue  = dateParameter[3]+'/'+ 3;
 
}
if(dateParameter[1]=='Apr'){
 this.yearMonthValue  = dateParameter[3]+'/'+ 4;

}
if(dateParameter[1]=='May'){
 this.yearMonthValue  = dateParameter[3]+'/'+ 5;
 
}
if(dateParameter[1]=='Jun'){
 this.yearMonthValue  = dateParameter[3]+'/'+ 6;

}
if(dateParameter[1]=='Jul'){
 this.yearMonthValue  = dateParameter[3]+'/'+ 7;

}
if(dateParameter[1]=='Aug'){
 this.yearMonthValue  = dateParameter[3]+'/'+ 8;

}
if(dateParameter[1]=='Sept'){
 this.yearMonthValue  = dateParameter[3]+'/'+ 9;
 
}
if(dateParameter[1]=='Oct'){
 this.yearMonthValue  = dateParameter[3]+'/'+ 10;
 
}
if(dateParameter[1]=='Nov'){
 this.yearMonthValue = dateParameter[3]+'/'+ 11;
}
if(dateParameter[1]=='Dec'){
 this.yearMonthValue  = dateParameter[3]+'/'+ 12;

}

  }

}

