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
  selector: 'app-discharge-summary',
  templateUrl: './discharge-summary.component.html',
  styleUrls: ['./discharge-summary.component.sass']
})
export class DischargeSummaryComponent {
  Users: USERS[] = [{
    "profile": "assets/images/user/usrbig1.jpg",
    "name": "Leanne Graham ",
    "age": 17,
    "dob": "10/11/2005",
    "mobileno":8574968530,
    "aadharno":45458645789,
    "gender":"female"

  },{
    "profile": "assets/images/user/usrbig1.jpg",
    "name": "Graham",
    "age": 22,
    "dob": "10/11/2001",
    "mobileno":8574968579,
    "aadharno":454586458887,
    "gender":'Male'
  },{
    "profile": "assets/images/user/usrbig1.jpg",
    "name": "Jay",
    "age": 25,
    "dob": "10/12/1997",
    "mobileno":8574968503,
    "aadharno":454586458889,
    "gender":'Male'
  },{
    "profile": "assets/images/user/usrbig1.jpg",
    "name": "Anish",
    "age": 35,
    "dob": "10/12/1987",
    "mobileno":857222203,
    "aadharno":154588858889,
    "gender":'Male'
  },{
    "profile": "assets/images/user/usrbig1.jpg",
    "name": "Maya",
    "age": 15,
    "dob": "10/12/2004",
    "mobileno":2555222203,
    "aadharno":100088858889,
    "gender":'Male'
  },{
    "profile": "assets/images/user/usrbig1.jpg",
    "name": "Rahul",
    "age": 15,
    "dob": "18/12/2004",
    "mobileno":2885222203,
    "aadharno":100080088900,
    "gender":'Male'
  }
]; 

imageURL = `${environment.documentUrl}`;
showAge:number;
userid:number;


  constructor(
    private authService:AuthService,
    private patientdataService:PatientdataService,
    private router:Router
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
