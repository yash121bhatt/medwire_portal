import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/core/service/auth.service';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import { PatientdataService } from 'src/app/services/patientdata.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common'


@Component({
  providers: [DatePipe],
  selector: 'app-radio-payment-method',
  templateUrl: './radio-payment-method.component.html',
  styleUrls: ['./radio-payment-method.component.sass']
})
export class RadioPaymentMethodComponent implements OnInit {

  couponCodeForm: FormGroup;
  hide: boolean = true
  show: boolean = false

  hide1: boolean = true
  show1: boolean = false

  imageURL = `${environment.documentUrl}`;
  imageUrl = `${environment.labDocumentUrl}`;
  apiRoute = `${environment.apiUrl}`

  paymentForm: FormGroup;
  user_id: any;
  DocList: any;
  token: string;
  showAge: any;
  Users: any;
  userName: string;
  userid: any;
  UsersList: any;
  urlparameter: string;
  couponList: any;
  startDate: any;
  endDate: any;
  mytimeSlot: any;
  timeSlot: any;
  timeslots: any;
  bookList: any;
  grand_total_amount: any;
  total_amount: any;
  cart_id: any;
  refer_by_id: any;
  promo_code_id: any;
  member_id: [];

  userlist: any[] = [];
  id: any;
  doctorid: any;
  memberId: any;
  labId: string;
  cartList: any;
  cartData: any;
  pagination2: any;
  total: any;
  data: any = [];
  email_id: any;
  slotsStatus: boolean = false;
  closeResult: string;
  copiedStatus: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private fb: FormBuilder,
    private patientServiceService: PatientServiceService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private patientdataService: PatientdataService,
    private modalService: NgbModal,
    private datepipe : DatePipe
  ) {
    this.couponCodeForm = this.fb.group({
      coupon_data: [""],
    });

    //Coupon Paginator
    for (let i = 1; i <= 100; i++) {
      this.data.push(`item ${i}`);
    }
  }

  ngOnInit(): void {

    this.memberId = this.route.snapshot.paramMap.get('userId');
    this.labId = this.route.snapshot.paramMap.get('labId');

    this.paymentForm = this._formBuilder.group({
      radioButton: ["", Validators.required],
      appointmentDate: ["", Validators.required],
      referBtn: ["", Validators.required],
      doctors: ["", Validators.required],
      familyMember: ["", Validators.required],
    });

    //User Profile
    this.user_id = this.authService.currentUserValue.userid;
    this.token = this.authService.currentUserValue.token;
    this.profileDetail(this.memberId, 'member');
    this.profileDetail(this.user_id, 'user');

    //Users List API
    this.userName = this.authService.currentUserValue.firstName;

    this.userid = this.authService.currentUserValue.userid;
    const userId = {
      "id": this.userid
    }

    this.patientdataService.memberList(userId).subscribe(
      (result) => {
        this.UsersList = result.data;
      },
      (err) => {
        console.log(err);
      }
    );

    //Doctors List API
    this.user_id = this.authService.currentUserValue.userid;
    const doctorList = {
      "user_id": this.user_id,
    }

    this.patientdataService.doctorsList(doctorList).subscribe(
      (result) => {
        this.DocList = result.data;
      },
      (err) => {
        console.log(err);
      }
    );

    // Coupon Code API
    this.user_id = this.authService.currentUserValue.userid;
    this.urlparameter = this.route.snapshot.paramMap.get('labId');
    const couponCode = {
      "created_by_id": this.route.snapshot.paramMap.get('labId'),

    }

    this.patientServiceService.couponApi(couponCode).subscribe(

      (result) => {

        this.couponList = result.data;

        if (result.status_code == 200) {

        }

      },
      (err) => {
        console.log(err);
        Swal.fire(
          '',
          err.message,
          'error'
        )
      });

    //Booking Summary
    this.user_id = this.authService.currentUserValue.userid;
    this.bookingSummary();
  }

  todayDate: Date = new Date();

  setDate(date, e) {
    date === "start" ? (this.startDate = e) : (this.endDate = e);
  }
  buttonValue(timeSlot) {
    this.mytimeSlot = timeSlot;

  }

  profileDetail(id, type) {
    let data = { id: id };


    this.patientdataService.profile(data).subscribe(
      (result) => {
        if (type == "user") {
          this.email_id = result.data[0].email;

        } else {
          if (result.data[0].date_of_birth != null) {
            const convertAge = new Date(result.data[0].date_of_birth);
            const timeDiff = Math.abs(Date.now() - convertAge.getTime());
            this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
          }
          else {
            this.showAge = '-';
          }
          this.Users = result.data;

        }


      },
      (err) => {
        console.log(err);
      }
    );
  }

  //date n time slot
  appointmentSlot(e) {
    var startDDate = e.startDate;
    var modifiedDate = e.toString().slice(4,15);


    this.user_id = this.authService.currentUserValue.userid;
    this.urlparameter = this.route.snapshot.paramMap.get('labId');
    const dateTime = {
      "appoin_date":  this.datepipe.transform(modifiedDate, 'dd-MM-yyyy')+'T00:00:00.000Z',
      "user_id": this.urlparameter,
    }

    this.patientServiceService.checkDatetime(dateTime).subscribe(

      (result) => {

        this.timeSlot = result.data;
        this.timeslots = result.Remaining_Slots;

        if (this.timeslots.length == 0) {
          this.slotsStatus = true;
        }

      },
      (err) => {
        console.log(err);
        Swal.fire(
          '',
          err.message,
          'error'
        )
      });
  }

  bookingSummary() {
    const bookingBlk = {
      "created_by_id": this.memberId,
    }
    this.patientServiceService.bookingSummary(bookingBlk).subscribe(

      (result) => {

        this.bookList = result.data;
        this.cartList = result.data[0].cart_item;

        // console.log('Booking Summary', this.bookList);


        if (result.status_code == 200) {
          this.grand_total_amount = result.data[0].grand_total_amount;
          this.total_amount = result.data[0].total_amount;
          this.cart_id = result.data[0].cart_id;
          this.refer_by_id = result.data[0].user_id;
          this.promo_code_id = result.data
        }


      },
      (err) => {
        console.log(err);
        Swal.fire(
          '',
          err.message,
          'error'
        )
      });

  }


  //Delete Item
  customWithFunction(i) {
    Swal.fire({
      text: "Are you sure you want to remove the test from the Cart ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it",
    }).then((result) => {
      if (result.value) {
        Swal.fire("", "Your Test has been removed.", "success");
        this.cartList.splice(i, 1);
        this.user_id = this.authService.currentUserValue.userid;
        this.labId = this.route.snapshot.paramMap.get('labId');
        this.memberId = this.route.snapshot.paramMap.get('userId');
        const labData = {
          "created_by_id": this.memberId,
          "lab_id": this.labId,
          "cart_item": this.cartList
        }
        this.patientServiceService.addCart(labData).subscribe(
          (result) => {
            this.cartData = result.data;
            if (result.status_code == 200) {
              this.bookingSummary();
            }

          },
          (err) => {
            console.log(err);
            Swal.fire(
              '',
              err.message,
              'error'
            )
          });

      }
    });


  }

  //Refer by Doctor or Self
  onclick() {
    this.hide = !this.hide;
    this.show = !this.show
  }
  
  memberClick() {
    this.hide1 = !this.hide1;
    this.show1 = !this.show1
  }

  //Member Id
  getArray(id) {
    this.userlist.push(id);
  }

  //Doctor Id
  doctorId(id) {
    this.doctorid = id;
  }

  showBasicMessage() {
    Swal.fire("<p>Your appointment Has been booked!</p>");
  }

  //Apply Coupon Code API In Booking Summary
  appyleCouponCode() {
    this.memberId = this.route.snapshot.paramMap.get('userId');
    this.urlparameter = this.route.snapshot.paramMap.get('labId');
    const bookingBlk = {
      "created_by_id": this.memberId,
      "coupon_code": this.couponCodeForm.value.coupon_data,
    }
    if (this.couponCodeForm.value.coupon_data == '' || this.couponCodeForm.value.coupon_data == null || this.couponCodeForm.value.coupon_data == undefined) {
      Swal.fire(
        '',
        "Please enter a valid Coupon Code",
        'error'
      )
    } else {
      this.patientServiceService.bookingSummary(bookingBlk).subscribe(

        (result) => {

          this.bookList = result.data;
          this.grand_total_amount = this.bookList[0].grand_total_amount;
          // console.log('Apply', this.bookList);

          if (result.status == "success") {
            Swal.fire(
              'Coupon code applied successfully!',
              result.message,
              'success'
            )

          }

        },
        (err) => {
          console.log('error', err);
          Swal.fire(
            '',
            err,
            'error'
          )
        });
    }

  }

  //Add Appointment API
  addAppointment() {
    this.user_id = this.authService.currentUserValue.userid;
    this.urlparameter = this.route.snapshot.paramMap.get('labId');
    this.memberId = this.route.snapshot.paramMap.get('userId');
    const appointmentData = {
      "user_id": this.urlparameter,
      "refer_by_id": this.doctorid,
      "promo_code_id": this.promo_code_id,
      "created_by_id": this.memberId,
      "cart_id": this.cart_id,
      "member_id": this.userlist,
      "from_time": this.mytimeSlot,
      "appointment_date": this.startDate,
      "total_amount": this.total_amount,
      "grand_total": this.grand_total_amount
    }
    this.patientServiceService.addAppointment(appointmentData).subscribe(
      (result) => {


        // const detail = 'total_amount='+this.grand_total_amount+'&&appointment_id='+result.data.id+'&&email='+this.email_id+'&&type=radio_patient_appointment';

        //   const url = this.apiRoute+'auth/payment-appointment?detail='+btoa(detail);
        //   window.location.href = url;
        window.location.href = result.data.url;

        // console.log('Payment url',result.data.url);

        if (result.status == "success") {
          Swal.fire(
            '',
            result.message,
            'success'
          )

        }
      },
      (err) => {
        Swal.fire(
          '',
          err,
          'error'
        )
      });
  }

  copyText(text: any) {
    this.copiedStatus = true;
    navigator.clipboard.writeText(text).catch(() => {
      console.error("Unable to copy text");
    });

    setTimeout(() => {
      this.copiedStatus = false;

    }, 3000);

  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReasonn(reason)}`;
    });
  }

  private getDismissReasonn(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}