import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { PatientdataService } from "src/app/services/patientdata.service";
import { AuthService } from "src/app/core/service/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-symptomslist',
  templateUrl: './symptomslist.component.html',
  styleUrls: ['./symptomslist.component.sass']
})
export class SymptomslistComponent implements OnInit {
  
  insomnia_a     = false ;
  headacheone    = false;
  migranestwo    = false;
  dizzinesthree  = false;
  acnefour       = false;
  heteicfever    = false; 
  neckaches      = false;
  shoulderaches  = false;
  tenderbreats   = false ;
  breastsensitivity = false;
  backaches      = false ;
  lowerBackPain  = false;
  bodyaches      = false;
  musclesPain    = false;
  influenza      = false;
  bloating       =  false;
  constipation   = false;
  diarrhea       = false;
  nausea         = false;
  backaches_d    = false;
  abdominal_crapms = false;
  dyspepsia      = false;
  gas            = false;
  hunger         = false;
  ovulationpain  = false;
  anxiety        = false;
  insomnia       = false;
  stress         = false;
  moodiness      = false;
  tension        = false;
  irritability   = false;
  to_concentrate = false;
  fatigue        = false;
  confusion      = false;
  ovulationPain_d = false;
  dry            = false;
  sticky         = false;
  creamy         = false;
  watery         = false;
  eggwhite       = false;
  cottage_cheese = false;
  green          = false;
  white_blood    = false;
  foulSmelling   = false;
  flow           = false;
  pelvicPain     = false;
  cervicalfirmness = false;
  cervicalOpening = false;
  cervicalMucus  = false;
  checkedname: boolean;
  listData: any;



  constructor(
    //private dialog: MatDialog
    private patientdataService : PatientdataService,
    private authService : AuthService,
    private route: ActivatedRoute,
  
  ) {

  }
  
  ngOnInit(): void {
   // this.bloating = true;
   //this.insomnia_a = true ;
   this.listData =[];
   const symtomesList = {
     user_id : this.authService.currentUserValue.userid,
     member_id : atob(this.route.snapshot.paramMap.get('type')),
   }
   this.patientdataService.symtomesListnew(symtomesList).subscribe(
     (result) => {
        console.log(result);
       
       for(var i = 0, len = result.data.length; i < len; i++){
         if(result.data[i].symptom_status==='1'){
          this.listData.push(result.data[i]);
         }
        
      }

     },
     (err)=>{
      console.log(err)
     });

   this.patientdataService.symtomesList(symtomesList).subscribe(
    (result) => {
    
     
        Object.entries(JSON.parse(result.data[0].symtomeslist)).find(([key, value]) => {
          if (key === 'checkedname' && value === true) {
            this.checkedname = true; 
          }
          if (key === 'headacheone' && value === true) {
            this.headacheone = true;  
          }
          if (key === 'migranestwo' && value === true) {
            this.migranestwo = true;  
          }

          if (key === 'dizzinesthree' && value === true) {
            this.dizzinesthree = true;
          }
          if (key === 'acnefour' && value === true) {
            this.acnefour = true;  
          }
          if (key === 'heteicfever' && value === true) {
            this.heteicfever = true;
          }
          if (key === 'neckaches' && value === true) {
            this.neckaches = true; 
          }
          if (key === 'shoulderaches' && value === true) {
            this.shoulderaches = true; 
          }
          if (key === 'tenderbreats' && value === true) {
            this.tenderbreats = true; 
          }
          if (key === 'breastsensitivity' && value === true) {
            this.breastsensitivity = true;
          }
          if (key === 'backaches' && value === true) {
            this.backaches = true; 
          }
          if (key === 'lowerBackPain' && value === true) {
            this.lowerBackPain = true; 
          }
          if (key === 'bodyaches' && value === true) {
            this.bodyaches = true; 
          }
          if (key === 'musclesPain' && value === true) {
             this.musclesPain = true;
          }
          if (key === 'influenza' && value === true) {
             this.influenza = true;
          }
          if (key === 'bloating' && value === true) {
             this.bloating = true;
          }
         
          if (key === 'constipation' && value === true) {
            this.constipation = true;
          }
          if (key === 'diarrhea' && value === true) {
            this.diarrhea = true;
          }
          if (key === 'nausea' && value === true) {
            this.nausea = true;
          }
          if (key === 'backaches_d' && value === true) {
            this.backaches_d = true;
          }
          if (key === 'abdominal_crapms' && value === true) {
            this.abdominal_crapms = true;
          }
          if (key === 'dyspepsia' && value === true) {
            this.dyspepsia = true;
          }
          
          if (key === 'gas' && value === true) {
            this.gas = true;
          }
          if (key === 'hunger' && value === true) {
            this.hunger = true;
          }
          if (key === 'ovulationpain' && value === true) {
            this.ovulationpain = true;
          }
          if (key === 'anxiety' && value === true) {
            this.anxiety = true;
          }
          if (key === 'insomnia' && value === true) {
            this.insomnia = true;
          }
          if (key === 'stress' && value === true) {
            this.stress = true;
          }
          if (key === 'moodiness' && value === true) {
            this.moodiness = true;
          }
          if (key === 'tension' && value === true) {
            this.tension = true;
          }
          if (key === 'irritability' && value === true) {
            this.irritability = true;
          }
          if (key === 'to_concentrate' && value === true) {
            this.to_concentrate = true;
          }
          if (key === 'fatigue' && value === true) {
            this.fatigue = true;
          }
          if (key === 'confusion' && value === true) {
            this.confusion = true;
          }
          if (key === 'ovulationPain_d' && value === true) {
            this.ovulationPain_d = true;
          }
          if (key === 'dry' && value === true) {
            this.dry = true;
          }
          if (key === 'sticky' && value === true) {
            this.sticky = true;
          }
          if (key === 'creamy' && value === true) {
            this.creamy = true;
          }
          if (key === 'watery' && value === true) {
            this.watery = true;
          }
          if (key === 'eggwhite' && value === true) {
            this.eggwhite = true;
          }
          if (key === 'cottage_cheese' && value === true) {
            this.cottage_cheese = true;
          }
          if (key === 'green' && value === true) {
            this.green = true;
          }
        
          if (key === 'white_blood' && value === true) {
            this.white_blood = true;
          }
          if (key === 'foulSmelling' && value === true) {
            this.foulSmelling = true;
          }
          if (key === 'flow' && value === true) {
            this.flow = true;
          }
          if (key === 'pelvicPain' && value === true) {
            this.pelvicPain = true;
          }
          if (key === 'cervicalfirmness' && value === true) {
            this.cervicalfirmness = true;
          }
          if (key === 'cervicalOpening' && value === true) {
            this.cervicalOpening = true;
          }
          if (key === 'cervicalMucus' && value === true) {
            this.cervicalMucus = true; 
          }
          

        
        });

    },
    (err) => {
      Swal.fire(
        '',
        err,
        'error'
      )
     
    }
  );
  }

  
  
  
}