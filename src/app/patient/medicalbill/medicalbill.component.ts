import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { PatientdataService } from 'src/app/services/patientdata.service';
import { environment } from "src/environments/environment";
import Swal from 'sweetalert2';

interface USERS {
  profile: any;
  name: String;
  age: Number;
  dob:any;
  mobileno :Number;
  aadharno:Number;
  gender:String
 
}
@Component({
  selector: 'app-medicalbill',
  templateUrl: './medicalbill.component.html',
  styleUrls: ['./medicalbill.component.sass']
})
export class MedicalbillComponent implements OnInit {
  Users: USERS[] = [];

  imageURL = `${environment.documentUrl}`;
  showAge:number;
  userid:number;

  constructor(
  private authService:AuthService,
  private patientdataService:PatientdataService,
  private router : Router
  ) { }

  ngOnInit(): void {
    
    if((this.authService.currentUserValue.address==null || this.authService.currentUserValue.address=='') || (this.authService.currentUserValue.pin_code==null || this.authService.currentUserValue.pin_code=='')){
    
      Swal.fire(
        '',
        `${environment.profileCompleteMessage}`,
        'info'
      )
        this.router.navigate(["/patient/editprofile"])
    }
    else{
  
    }

    this.userid = this.authService.currentUserValue.userid;
    const userId = {
      "id": this.userid
    }
    this.patientdataService.memberList(userId).subscribe(
      (result) => {
        this.Users = result.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  CalculateAge(dateofbirth) {
    if (dateofbirth) {
      const convertAge = new Date(dateofbirth);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
      return this.showAge;
    }
  }

  encryptionData(id){
   return btoa(id);
  }
}
