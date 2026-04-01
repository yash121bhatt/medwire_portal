import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientdataService } from 'src/app/services/patientdata.service';
import { AuthService } from 'src/app/core/service/auth.service';


@Component({
  selector: 'app-pregnancy-timeline',
  templateUrl: './pregnancy-timeline.component.html',
  styleUrls: ['./pregnancy-timeline.component.sass']
})
export class PregnancyTimelineComponent implements OnInit {
  monthGet: number;
  noofDays: number;

  firsttrimester = false;
  secondtrimester= false;
  thirdtrimester = false;
  first_month    = false;
  second_month   = false;
  third_month    = false;
  fourth_month   = false;
  five_month     = false;
  six_month      = false;
  seven_month    = false;
  eight_month    = false;
  nine_month     = false;
  ten_month      = false;


  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private patientdataService: PatientdataService,
  ) { }

  ngOnInit(): void {
    const singleWomen = {
      "id": atob(this.route.snapshot.paramMap.get('type')),
      "user_id": this.authService.currentUserValue.userid
    }

    this.patientdataService.singleWoman(singleWomen).subscribe(
      (result) => {
      
        const today = new Date().getDate();
       // const convertAge = Date.parse(result.data[0].date_of_pregnancy);
        const convertAge=  new Date(result.data[0].date_of_pregnancy);
      
        const convertMonth= new Date(result.data[0].date_of_pregnancy);
        const timeDiff = Math.abs(Date.now() - convertMonth.getTime());
        this.monthGet = Math.floor(((timeDiff / (1000 * 3600*24))/30) );
        
        if(this.monthGet <= 1){
          this.firsttrimester = true;
          this.first_month    = true;
        }
        else if(this.monthGet == 2){
          this.firsttrimester = true;
          this.second_month    = true;
        }
        else if(this.monthGet == 3){
          this.firsttrimester = true;
          this.third_month    = true;
        }
        else if(this.monthGet == 4){
          this.secondtrimester= true;
          this.fourth_month    = true;
          
        }
        else if(this.monthGet == 5){
          this.secondtrimester= true;
          this.five_month    = true;
        }
        else if(this.monthGet == 6){
          this.secondtrimester= true;
          this.six_month    = true;
        }
      
        else if(this.monthGet == 7){
          this.secondtrimester= true;
          this.seven_month    = true;
        }
        else if(this.monthGet > 7 || this.monthGet <= 8){
          this.thirdtrimester = true;
          this.eight_month    = true;
        }
        else if(this.monthGet > 8 || this.monthGet <= 9){
          this.thirdtrimester = true;
          this.nine_month    = true;
        }
        else if(this.monthGet > 9 ){
          this.thirdtrimester = true;
          this.ten_month    = true;
        }
        else{
          this.thirdtrimester = true;
          this.ten_month    = true;
        }
    
      },
      (err) => {
        console.log(err);
      }
    );

  }

}
