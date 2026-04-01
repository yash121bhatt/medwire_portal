import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators, } from "@angular/forms";
import { ThemePalette } from "@angular/material/core";
@Component({
  selector: 'app-edit-promocode',
  templateUrl: './edit-promocode.component.html',
  styleUrls: ['./edit-promocode.component.sass']
})
export class EditPromocodeComponent {
  editpromocodeForm: FormGroup;
  submitted = false;
  returnUrl: string;
  color: ThemePalette = "accent";
  flat = false;
  persentage = false;
  isHidden=true;
  public selection: string;
  public customOption: string = 'customOption';
  radioGroup: any;
  

  changediv(divid) {
    if (divid === "persent_div") {
      this.flat = true;
      this.persentage = false;
    }
    else if (divid === "flat_div") {
      this.flat = false;
      this.persentage = true;
    }

  }
  constructor(private fb: FormBuilder) {
    this.editpromocodeForm = this.fb.group({
      Discount_type: ["", [Validators.required]],
      persent_discount: [""],
      flat_discount: [""],
      startDate: ["", [Validators.required]],
      endDate: ["", [Validators.required]],
      max_number: ["", [Validators.required]],
      promocode: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      price_range: ["", [Validators.required]],
    });
    
  }
  success_message:boolean= false;
  error_message:boolean = false;
  error_message_text:string;
  onSubmit() {
    this.submitted = true;
    // console.log("Form Value", this.editpromocodeForm.value);
  }
}

