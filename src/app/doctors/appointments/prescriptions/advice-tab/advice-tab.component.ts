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
import { AuthService } from 'src/app/core/service/auth.service';
import { DoctorServiceService } from 'src/app/services/doctor-service.service';
import { Router,ActivatedRoute } from '@angular/router';
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
  selector: 'app-advice-tab',
  templateUrl: './advice-tab.component.html',
  styleUrls: ['./advice-tab.component.sass']
})
export class AdviceTabComponent implements OnInit {
  //mat-tablle-filter
  @ViewChild('empTbSort') empTbSort = new MatSort();
  sort: MatSort;
  urlparameter: any;
  cancelbtnClientId: any;
  ngAfterViewInit() {
    this.dataSource3.sort = this.empTbSort;
  }
  separatorKeysCodes: number[] = [ENTER, COMMA];
  adviceCtrl = new FormControl('');
  filteredAdvices: Observable<string[]>;
  advices: string[] = [];
  allAdvices: string[] = ['CBC Test', 'Do exercise', 'Take Ramady'];

  @ViewChild('adviceInput') adviceInput: ElementRef<HTMLInputElement>;
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
  adviceTabForm: FormGroup;
  submitted = false;
  returnUrl: string;
  public Editor = ClassicEditor;

  constructor(
    private fb: FormBuilder,
    private authService : AuthService,
    private doctorServiceService : DoctorServiceService,
    private router : Router,
    private activatedRoute : ActivatedRoute
    ) { 
    this.filteredAdvices = this.adviceCtrl.valueChanges.pipe(
      startWith(null),
      map((advice: string | null) => (advice ? this._filter(advice) : this.allAdvices.slice())),
    );
    this.adviceTabForm = this.fb.group({
      description: ["",[Validators.maxLength(160)]]
    })
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.advices.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.adviceCtrl.setValue(null);
  }

  remove(advice: string): void {
    const index = this.advices.indexOf(advice);

    if (index >= 0) {
      this.advices.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.advices.push(event.option.viewValue);
    this.adviceInput.nativeElement.value = '';
    this.adviceCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allAdvices.filter(advice => advice.toLowerCase().includes(filterValue));
  }


  ngOnInit() {
    this.dataSource3.paginator = this.paginator;
    this.cancelbtnClientId = JSON.parse(localStorage.getItem('clientData'));
  }


  success_message:boolean= false;
  error_message:boolean = false;
  error_message_text:string;


  onSubmit() {
   
    const data ={
      "doctor_id": this.authService.currentUserValue.userid,
      "appointment_id":this.activatedRoute.snapshot.paramMap.get('appointment_id'),
      "advices": this.adviceTabForm.value.description
    }
  
    this.doctorServiceService.addAdvice(data).subscribe(
      (result)=>{
        Swal.fire(
          '',
          result.message,
          'success'
        );
        this.router.navigate(["/doctors/appointments/prescriptions/prescription-tabsfive/"+5+'/'+this.activatedRoute.snapshot.paramMap.get('appointment_id')])
      },
      (err)=>{
        Swal.fire(
          '',
         err,
          'error'
        );
      }
    );
    this.submitted = true;
  }

  }

