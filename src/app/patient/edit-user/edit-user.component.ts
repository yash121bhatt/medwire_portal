import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PatientServiceService } from 'src/app/services/patient-service.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from "src/app/core/service/auth.service";
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.sass']
})
export class EditUserComponent {
  private form : FormData;
  editprofiletForm: FormGroup;
  result: any;
  user_id: any;
  token: string;
  Users: any[];
  first_name: any;
  gender: string;
  adhar_card : number;
  date_of_birth: Date;
  profile_image : any;
  createdById : any = this.authService.currentUserValue.userid
  memberId:any = atob(this.route.snapshot.paramMap.get('type'));
  accept: string =".jpeg,.png,.jpg";

  today = new Date();
  imageURL = `${environment.documentUrl}`;
  imageName: any;
  blood_group: any;
  constructor(
    private fb: FormBuilder,
    private patientServiceService : PatientServiceService,
    private route:ActivatedRoute,
    private authService : AuthService,
    private router : Router
    ) {
      
    this.editprofiletForm = this.fb.group({
      first_name: [""],
      gender: ["", [Validators.required]],
      date_of_birth: ["", [Validators.required]],
      profile_image: [""],
      blood_group : ["", [Validators.required]]
    });
  }


  ngOnInit(){
    // console.log('ID is = ',this.route.snapshot.paramMap.get('type'));
    if(this.route.snapshot.paramMap.get('type')== this.authService.currentUserValue.userid){
      this.router.navigate(['/patient/editprofile']);
    }

    const data = { id: atob(this.route.snapshot.paramMap.get('type'))}
    this.patientServiceService.profile(data).subscribe(
      (result) => {
        this.Users = result.data;

        this.first_name = result.data[0].first_name;
        this.gender = result.data[0].gender;
        this.date_of_birth = new Date(result.data[0].date_of_birth);
        this.profile_image = result.data[0].profile_image;
        this.imageName = result.data[0].imgName;
        this.blood_group = result.data[0].blood_group
      },
      (err) => {
        console.log(err);
      }
    );
  }

  async fileChange($event){
    this.profile_image = null;
    if($event && $event.length){
      this.profile_image = $event[0];
    }
  }

  onSubmit() {
    
    if (this.editprofiletForm.invalid) {
      return;
    }
    else{
     
    if(this.createdById==this.memberId){
      this.createdById = 0;
    }
    this.form = new FormData();
    this.form.append('first_name',this.editprofiletForm.value.first_name);
    this.form.append('date_of_birth',this.editprofiletForm.value.date_of_birth);
    this.form.append('gender',this.editprofiletForm.value.gender);
    this.form.append('created_by_id',this.createdById);
    this.form.append('user_id',this.memberId);
    this.form.append('blood_group',this.editprofiletForm.value.blood_group);
    this.form.append('profile_image',this.profile_image);
    this.patientServiceService.editMember(this.form).subscribe (
      (result:any) => {
        this.result = result.data;
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


}
