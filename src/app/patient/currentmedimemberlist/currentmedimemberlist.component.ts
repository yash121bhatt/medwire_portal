import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import { environment } from "src/environments/environment";
import Swal from 'sweetalert2';

interface USERS {
  profile: any;
  name: String;
  age: Number;
  dob:any;
  // mobileno :Number;
  aadharno:Number;
  gender:String 
}


@Component({
  selector: 'app-currentmedimemberlist',
  templateUrl: './currentmedimemberlist.component.html',
  styleUrls: ['./currentmedimemberlist.component.sass']
})
export class CurrentmedimemberlistComponent implements OnInit {
  Users: USERS[] = [
];
datePipe: DatePipe = new DatePipe('en-US');
  user_id: number;
  token: string;
  showAge: number;
  imageURL = `${environment.documentUrl}`;
  constructor(
    private authService : AuthService,
    private patientServiceService : PatientServiceService,
    private route:ActivatedRoute,
    private router : Router
  ) { 
    
  }

  ngOnInit(): void {
    if((this.authService.currentUserValue.address==null || this.authService.currentUserValue.address=='') || (this.authService.currentUserValue.pin_code==null || this.authService.currentUserValue.pin_code=='')){
    
      Swal.fire(
        '',
        `${environment.profileCompleteMessage}`,
        'info'
      )
        this.router.navigate(["/patient/editprofile"]);

    }
    else{

    }

    this.user_id = this.authService.currentUserValue.userid;
    this.token = this.authService.currentUserValue.token;
    const data = { id: this.user_id  };
    this.patientServiceService.members(data).subscribe((result: any)=>{
      this.Users = result.data;

      //Age-Calculator-By-DOB
      const convertAge = new Date(result.data.date_of_birth);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
    }); 
  }

  dateofBirth_to_age(dateofBirth){
    const convertAge = new Date(dateofBirth);
    const timeDiff = Math.abs(Date.now() - convertAge.getTime());
    return Math.floor((timeDiff / (1000 * 3600 * 24))/365);
    
  }
  encryptionData(id){
    return btoa(id);
  }

}
