import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
// import { RouterLink } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.sass']
})
export class AddProfileComponent {
  private form : FormData;
  addprofiletForm: FormGroup;
  spinner: any;
  result: any;
  fileToUpload : File = null; 
  imageUrl: string = "/assets/images/woman.png";
  user_id: any;
  token: any;
  status_code: any;

  tableForm: FormGroup;
  profile_image : any;
  // createdById : any = this.authService.currentUserValue.userid
  // memberId:any = this.route.snapshot.paramMap.get('type');
  accept: string =".jpeg,.png,.jpg";
  first_name:any;

  final_selected_data = [{ variant_sku: '' }, { variant_sku: '' }]

  // form: FormGroup;

  today = new Date(); 
  
  
  constructor(
    private fb: FormBuilder,
    // private authService : AuthService,
    private patientServiceService : PatientServiceService,
    private authService : AuthService,
    private router : Router,
    private http: HttpClient,
    private route:ActivatedRoute,
    ) {
    this.addprofiletForm = this.fb.group({
      first_name: [""],
      gender: ["", [Validators.required]],
      dob: ["", [Validators.required]],
      profile_image: ["",[Validators.required]],
      blood_group: ["",[Validators.required]],
    });
    
  }

  ngOnInit(){
    this.tableForm = this.fb.group({
      arr: this.fb.array([])
    })
    let arr = this.tableForm.get('arr') as FormArray;
    for (let i = 0; i < this.final_selected_data.length; i++) {
      arr.push(this.fb.group({
        variant_sku: [this.final_selected_data[i].variant_sku, [Validators.required]]
      }))
    }
  }

  async fileChange($event){
    this.profile_image = null;
    if($event && $event.length){
      this.profile_image = $event[0];
    }
  }
  
  onSubmit(_data : {}) {
    
    // console.log('Name = ',this.addprofiletForm.value.first_name);
    
    this.form = new FormData();
    this.form.append('first_name',this.addprofiletForm.value.first_name);
    this.form.append('date_of_birth',this.addprofiletForm.value.dob);
    this.form.append('gender',this.addprofiletForm.value.gender);
    this.form.append('created_by_id',this.authService.currentUserValue.userid);
     this.form.append('blood_group',this.addprofiletForm.value.blood_group);
    this.form.append('profile_image',this.profile_image);
    this.patientServiceService.addmember(this.form).subscribe (
      (result) => {
        if(result.status_code == 200){
          setTimeout(()=> {
            this.router.navigate(['/patient/profile-list']);
          }, 600 );

        }
        Swal.fire(
          '',
          result.message,
          'success'
        )
        
      }, 
      (err) => {
        console.log(err);
        Swal.fire(
          '',
          err,
          'error'
        )
      } ) ;

    }
    
  }

  // handleFileInput(file : FileList) {
  //   this.fileToUpload = file.item(0);

  //   var reader = new FileReader();
  //   reader.onload = (event:any) => {
  //     this.imageUrl = event.target.result;
  //   }
  //   reader.readAsDataURL(this.fileToUpload);

    
  // }

