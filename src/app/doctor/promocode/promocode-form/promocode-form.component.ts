import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-promocode-form',
  templateUrl: './promocode-form.component.html',
  styleUrls: ['./promocode-form.component.sass']
})
export class PromocodeFormComponent implements OnInit {
  currentDate : Date = new Date();
  private form : FormData;
  addpromocodeForm: FormGroup;
  submitted = false;
  returnUrl: string;
  color: ThemePalette = "accent";
  flat = false;
  test = false;
  percentage = false;
  package = false;
  isHidden=true;
  public selection: string;
  public selection1: string;
  public customOption: string = 'customOption';
  radioGroup: any;
  radioGroup1: any;
  public variables3 = [];
  public filteredList3:any;
  userId : any; 
  role_id : any = 3;
  banner_image:any;
  promo_code_id:any = null;
  discount_type:any
  discount_rate: any
  discount_price: any
  validity_start_date: any
  validity_end_date:any
  max_uses: any
  promo_code: any
  price: any
  description:any;
  packageData : any;
  testData : any;
  imageURL = `${environment.documentUrl}`;

  ngOnInit(){ 
    this.userId = this.authService.currentUserValue.userid;
    this.promo_code_id = this.activatedRoute.snapshot.paramMap.get("id");
    if(this.promo_code_id){
       this.singlePromocodeData();

    }
  }

  singlePromocodeData(){
    let data = {
      promo_code_id : this.promo_code_id
    }
      this.patientService.singlePromocode(data).subscribe((result)=>{
        if(result.status_code == 200){
         let resultData = result.data[0];
         this.promo_code = resultData.promo_code ?? "-";
         this.selection = resultData.discount_type ?? "-";
         if(this.selection == "percent"){
           this.flat = true;
           this.percentage = false;
         }else if(this.selection == "flat"){
           this.flat = false;
           this.percentage = true;
         }
         this.selection1 = resultData.promo_code_for ?? "-";
         if(this.selection1 == "package"){
          this.test = true;
          this.package = false;
          let data = {
            lab_id : this.userId
         }
         this.patientService.packageList(data).subscribe((result)=>{
          this.variables3 = result.data;
          this.filteredList3 = this.variables3.slice();
          this.packageData = resultData.promo_code_for_id.split(",") ?? "-";
          let packageData1 = []
          for(let i = 0 ; i< this.packageData.length ; i++){
           packageData1.push(parseInt(this.packageData[i]));
          }
          this.packageData = packageData1;           
          });
        }else if(this.selection1 == "test"){
          this.test = false;
          this.package = true;
          let data = {
            lab_id : this.userId
         }
          this.patientService.testList(data).subscribe((result)=>{
            this.variables3 = result.data;
            this.filteredList3 = this.variables3.slice();
            this.testData = resultData.promo_code_for_id.split(",") ?? "-"; 
            let testData1 = []
            for(let i = 0 ; i< this.testData.length ; i++){
              testData1.push(parseInt(this.testData[i]));
          }
          this.testData = testData1; 
          })
        }
        
         this.discount_price = resultData.discount_price ?? "-";
         this.discount_rate = resultData.discount_rate ?? "-";
         this.validity_start_date = new Date(resultData.validity_start_date) ?? "-";
         this.validity_end_date = new Date(resultData.validity_end_date) ?? "-";
         this.price = resultData.price ?? "-";
         this.description = resultData.description ?? "-";
         this.max_uses = resultData.max_uses ?? "-";
         this.banner_image = resultData.banner_image_name ??"-"
        } 
   })
  }

  changediv(divid) {
    if (divid === "percent_div") {
      this.flat = true;
      this.percentage = false;

    }
    else if (divid === "flat_div") {
      this.flat = false;
      this.percentage = true;
    }

  }


