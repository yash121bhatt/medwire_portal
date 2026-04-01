import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatStepperModule } from "@angular/material/stepper";
import { StepTwoComponent } from '../step-two/step-two.component';


@Component({
  // directives: [StepTwoComponent],
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.sass'],
 

})
export class PatientFormComponent  {
  selectedStatus:  number ;  
  eventEditForm: FormGroup;
  public toggleForm:boolean;

  //@ViewChild(fetch) child:StepTwoComponent;
  @ViewChild(StepTwoComponent) private myChild: StepTwoComponent;


  isLinear = false;
  HFormGroup1: FormGroup;
  HFormGroup2: FormGroup;
  patientForm: any;
  fb: any;

  getMobileNo: string;

  constructor(private _formBuilder: FormBuilder) {
    
  }
  ngOnInit() {
   

    this.eventEditForm = new FormGroup({          
      'completed': new FormControl()
      });      
    this.selectedStatus = 1;

   
  }


  ngAfterViewInit() {
    // child is set
    
  }

  emittedDataByChild(data:any) {
    // console.log('main Component',data);
    this.getMobileNo = data;
    this.myChild.fetch(this.getMobileNo);
   
   // this.child.fetch();

  }
}

  