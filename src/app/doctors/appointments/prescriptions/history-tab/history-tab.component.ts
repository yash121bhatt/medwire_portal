import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import { MatAutocompleteActivatedEvent, MatAutocompleteTrigger, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'src/app/core/service/auth.service';
import { DoctorServiceService } from 'src/app/services/doctor-service.service';
import Swal from 'sweetalert2';

/**
 * @title Basic chips
 */
 export interface PeriodicElement {
  no: number;
  patient: string;
  appointment_date: string;
  description: string;
  followup: string;
  actions: any;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {
    no: 1,
    patient: "Sarah Corner",
    appointment_date: "12/10/2022 18:40 PM",
    description: "Now you can book your appointment online Cunsultant too.",
    followup: "7 days",
    actions: " ",
  },
  {
    no: 2,
    patient: "Sarah Corner",
    appointment_date: "12/10/2022 18:40 PM",
    description: "As Per Concern, taste is important",
    followup: "15 days",
    actions: " ",
  },
  {
    no: 3,
    patient: "Sarah Corner",
    appointment_date: "12/10/2022 18:40 PM",
    description: "As Per Concern, taste is important",
    followup: "20 days",
    actions: " ",
  },
  
  
];
@Component({
  selector: 'app-history-tab',
  templateUrl: './history-tab.component.html',
  styleUrls: ['./history-tab.component.sass']
})
export class HistoryTabComponent implements OnInit {
 //mat-tablle-filter
 @ViewChild('empTbSort') empTbSort = new MatSort();
 sort: MatSort;
 urlparameter: any;
 ngAfterViewInit() {
   this.dataSource3.sort = this.empTbSort;
 }
 public Editor = ClassicEditor;
 prescribeTabForm: FormGroup;
 variantsArray: FormArray;
 submitted: boolean;
 form = this.fb.group({
   chief_variants: this.fb.array([]),
   presentation_variants: this.fb.array([]),
   past_medical_variants: this.fb.array([]),
   alergy_variants: this.fb.array([]),
   parenthistory_variants: this.fb.array([]),
   addictionhistory_variants: this.fb.array([]),
   menstrualobs_variants: this.fb.array([]),
});
displayedColumns: string[] = [
 "no",
 "patient",
 "appointment_date",
 "description",
 "followup",
 // "actions",
];
dataSource = ELEMENT_DATA;
dataSource2 = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
dataSource3 = new MatTableDataSource(ELEMENT_DATA);
applyFilter(event: Event) {
 const filterValue = (event.target as HTMLInputElement).value;
 this.dataSource3.filter = filterValue.trim().toLowerCase();
} 
 constructor(private fb: FormBuilder,
  private router : Router,
    private activatedRoute : ActivatedRoute,
    private authService : AuthService,
    private doctorServiceService : DoctorServiceService,) {
 }

 ngOnInit() {
   this.prescribeTabForm = this.fb.group({
     chief_variants: this.fb.array([
       this.fb.group({
         duration: '',
         chief_complaint: ''
       })
     ]),
     presentation_variants: this.fb.array([
       this.fb.group({
         duration: '',
         presentation_illness: ''
       })
     ]),
     past_medical_variants: this.fb.array([
       this.fb.group({
         duration: '',
         past_medical: ''
       })
     ]),
     alergy_variants: this.fb.array([
       this.fb.group({
         duration: '',
         alergy: ''
       })
     ]),
     parenthistory_variants: this.fb.array([
       this.fb.group({
         duration: '',
         parent_history: ''
       })
     ]),
     addictionhistory_variants: this.fb.array([
       this.fb.group({
         duration: '',
         addiction_history: ''
       })
     ]),
     menstrualobs_variants: this.fb.array([
       this.fb.group({
         duration: '',
         menstrual_obs: ''
       })
     ]),
   });
   
 }
 saveProduct(form: FormGroup) {
 }

 // Add new item to FormArray
 addItem(): void {
   this.variantsArray = this.prescribeTabForm.get('chief_variants') as FormArray;
   this.variantsArray.push(this.fb.group({
     duration: '',
     chief_complaint: ''
   }));
 }
 addItem2(): void {
   this.variantsArray = this.prescribeTabForm.get('presentation_variants') as FormArray;
   this.variantsArray.push(this.fb.group({
     duration: '',
     presentation_illness: ''
   }));
 }
 addItem3(): void {
   this.variantsArray = this.prescribeTabForm.get('past_medical_variants') as FormArray;
   this.variantsArray.push(this.fb.group({
     duration: '',
     past_medical: ''
   }));
 }
 addItem4(): void {
   this.variantsArray = this.prescribeTabForm.get('alergy_variants') as FormArray;
   this.variantsArray.push(this.fb.group({
     duration: '',
     alergy: ''
   }));
 }
 addItem5(): void {
   this.variantsArray = this.prescribeTabForm.get('parenthistory_variants') as FormArray;
   this.variantsArray.push(this.fb.group({
     duration: '',
     parent_history: ''
   }));
 }
 addItem6(): void {
   this.variantsArray = this.prescribeTabForm.get('addictionhistory_variants') as FormArray;
   this.variantsArray.push(this.fb.group({
     duration: '',
     addiction_history: ''
   }));
 }
 addItem7(): void {
   this.variantsArray = this.prescribeTabForm.get('menstrualobs_variants') as FormArray;
   this.variantsArray.push(this.fb.group({
     duration: '',
     menstrual_obs: ''
   }));
 }

 removeItem(index: number) {
   this.variantsArray = this.prescribeTabForm.get('chief_variants') as FormArray;
   this.variantsArray.removeAt(index);
 };
 removeItem2(index: number) {
   this.variantsArray = this.prescribeTabForm.get('presentation_variants') as FormArray;
   this.variantsArray.removeAt(index);
 }
 removeItem3(index: number) {
   this.variantsArray = this.prescribeTabForm.get('past_medical_variants') as FormArray;
   this.variantsArray.removeAt(index);
 }
 removeItem4(index: number) {
   this.variantsArray = this.prescribeTabForm.get('alergy_variants') as FormArray;
   this.variantsArray.removeAt(index);
 }
 removeItem5(index: number) {
   this.variantsArray = this.prescribeTabForm.get('parenthistory_variants') as FormArray;
   this.variantsArray.removeAt(index);
 }
 removeItem6(index: number) {
   this.variantsArray = this.prescribeTabForm.get('addictionhistory_variants') as FormArray;
   this.variantsArray.removeAt(index);
 }
 removeItem7(index: number) {
   this.variantsArray = this.prescribeTabForm.get('menstrualobs_variants') as FormArray;
   this.variantsArray.removeAt(index);
 }
 onSubmit($event) {
 
   this.submitted = true;
  //  console.log(this.prescribeTabForm.value)
   var  finalarraySubmit = [];
   
   for(let i = 0; i< 1 ; i++){
      let  data = {
        "doctor_id": this.authService.currentUserValue.userid,
        "appointment_id":this.activatedRoute.snapshot.paramMap.get('appointment_id'),
        "source":[this.prescribeTabForm.value.chief_variants[i].chief_complaint],
        "type":"chief_complaint",
        "duration":null
      }

      finalarraySubmit.push(data);
   }

   for(let i = 0; i< 1 ; i++){
    let  data = {
      "doctor_id": this.authService.currentUserValue.userid,
      "appointment_id":this.activatedRoute.snapshot.paramMap.get('appointment_id'),
      "source":[this.prescribeTabForm.value.addictionhistory_variants[i].addiction_history],
      "type":"addiction_history",
      "duration":null
    }

    finalarraySubmit.push(data);
 }

 for(let i = 0; i< 1 ; i++){
  let  data = {
    "doctor_id": this.authService.currentUserValue.userid,
    "appointment_id":this.activatedRoute.snapshot.paramMap.get('appointment_id'),
    "source":[this.prescribeTabForm.value.alergy_variants[i].alergy],
    "type":"alergy",
    "duration":null
  }

  finalarraySubmit.push(data);
}

for(let i = 0; i< 1 ; i++){
  let  data = {
    "doctor_id": this.authService.currentUserValue.userid,
    "appointment_id":this.activatedRoute.snapshot.paramMap.get('appointment_id'),
    "source":[this.prescribeTabForm.value.menstrualobs_variants[i].menstrual_obs],
    "type":"menstrual",
    "duration":null
  }

  finalarraySubmit.push(data);
}

for(let i = 0; i< 1 ; i++){
  let  data = {
    "doctor_id": this.authService.currentUserValue.userid,
    "appointment_id":this.activatedRoute.snapshot.paramMap.get('appointment_id'),
    "source":[this.prescribeTabForm.value.parenthistory_variants[i].parent_history],
    "type":"parent_history",
    "duration":null
  }

  finalarraySubmit.push(data);
}

for(let i = 0; i< 1 ; i++){
  let  data = {
    "doctor_id": this.authService.currentUserValue.userid,
    "appointment_id":this.activatedRoute.snapshot.paramMap.get('appointment_id'),
    "source":[this.prescribeTabForm.value.past_medical_variants[i].past_medical],
    "type":"past_medical_history",
    "duration":null
  }

  finalarraySubmit.push(data);
}

for(let i = 0; i< 1 ; i++){
  let  data = {
    "doctor_id": this.authService.currentUserValue.userid,
    "appointment_id":this.activatedRoute.snapshot.paramMap.get('appointment_id'),
    "source":[this.prescribeTabForm.value.presentation_variants[i].presentation_illness],
    "type":"illness",
    "duration":null
  }

  finalarraySubmit.push(data);
}

   this.doctorServiceService.addSymptomes(finalarraySubmit).subscribe(
    (result)=>{
      Swal.fire(
        '',
        result.message,
        'success'
      );
      this.router.navigate(["/doctors/appointments/prescriptions/prescription-tabsone/"+1+'/'+this.activatedRoute.snapshot.paramMap.get('appointment_id')]);
    },
    (err)=>{
      Swal.fire(
        '',
       err,
        'error'
      );
    }
  );
   
  }


 
 

}
