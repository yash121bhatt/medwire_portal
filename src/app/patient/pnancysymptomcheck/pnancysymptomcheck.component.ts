import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: 'app-pnancysymptomcheck',
  templateUrl: './pnancysymptomcheck.component.html',
  styleUrls: ['./pnancysymptomcheck.component.sass']
})
export class PnancysymptomcheckComponent implements OnInit {
  isLinear = false;
  HFormGroup1: FormGroup;
  HFormGroup2: FormGroup;
  HFormGroup3: FormGroup;
  HFormGroup4: FormGroup;
  checkedValueFirst =false;
  checkedValueSecond =false;
  task = {
    color:'blue',
  }

  constructor(private _formBuilder: FormBuilder) {}
  ngOnInit() {
    this.HFormGroup1 = this._formBuilder.group({
      
      Periods_yes: [false, Validators.required],
      Periods_no: [false, Validators.required],
      moodchanges: [false, Validators.required],
      diarrhea: [false, Validators.required],
      jointpain: [false, Validators.required],
      increasedsexdrive: [false, Validators.required],
      sleepchanges: [false, Validators.required],
      Nausea: [false, Validators.required],
      abdominalcramps: [false, Validators.required],
      ovulationpain: [false, Validators.required]
    });
    this.HFormGroup2 = this._formBuilder.group({
      tender_yes: [false, Validators.required],
      tender_no: [false, Validators.required],
      nauseated_yes: [false, Validators.required],
      nauseated_no: [false, Validators.required],
      abdominal_yes: [false, Validators.required],
      abdominal_no: [false, Validators.required],
      vbleeding_yes: [false, Validators.required],
      vbleeding_no: [false, Validators.required],
      tired_yes: [false, Validators.required],
      tired_no: [false, Validators.required]
    });
    this.HFormGroup3 = this._formBuilder.group({
      not_recommended: [false, Validators.required],
      getwhenoffer: [false, Validators.required],
      not_sure: [false, Validators.required],
      not_get: [false, Validators.required],
      got_it: [false, Validators.required],
      food_cravings_yes: [false, Validators.required],
      food_cravings_yes_no: [false, Validators.required],
      urinating_yes: [false, Validators.required],
      urinating_no: [false, Validators.required],
      constipated_yes: [false, Validators.required],
      constipated_no: [false, Validators.required],
      ovulated_yes: [false, Validators.required],
      ovulated_no: [false, Validators.required],
      no_b_control: [false, Validators.required],
      condom_spermicide: [false, Validators.required],
      iud_depo: [false, Validators.required],
      pill: [false, Validators.required],
      another_b_control: [false, Validators.required],
      undertofive: [false, Validators.required],
      threeo_threefor: [false, Validators.required],
      threefive_threenine: [false, Validators.required],
      above_forty: [false, Validators.required],
      not_say: [false, Validators.required],
      american_indo: [false, Validators.required],
      asian: [false, Validators.required],
      b_afric_american: [false, Validators.required],
      blackafrican: [false, Validators.required],
      hispa_latino: [false, Validators.required],
      pnot_say: [false, Validators.required]
    });
    this.HFormGroup4 = this._formBuilder.group({
      duringxfertile_yes: [false, Validators.required],
      duringxfertile_no: [false, Validators.required],
      orgasm_yes: [false, Validators.required],
      orgasm_no: [false, Validators.required],
      nocount: [false, Validators.required],
      normal_count: [false, Validators.required],
      low_count: [false, Validators.required],
      missed_periods: [false, Validators.required],
      in_one_to_days: [false, Validators.required],
      more_then_for_days: [false, Validators.required],
      notest: [false, Validators.required],
      negativeresult: [false, Validators.required],
      positiveresult: [false, Validators.required]
    });

 

    // this.VFormGroup1 = this._formBuilder.group({
    //   firstName: ["", Validators.required],
    //   lastName: ["", Validators.required],
    // });
    // this.VFormGroup2 = this._formBuilder.group({
    //   address: ["", Validators.required],
    // });
  }
  changeStatus(){
    this.checkedValueFirst =true;
    this.checkedValueSecond =false;
  }
  changeStatusecond(){
    this.checkedValueFirst =false;
    this.checkedValueSecond =true;
  }

}
