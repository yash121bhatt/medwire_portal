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
import { isFakeMousedownFromScreenReader } from '@angular/cdk/a11y';
//import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-add-symptoms',
  templateUrl: './add-symptoms.component.html',
  styleUrls: ['./add-symptoms.component.sass']
})
export class AddSymptomsComponent implements OnInit {

  symptomsForm: FormGroup;

  isChecked   = true;
  isCondition = false;
  isChecked1  = false;
  isChecked2  = false;
  isChecked3  = false;
  isChecked4  = false;
  
  memberId: string;
  normalData: any;
  bodyData: any;
  abdomenData : any;
  mentalData :any;
  fluidData:any;
  cervixData:any;
  check_uncheckcondition = false;
  normalDataForm: any;
  finalListingData : any;


  constructor(
    private fb: FormBuilder,
    private patientdataService : PatientdataService,
    private authService : AuthService,
    private route: ActivatedRoute,

  ) {
    this.normalDataForm = [];
    this.finalListingData = [];
    const symtomesList = {
      user_id : this.authService.currentUserValue.userid,
      member_id : atob(this.route.snapshot.paramMap.get('type')),
    }

    this.patientdataService.formsymptomesAPI(symtomesList).subscribe((result)=>{
        console.log('adad ',result.data) ;

        this.finalListingData = result.data;

        for(var i = 0, len = result.data.length; i < len; i++){
          this.normalDataForm.push(false);
          }
            
        //  console.log('D', Object.assign({}, this.normalDataForm));
          //this.symptomsForm = this.fb.group(Object.assign({}, this.normalDataForm));
    });
    this.symptomsForm = this.fb.group({

      symptomesId1 :false,
      symptomesId2 :false,
      symptomesId3 :false,
      symptomesId4 :false,
      symptomesId5 :false,
      symptomesId6 :false,
      symptomesId7 :false,
      symptomesId8 :false,
      symptomesId9 :false,
      symptomesId10 :false,

      symptomesId11 :false,
      symptomesId12 :false,
      symptomesId13 :false,
      symptomesId14 :false,
      symptomesId15 :false,
      symptomesId16 :false,
      symptomesId17 :false,
      symptomesId18 :false,
      symptomesId19 :false,
      symptomesId20 :false,

      symptomesId21 :false,
      symptomesId22 :false,
      symptomesId23 :false,
      symptomesId24 :false,
      symptomesId25 :false,
      symptomesId26 :false,
      symptomesId27 :false,
      symptomesId28 :false,
      symptomesId29 :false,
      symptomesId30 :false,

      symptomesId31 :false,
      symptomesId32 :false,
      symptomesId33 :false,
      symptomesId34 :false,
      symptomesId35 :false,
      symptomesId36 :false,
      symptomesId37 :false,
      symptomesId38 :false,
      symptomesId39 :false,
      symptomesId40 :false,

      symptomesId41 :false,
      symptomesId42 :false,
      symptomesId43 :false,
      symptomesId44 :false,
      symptomesId45 :false,
      symptomesId46 :false,
      symptomesId47 :false,
      symptomesId48 :false,
      symptomesId49 :false,
      symptomesId50 :false,

      symptomesId51 :false,
      symptomesId52 :false,
      symptomesId53 :false,
      symptomesId54 :false,
      symptomesId55 :false,
      symptomesId56 :false,
      symptomesId57 :false,
      symptomesId58 :false,
      symptomesId59 :false,
      symptomesId60 :false,

      symptomesId61 :false,
      symptomesId62 :false,
      symptomesId63 :false,
      symptomesId64 :false,
      symptomesId65 :false,
      symptomesId66 :false,
      symptomesId67 :false,
      symptomesId68 :false,
      symptomesId69 :false,
      symptomesId70 :false,

      symptomesId71 :false,
      symptomesId72 :false,
      symptomesId73 :false,
      symptomesId74 :false,
      symptomesId75 :false,


     checkedname  :false,

     cervixSymptomes1 :false,
     cervixSymptomes2 :false,
     cervixSymptomes3 :false,
     cervixSymptomes4 :false,
     cervixSymptomes5 :false,
     
     

     
     
    });
  }
  ngOnInit(): void {
    this.normalData =[];
    this.bodyData   = [];
    this.abdomenData = [];
    this.mentalData = [];
    this.fluidData  = [];
    this.cervixData =[];

    this.memberId = this.route.snapshot.paramMap.get('type');
    const symtomesList = {
      user_id : this.authService.currentUserValue.userid,
      member_id : atob(this.route.snapshot.paramMap.get('type')),
    }
    this.patientdataService.symtomesListnew(symtomesList).subscribe(
      (result) => {
         const fData = result.data;
         const myData = fData.filter((e,i)=> fData.indexOf(e.category_name)===i );
          console.log('mydata',myData);
        for(var i = 0, len = result.data.length; i < len; i++){
          if(result.data[i].category_name==='normal'){
           this.normalData.push(result.data[i]);
          }
          if(result.data[i].category_name==='body'){
            this.bodyData.push(result.data[i]);
          }
          if(result.data[i].category_name==='abdomen'){
            this.abdomenData.push(result.data[i]);
          }
          if(result.data[i].category_name==='mental'){
            this.mentalData.push(result.data[i]);
          }
          if(result.data[i].category_name==='fluid'){
            this.fluidData.push(result.data[i]);
          }
          if(result.data[i].category_name==='cervix'){
            this.cervixData.push(result.data[i]);
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
              this.isChecked = true; 
            }
            if (key === 'headacheone' && value === true) {
              this.isChecked = true;  
            }
            if (key === 'migranestwo' && value === true) {
              this.isChecked1 = true;  
            }
  
            if (key === 'dizzinesthree' && value === true) {
              this.isChecked2 = true;
            }
            if (key === 'acnefour' && value === true) {
              this.isChecked3 = true;  
            }
            if (key === 'heteicfever' && value === true) {
              this.isChecked4 = true;
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

    // throw new Error('Method not implemented.');
  }



  onSubmit(fData: any) {
    console.log('Symptomes = ',fData.checkedname);
    console.log('output = ',fData);

    const symtomes_data = {
      user_id : this.authService.currentUserValue.userid,
      member_id : atob(this.route.snapshot.paramMap.get('type')),
      symtomeslist: JSON.stringify(fData)
    }
  
    this.patientdataService.addSymtomes(symtomes_data).subscribe(
      (result) => {
            Swal.fire(
              '',
              result.message,
              'success'
            )
      },
      (err) => {
        Swal.fire(
          '',
          err,
          'error'
        )
       
      }
    );
    //this.router.navigate(["/patient/myprofile"]);
    }
    checkCondition(status){
    //  this.check_uncheckcondition = true;
        if(status==0){
        
        this.check_uncheckcondition = false;
        return this.check_uncheckcondition;
        }else{
          this.check_uncheckcondition = true;
          return this.check_uncheckcondition;
        }
    }
    statusUpdate(symptomes_id,status){
     const updateStatusData = {
      user_id:this.authService.currentUserValue.userid,
      member_id:atob(this.route.snapshot.paramMap.get('type')),
      symptom_id:symptomes_id,
      status:status==true?'1':'0'
     }

     this.patientdataService.updateSymptomes(updateStatusData).subscribe(
      (result)=>{
        Swal.fire(
          '',
          result.message,
          'success'
        )
     },
     (err)=>{
      Swal.fire(
        '',
        err,
        'error'
      )
     }
     )
    }

  
}

 

