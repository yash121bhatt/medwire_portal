import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators, } from "@angular/forms";
import { ThemePalette } from "@angular/material/core";
@Component({
  selector: 'app-fee-form',
  templateUrl: './fee-form.component.html',
  styleUrls: ['./fee-form.component.sass']
})
export class FeeFormComponent {
  addfeeForm: FormGroup;
  submitted = false;
  returnUrl: string;
  color: ThemePalette = "accent";
  online = false;
  offline = false;
  isHidden=true;
  public selection: string;
  public customOption: string = 'customOption';
  radioGroup: any;
  
  toggle(){
    this.isHidden=!this.isHidden;
  }

  changediv(divid) {
    if (divid === "online_visit") {
      this.online = true;
      this.offline = false;
    }
    else if (divid === "offline_visit") {
      this.online = false;
      this.offline = true;
    }

  }
  constructor(private fb: FormBuilder) {
    this.addfeeForm = this.fb.group({
      doctor: ["", [Validators.required]],
      visit: ["", [Validators.required]],
      online_doctor_fee: [""],
      offline_doctor_fee: [""],
      clinic_doctor_fee: [""],
      
    });
    
  }
  success_message:boolean= false;
  error_message:boolean = false;
  error_message_text:string;
  onSubmit() {
    this.submitted = true;
    // console.log("Form Value", this.addfeeForm.value);
  }
}

