import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PatientServiceService } from 'src/app/services/patient-service.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

ClassicEditor.defaultConfig = {
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      '|',
      'bulletedList',
      'numberedList',
      '|',
      'insertTable',
      '|',
      'undo',
      'redo'
    ]
  },
  image: {
    toolbar: [
      'imageStyle:full',
      'imageStyle:side',
      '|',
      'imageTextAlternative'
    ]
  },
  table: {
    contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
  },
  language: 'en'
};


@Component({
  selector: 'app-current-medication',
  templateUrl: './current-medication.component.html',
  styleUrls: ['./current-medication.component.sass']
})
export class CurrentMedicationComponent {

  CurrmediForm: FormGroup;
  public Editor = ClassicEditor;
  user_id: number;
  // description: any;
  type: any;
  userid: any;
  description: "<p>{{description}}</p>";
  result: any;
  created_date: string;
  urlparameter: string;

  constructor(
    private fb: FormBuilder,
    private patientServiceService: PatientServiceService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.CurrmediForm = this.fb.group({
     // created_date: ["", [Validators.required]],
      description: ["", [Validators.required]],
    });

    this.urlparameter = this.route.snapshot.paramMap.get('type');
  }

  // data = "";

  // getText() {
  //   return this.description.replace(/<[^>]*>/g, '');
  // }

  // ngOnInit(){
  //   this.data = this.getText();
  // }


  onSubmit(_data: any) {

    const historyData = {
      "user_id": this.authService.currentUserValue.userid,
      "member_id": atob(this.route.snapshot.paramMap.get('type')),
      "type": "current_medication",
      "description": this.CurrmediForm.value.description,
      "created_date": '0000-00-00',

    };

    this.user_id = this.authService.currentUserValue.userid;
    this.patientServiceService.addHistoryNotepad(historyData).subscribe(
      (result) => {
        console.log(result.data)
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
        console.log(err);
        Swal.fire(
          '',
          err.message,
          'error'
        )
      });

    
  }

}