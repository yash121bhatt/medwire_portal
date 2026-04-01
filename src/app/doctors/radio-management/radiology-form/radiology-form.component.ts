import { Component, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators, } from "@angular/forms";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
@Component({
  selector: 'app-radiology-form',
  templateUrl: './radiology-form.component.html',
  styleUrls: ['./radiology-form.component.sass']
})
export class RadiologyFormComponent  {
  radiologyForm: FormGroup;
  submitted = false;
  returnUrl: string;
  public selection: string;
  public Editor = ClassicEditor;
  public variables3 = ['Meditech Labs', 'Biomedica Laboratories', 'iHealth Labs', 'Vector Labs', 'Quest Diagnostics', 'Quest Diagnostics', 'Big City Medical Labs', 'Clinilabs Corp',];
  
  public filteredList3 = this.variables3.slice();
  

  constructor(private fb: FormBuilder) {
    this.radiologyForm = this.fb.group({
      radiology_name: ["", [Validators.required]], 
    });
    
  }
  success_message:boolean= false;
  error_message:boolean = false;
  error_message_text:string;
  ngOnInit() {
  }
  onSubmit() {
    this.submitted = true;
    // console.log("Form Value", this.radiologyForm.value);
}
}
function matDatepicker(matDatepicker: any) {
  throw new Error('Function not implemented.');
}