  changedivPackage(divid1) {
    if (divid1 === "package_div") {
      this.test = true;
      this.package = false;
      let data = {
         lab_id : this.userId
      }
      this.patientService.packageList(data).subscribe((result)=>{
        this.variables3 = result.data;
        this.filteredList3 = this.variables3.slice();
      })
    }
    else if (divid1 === "test_div") {
      this.test = false;
      this.package = true;
      let data = {
        lab_id : this.userId
     }
      this.patientService.testList(data).subscribe((result)=>{
        this.variables3 = result.data;
        this.filteredList3 = this.variables3.slice();
      })
    }

  }

  compareDate(currentDate,validity_start_date,type){
      let date1 = new Date(currentDate);
      let date2 = new Date(validity_start_date);
      if(type == 1){
        if (date1.getTime() < date2.getTime())
        return true;
        return false
      }
      if(type == 2){
        if (date1.getTime() > date2.getTime())
        return true;
        return false
      }
      // if(type == 3){
      //   if (date1.getTime() < date2.getTime())
      //   return true;
      //   return false
      // }
      
  }

  constructor(private fb: FormBuilder , private patientService : PatientServiceService, private router:Router , private authService : AuthService , private activatedRoute : ActivatedRoute) {
    this.addpromocodeForm = this.fb.group({
      discount_type: ["", [Validators.required]],
      promo_code_for: ["", [Validators.required]],
      package:[""],
      test:[""],
      description:[""],
      discount_rate: [""],
      discount_price: [""],
      validity_start_date: ["", [Validators.required]],
      validity_end_date: ["", [Validators.required]],
      max_uses: ["", [Validators.required]],
      promo_code: ["", [Validators.required]],
      price: ["", [Validators.required]],
      banner_image: [""],
    });
  }
  success_message:boolean= false;
  error_message:boolean = false;
  error_message_text:string;

  async fileChange($event){
    this.banner_image = null;
    if($event && $event.length){
      this.banner_image = $event[0];
    }
  }

  onSubmit() {
    this.form = new FormData();
    this.form.append("user_id" , this.userId);
    this.form.append("role_id" , this.role_id); 
    this.form.append("promo_code_for" ,this.addpromocodeForm.value.promo_code_for); 
     if(this.addpromocodeForm.value.promo_code_for == "package"){
      this.form.append("promo_code_for_id" , this.addpromocodeForm.value.package); 
    }else if(this.addpromocodeForm.value.promo_code_for == "test"){
      this.form.append("promo_code_for_id" ,  this.addpromocodeForm.value.test); 
    }
    this.form.append("discount_type" ,this.addpromocodeForm.value.discount_type); 
    this.form.append("discount_rate" ,this.addpromocodeForm.value.discount_rate); 
    this.form.append("promo_code" ,this.addpromocodeForm.value.promo_code); 
    this.form.append("discount_price" ,this.addpromocodeForm.value.discount_price); 
    this.form.append("validity_start_date" ,this.addpromocodeForm.value.validity_start_date); 
    this.form.append("validity_end_date" ,this.addpromocodeForm.value.validity_end_date); 
    this.form.append("max_uses" ,this.addpromocodeForm.value.max_uses); 
    this.form.append("price" ,this.addpromocodeForm.value.price); 
    this.form.append("description" ,this.addpromocodeForm.value.description); 
    this.form.append("banner_image" ,this.banner_image);
    if(this.promo_code_id){
        this.form.append("promo_code_id" , this.promo_code_id);
        this.patientService.editPromocode(this.form).subscribe((result) => {
          if(result.status_code == 200){
            setTimeout(()=> {
              this.router.navigate(['/doctor/promocode/promocode-list']);
            }, 600 );
            Swal.fire(
              '',
              result.message,
              'success'
            )
          } 
        }, 
        (err) => {
          console.log(err);
          Swal.fire(
            '',
            err,
            'error'
          )
        })
    }else {
      this.patientService.addPromocode(this.form).subscribe((result) => {
        if(result.status_code == 200){
          setTimeout(()=> {
            this.router.navigate(['/doctor/promocode/promocode-list']);
          }, 600 );
          Swal.fire(
            '',
            result.message,
            'success'
          )
        } 
      }, 
      (err) => {
        console.log(err);
        Swal.fire(
          '',
          err,
          'error'
        )
      })
    }
    
  }


}