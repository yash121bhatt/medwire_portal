import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatStepperModule } from "@angular/material/stepper";
interface Category {
  shortName: string;
  name: string;
}
@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.sass']
})
export class StepOneComponent implements OnInit {
  @Output() emitData = new EventEmitter<string> ();

  selectedStatus:  number ;  
  eventEditForm: FormGroup;
  public toggleForm:boolean;

  isLinear = false;
  HFormGroup1: FormGroup;
  patientForm: any;
  fb: any;

  categories:  [
    {
      "name" : "Blood Test"
    },
  ];
  subcategories: string[];
  form: FormGroup;
  category: any;
  subcategory :any;
  


  constructor(private _formBuilder: FormBuilder) {
    
  }
  ngOnInit() {
    this.HFormGroup1 = this._formBuilder.group({
      phone: ["", [Validators.required, Validators.pattern("[6789][0-9]{9}"), Number]],
    });


    this.eventEditForm = new FormGroup({          
      'completed': new FormControl()
      });      
    this.selectedStatus = 1;

   
  }

  sendDatamobile(){
 
    this.emitData.emit(this.HFormGroup1.value.phone);
  }

}

  
