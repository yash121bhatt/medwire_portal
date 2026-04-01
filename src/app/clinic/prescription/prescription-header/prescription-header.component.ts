import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators, } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { ClinicServiceService } from 'src/app/services/clinic-service.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-prescription-header',
  templateUrl: './prescription-header.component.html',
  styleUrls: ['./prescription-header.component.sass']
})
export class PrescriptionHeaderComponent {
  prescriptionForm: FormGroup;
  private form : FormData;
  submitted = false;
  returnUrl: string;
  public clinic_name: string;
  public mobile_no: string;
  public mobile_no2: string;
  public email: string;
  public uploadImg: any;
  clinic_timeing: string;
  profile_image : any;
  cd: any;
  imageURLprofile = `${environment.documentUrl}`;
  
  constructor(
    private fb: FormBuilder,
    private activatedRoute : ActivatedRoute,
    private authService : AuthService,
    private clinicServiceService : ClinicServiceService,
    private router : Router

    ) {
    this.prescriptionForm = this.fb.group({
      clinic_name: ["", [Validators.required, Validators.pattern("^[a-z A-Z 0-9_-]{3,32}$")]],
      // mobile_no: ["", [Validators.required, Validators.pattern("[0][0-9]{10}")]],
      mobile_no2: ["", [Validators.required,Validators.pattern("[6789][0-9]{9}")]],
      clinic_timeing: ["", [Validators.required]],
      email: ["", [Validators.required,  Validators.email, Validators.minLength(5)]],
      uploadImg: [""],
    });
    
  }
  @ViewChild('fileInput') el: ElementRef;
  imageUrl: any = '';
  editFile: boolean = true;
  removeUpload: boolean = false;
  uploadfileForm = this.fb.group({
    file: [null],
  });
  
  uploadFile(event) {

    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.prescriptionForm.patchValue({
          file: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
    //  this.cd.markForCheck();        
    }
    
  }
  success_message:boolean= false;
  error_message:boolean = false;
  error_message_text:string;

  async fileChange($event){
    this.profile_image = null;
    if($event && $event.length){
      this.profile_image = $event[0];
    }
  }

  ngOnInit(){

    if((this.authService.currentUserValue.address==null || this.authService.currentUserValue.address=='') || (this.authService.currentUserValue.pin_code==null || this.authService.currentUserValue.pin_code=='')){
      Swal.fire(
        '',
        `${environment.profileCompleteMessage}`,
        'info'
      )
      this.router.navigate(["/clinic/clinic-editmyprofile"]);

    }
    else{

    }
    
    this.getHeaderdetail();
  }

  onSubmit() {
    this.submitted = true;

    this.form = new FormData();

    this.form.append('clinic_name',this.prescriptionForm.value.clinic_name);
    this.form.append('mobile_number','');
    this.form.append('alternate_mobile_number',this.prescriptionForm.value.mobile_no2);
    this.form.append('email_id',this.prescriptionForm.value.email);
    this.form.append('clinic_timing',this.prescriptionForm.value.clinic_timeing);
    this.form.append('clinic_id',this.authService.currentUserValue.userid);
    this.form.append('clinic_logo',this.profile_image)

    // console.log("Form Value", this.prescriptionForm.value);

    this.clinicServiceService.addPreseciptionHeader(this.form).subscribe(
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

  getHeaderdetail(){
    const data = {
      clinic_id : this.authService.currentUserValue.userid
    }

    this.clinicServiceService.getPrescriptionDetail(data).subscribe(
      (result)=>{
        this.clinic_name = result.data.clinic_name;
        this.mobile_no = result.data.mobile_number;
        this.mobile_no2 = result.data.alternate_mobile_number!='' && result.data.alternate_mobile_number!=null && result.data.alternate_mobile_number!='undefined' ?result.data.alternate_mobile_number:''  ;
        this.email = result.data.email_id;
        this.clinic_timeing = result.data.clinic_timing;
        this.imageUrl = this.imageURLprofile +result.data.clinic_logo;

        // console.log('imagePath', this.imageUrl);
      },
      (err)=>{

      }
    )
  }
}


