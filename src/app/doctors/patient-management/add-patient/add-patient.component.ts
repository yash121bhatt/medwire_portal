import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.sass']
})
export class AddPatientComponent {
  addpatientForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.addpatientForm = this.fb.group({
      firstname: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      lastname: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      gender: ["", [Validators.required]],
      email: ["", [Validators.required]],
      adharcardno:  ["", [Validators.required, Validators.pattern("[0-9]{4}[0-9]{4}[0-9]{4}")]],
      pincode:  ["", [Validators.required, Validators.pattern("[0-9]{6}")]],
      mobile:  ["", [Validators.required, Validators.pattern("[789]{1}[0-9]{9}")]],
      dob: ["", [Validators.required]],
      address: ["", [Validators.required]],
      uploadImg: [""],
    });
    
  }
  
  onSubmit() {
    // console.log("Form Value", this.addpatientForm.value);
  }
}
