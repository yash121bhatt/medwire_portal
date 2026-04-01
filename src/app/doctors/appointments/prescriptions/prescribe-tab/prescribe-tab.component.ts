import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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
import { AuthService } from "src/app/core/service/auth.service";
import { DoctorServiceService } from 'src/app/services/doctor-service.service';
import Swal from 'sweetalert2';

/**
 * @title Chips Autocomplete
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
    description: "Joint Pain, Weight Loss, Weight Gain",
    followup: "7 days",
    actions: " ",
  },
  {
    no: 2,
    patient: "Sarah Corner",
    appointment_date: "12/10/2022 18:40 PM",
    description: "Lymphadenopathy, Facial Rash, weakness",
    followup: "15 days",
    actions: " ",
  },
  {
    no: 3,
    patient: "Sarah Corner",
    appointment_date: "12/10/2022 18:40 PM",
    description: "Positive for fatigue, traumatic injury, loss of sensation",
    followup: "20 days",
    actions: " ",
  },
  
  
];
@Component({
  selector: 'app-prescribe-tab',
  templateUrl: './prescribe-tab.component.html',
  styleUrls: ['./prescribe-tab.component.sass']
})
export class PrescribeTabComponent implements OnInit {
  //mat-tablle-filter
  @ViewChild('empTbSort') empTbSort = new MatSort();
  sort: MatSort;
  urlparameter: any;
  cancelbtnClientId: any;
  ngAfterViewInit() {
    this.dataSource3.sort = this.empTbSort;
  }
  separatorKeysCodes: number[] = [ENTER, COMMA];
 healthstatCtrl = new FormControl('');
  filteredHealthstats: Observable<string[]>;
  healthstats: string[] = [];
  allHealthstats: string[] = ['Joint Pain', 'Weight Loss', 'Weight Gain', 'Fever', 'Cold', 'Night Sweats', 'Early Satiety', 'Dry eye', 'Wet eye', 'Dry mouth', 'Wet mouth', 'Headaches', 'Headaches with lightheadedness', 'nausea', 'Lymphadenopathy', 'Facial Rash', 'weakness', 'decreased RBC', 'decreased Hemoglobin', 'increase RBC', 'increase Hemoglobin', 'no wheezes in lungs ', 'no crackles in lungs', ' No pallor', 'hair loss', 'dry or brittle nails', 'Positive for fatigue', 'traumatic injury', 'loss of sensation', 'No changes to hearing' , 'discharge from ear' ];

  @ViewChild('healthstatInput') healthstatInput: ElementRef<HTMLInputElement>;
  displayedColumns: string[] = [
    "no",
    "patient",
    "appointment_date",
    "description",
    "followup",
    "actions",
  ];
  dataSource = ELEMENT_DATA;
  dataSource2 = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource3 = new MatTableDataSource(ELEMENT_DATA);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  } 
  prescribeTabForm: FormGroup;
  submitted = false;
  returnUrl: string;
  public Editor = ClassicEditor;

  constructor(
    private fb: FormBuilder,
    private authService : AuthService,
    private doctorServiceService: DoctorServiceService,
    private router : Router,
    private activatedRoute : ActivatedRoute
    ) { 
    this.filteredHealthstats = this.healthstatCtrl.valueChanges.pipe(
      startWith(null),
      map((healthstat: string | null) => (healthstat ? this._filter(healthstat) : this.allHealthstats.slice())),
    );
    this.prescribeTabForm = this.fb.group({
      description: ['',[Validators.maxLength(160)]]
    })
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.healthstats.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.healthstatCtrl.setValue(null);
  }

  remove(healthstat: string): void {
    const index = this.healthstats.indexOf(healthstat);

    if (index >= 0) {
      this.healthstats.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.healthstats.push(event.option.viewValue);
    this.healthstatInput.nativeElement.value = '';
    this.healthstatCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allHealthstats.filter(healthstat => healthstat.toLowerCase().includes(filterValue));
  }
  ngOnInit() {
    this.dataSource3.paginator = this.paginator;
    this.cancelbtnClientId = JSON.parse(localStorage.getItem('clientData'));

  }
  success_message:boolean= false;
  error_message:boolean = false;
  error_message_text:string;
  onSubmit() {
    this.submitted = true;
    const data = {
      "doctor_id": this.authService.currentUserValue.userid,
      "appointment_id":this.activatedRoute.snapshot.paramMap.get('appointment_id'),
      "examination_finding_name":this.prescribeTabForm.value.description
    }
    this.doctorServiceService.addexamination(data).subscribe(
      (result)=>{
        Swal.fire(
          '',
          'Examination Findings Added Successfully',
          'success'
        )
      this.router.navigate(["/doctors/appointments/prescriptions/prescription-tabsthree/"+3+'/'+this.activatedRoute.snapshot.paramMap.get('appointment_id')])
      },
      (err)=>{
        Swal.fire(
          '',
         err,
          'error'
        );
      }
    );
    // console.log('data',  this.healthstats);
  }
  }
