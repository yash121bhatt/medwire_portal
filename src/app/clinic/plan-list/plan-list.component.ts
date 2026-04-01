import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import Swal from 'sweetalert2';
import moment from 'moment';
import { Alert } from 'selenium-webdriver';
import { environment } from 'src/environments/environment';
import { PatientdataService } from 'src/app/services/patientdata.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.sass']
})
export class PlanListComponent implements OnInit {
  role: any = "clinic";
  user_id: any;
  // moment: any = moment;
  price: any;
  activePlan: Boolean = false;
  activePrice: any;
  activePlan_name: any;
  activeBenefit: any;
  activeValidity: any;
  activeDescription: any;
  activePlanId: any;
  purchasedAt: any;
  plans: any;
  expiresIn: any;
  expiredAt: any;
  remainigDaysMessage: Boolean = false;
  remainigReportMessage: Boolean = false;
  expiredMessage: Boolean = false;
  totalRemaining: any;
  grand_total_amount: any;
  apiRoute: any = `${environment.apiUrl}`
  email_id: any;
  planId: any;
  closeResult: string;
  error_message: boolean = false;
  error_message_text: string;

  constructor(private authService: AuthService, private modalService: NgbModal, private patientdataService: PatientdataService, private patientService: PatientServiceService) { }

  getPlanId(planId) {
    this.planId = planId
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  planList() {
    let data = {
      role: this.role,
      user_id: this.user_id
    }
    this.patientService.planList(data).subscribe((result) => {
      let active = result.data[0];
      this.plans = result.listdata;
      //  for(let i = 0 ;i<planList.length ;i++){
      //   if(planList[i].payment_status != "Pending"){
      //      this.plans.push(planList[i]);
      //   }
      //  }
      if (active) {
        this.activePlan = true;
        this.activePrice = active.price;
        this.activePlanId = active.plan_purchase_id;
        this.activePlan_name = active.plan_name;
        this.activeBenefit = active.benefit;
        this.activeValidity = active.validity;
        this.activeDescription = active.description;
        this.purchasedAt = active.purchased_at;
        this.expiredAt = active.expired_at;
        this.totalRemaining = active.total_limit;
        this.expiresIn = this.expiryDate(this.expiredAt, this.activeValidity)

        console.log('expire', this.expiresIn);
        if (this.totalRemaining > 0) {
          this.remainigReportMessage = true
        }
        if (this.expiresIn > 0) {

          this.remainigDaysMessage = true;
          //    alert("Your Plan will be expire in "+this.expiresIn+" days . Please renew your plan or purchase any other plan!");
        }
        if (this.expiresIn == 0) {
          this.expiredMessage = true;
          //    alert("Your Plan is Expired . Please renew your plan or purchase any other plan!");
        }
        //  console.log("Days remaining = " + this.expiryDate(this.expiredAt));        
      }
    })
  }

  expiryDate(date_string, duration) {
    var getDuration = duration.split(' ');
    console.log('------', getDuration);
    var expiration = moment(date_string).format("YYYY-MM-DD");
    var current_date = moment()
    var days = moment(expiration).diff(current_date, 'days');
    // console.log("----->",days)
    if (getDuration[1] == 'day') {
       days = days + 2;
    } else if (getDuration[1] == 'Month') {
       days = days + 2;
    } else if (getDuration[1] == 'Year') {
       days = days + 2;
    } else {

    }
    // console.log("<------",days)

    if (days < 0) {
      days = 0;
    }
    return days;
  }



  ngOnInit(): void {
    this.user_id = this.authService.currentUserValue.userid
    this.profile();
    this.planList();
    // var getDuration = function (month, year) {
    //   return new Date(year, month, 0).getDate();
    // };
    // console.log("Days in July: " + getDuration(7, 2012)); // July month
    // console.log("<br>Days in September: " + getDuration(9, 2012));
  }

  profile() {
    const data = { id: this.user_id };
    // console.log('---------',data);
    this.patientdataService.profile(data).subscribe(
      (result) => {
        this.email_id = result.data[0].email
      },
      (err) => {
        console.log(err);
      }
    );

  }
  purchasePlan() {
    let data = {
      plan_id: this.planId,
      user_id: this.user_id
    }
    this.patientService.purchasePlan(data).subscribe(
      (result) => {
        if (result.status_code == 200) {
          window.location.href = result.url;
        }
      },
      (err) => {
        Swal.fire(
          '',
          err,
          'error'
        )
      })
  }

  renewPlan() {
    let data = {
      plan_purchase_id: this.planId
    }
    this.patientService.renewPlan(data).subscribe(
      (result) => {
        if (result.status_code == 200) {
          window.location.href = result.url;
        }
      },
      (err) => {
        Swal.fire(
          '',
          err,
          'error'
        )
      })
  }

}

