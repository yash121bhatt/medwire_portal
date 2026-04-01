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
import { ActivatedRoute , Router} from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
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
  drugs_duration: string;
  drugs_timeing: string;
  followup: string;
  actions: any;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {
    no: 1,
    patient: "Sarah Corner",
    appointment_date: "12/10/2022 18:40 PM",
    description: "Now you can book your appointment online Cunsultant too.",
    drugs_duration: "5 days",
    drugs_timeing: "Once daily",
    followup: "7 days",
    actions: " ",
  },
  {
    no: 2,
    patient: "Sarah Corner",
    appointment_date: "12/10/2022 18:40 PM",
    description: "As Per Concern, taste is important",
    drugs_duration: "8 days",
    drugs_timeing: "Twice daily",
    followup: "15 days",
    actions: " ",
  },
  {
    no: 3,
    patient: "Sarah Corner",
    appointment_date: "12/10/2022 18:40 PM",
    description: "As Per Concern, taste is important",
    drugs_duration: "4 days",
    drugs_timeing: "As needed (PRN)",
    followup: "20 days",
    actions: " ",
  },
  
  
];

@Component({
  selector: 'app-drugs-tab',
  templateUrl: './drugs-tab.component.html',
  styleUrls: ['./drugs-tab.component.sass']
})
export class DrugsTabComponent implements OnInit {
  
  //mat-tablle-filter
  @ViewChild('empTbSort') empTbSort = new MatSort();
  sort: MatSort;
  urlparameter: any;
  finalArray: any[];

  ngAfterViewInit() {
    this.dataSource3.sort = this.empTbSort;
  }
  srch:string='';
  prescribeTabForm: FormGroup;
  variantsArray: FormArray;
  i= 0;
  typesOptionsArray: string[][] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  followCtrl = new FormControl('');
  filteredFollows: Observable<string[]>;
  allFollows: string[] = ['Aspirin', 'Adderall', 'Amitriptyline', 'Amlodipine', 'Antacid', 'Paracetamol', 'Antihistamine', 'Nasal decongestants', 'Antiseptic ointment', 'Amoxicillin', 'Drisdol', 'Motrin',];
  @ViewChild('followInput') followInput: ElementRef<HTMLInputElement>;
  form = this.fb.group({
    variants: this.fb.array([]),
  })

  displayedColumns: string[] = [
    "no",
    "patient",
    "appointment_date",
    "description",
    "drugs_duration",
    "drugs_timeing",
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
  drugsTabForm: FormGroup;
  submitted = false;
  returnUrl: string;
  public Editor = ClassicEditor;

  constructor(
    private fb:FormBuilder,
    private authService : AuthService,
    private doctorServiceService : DoctorServiceService,
    private activatedRoute : ActivatedRoute,
    private router : Router
    ) { 
    
    this.filteredFollows = this.followCtrl.valueChanges.pipe(
      startWith(null),
      map((follow: string | null) => (follow ? this._filter(follow) : this.allFollows.slice())),
    );
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    this.typesOptionsArray[this.i].push(event.option.viewValue);
    this.followInput.nativeElement.value = '';
    this.followCtrl.setValue(null);
   // console.log(this.typesOptionsArray[0]);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFollows.filter(follow => follow.toLowerCase().includes(filterValue));
  }


  addMore() {
  }


  ngOnInit() {
    this.prescribeTabForm = this.fb.group({
      name: '',
      variants: this.fb.array([
        this.fb.group({
          drugs_duration: '',
          medicine_type: '',
          medicine_frequency: '',
          medicine_time: '',
          drugs_name: ''
        })
      ]),
    });
    this.typesOptionsArray.push([]);
  }
  searchFilter()
  {
    this.filteredFollows[0]=this.allFollows.filter(item => this.filterByname(item));
  }
  filterByname(cname:string)
{
  return cname.toUpperCase().startsWith(this.srch.toUpperCase());
}
  saveProduct(form: FormGroup) {
  }

  // Add new item to FormArray
  addItem(): void {
    this.variantsArray = this.prescribeTabForm.get('variants') as FormArray;
    this.variantsArray.push(this.fb.group({
      drugs_duration: '',
          medicine_type: '',
          medicine_frequency: '',
          medicine_time: '',
          drugs_name: ''
    }));
    this.typesOptionsArray.push([]);
  
    this.i++;
  }

  removeItem(index: number) {
    this.variantsArray.removeAt(index);
  }

  addOpt(event: MatChipInputEvent, index: number): void {
    const input = event.input;
    const value = event.value;
    
    // Add our fruit
    if ((value || '').trim()) {
      
      this.typesOptionsArray[index].push(value.trim());

    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.followCtrl.setValue(null);
  }

  removeOpt(follow: string, index: number): void {
    
    const optIndex = this.typesOptionsArray[index].indexOf(follow);
    if (optIndex >= 0) {
      this.typesOptionsArray[index].splice(optIndex, 1);
    }
  }

  myclickeventDemo(i){
    // console.log(i);
    this.i = i;
  }
  success_message:boolean= false;
  error_message:boolean = false;
  error_message_text:string;
  onSubmit($event) {
   
    this.submitted = true;
// let ar;
var myData = [];
// console.log(this.typesOptionsArray.length);

    
     let data = {
      doctor_id : this.authService.currentUserValue.userid,
      appointment_id : this.activatedRoute.snapshot.paramMap.get('appointment_id'),
      drugs : this.prescribeTabForm.value.variants[0].drugs_name,
      drug_duration :'',
      drug_type :'',
      drug_frequency :'',
      drug_timing :'',
     }
    

  //   const data =  {
  //     doctor_id : this.authService.currentUserValue.userid,
  //     appointment_id : this.activatedRoute.snapshot.paramMap.get('appointment_id'),
  //     //drugs : this.drugs,
  //     drug_duration :this.form.value.lessons[0].medicine_frequency,
  //     drug_type :this.form.value.lessons[0].medicine_type,
  //     drug_frequency :this.form.value.lessons[0].medicine_frequency,
  //     drug_timing :this.form.value.lessons[0].medicine_time,
  //  } ;

   this.doctorServiceService.addDrugs(data).subscribe(
    (result)=>{
      Swal.fire(
        '',
        'Drugs Added Successfully',
        'success'
      );
      this.router.navigate(["/doctors/appointments/prescriptions/prescription-tabssix/"+6+'/'+this.activatedRoute.snapshot.paramMap.get('appointment_id')])
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

