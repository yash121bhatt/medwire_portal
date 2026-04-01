import { Component, Input, OnInit } from '@angular/core';
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PatientServiceService } from 'src/app/services/patient-service.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-history-notepad',
  templateUrl: './edit-history-notepad.component.html',
  styleUrls: ['./edit-history-notepad.component.sass']
})
export class EditHistoryNotepadComponent {

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
  descriptionEdit: string;

  constructor(
    private fb: FormBuilder,
    private patientServiceService: PatientServiceService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.editHistoryForm = this.fb.group({
     // created_date: ["", [Validators.required]],
      description: ["", [Validators.required]],

    });

   this.descriptionEdit =  this.route.snapshot.paramMap.get('description');
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
      "type": "current_medication",
      "description": this.editHistoryForm.value.description,
      "created_date": '',
      "hn_id":  this.route.snapshot.paramMap.get('hnid'),

    }
    this.user_id = this.authService.currentUserValue.userid;
    this.token = this.authService.currentUserValue.token;
    this.patientServiceService.edithistoryNotepad(data).subscribe(
      (result: any) => {
        this.result = result.data;
        if (result.status_code == 200) {
          setTimeout(() => {
            this.router.navigate(['/patient/currentmedilist/' + this.route.snapshot.paramMap.get('type')]);
          }, 1000);

        }
        Swal.fire(
          '',
          result.message,
          'success'
        )

      },
      (err) => {
      
        Swal.fire(
          '',
          err.message,
          'error'
        )
      });
  }
  

}
