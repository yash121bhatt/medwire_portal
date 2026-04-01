import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-radio-add-appointment',
  templateUrl: './radio-add-appointment.component.html',
  styleUrls: ['./radio-add-appointment.component.sass']
})
export class RadioAddAppointmentComponent implements OnInit {

  booAppointmentForm: FormGroup;
  user_id: any;
  labList: any;
  timeout: any;
  token: string;
  imageURL = `${environment.labDocumentUrl}`;
  urlparameter: string;
  cartList: any;
  cartData: any;
  memberId: any;
  resultCount: any;
  pagination2: any;
  total: any;
  data : any = [];

  constructor(
    private _formBuilder: FormBuilder,
    private patientServiceService: PatientServiceService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    for (let i = 1; i <= 100; i++) {
      this.data.push(`item ${i}`);
    }
  }

  ngOnInit(): void {

    this.booAppointmentForm = this._formBuilder.group({
      lab_name: [""],
      test_name: [""],
      pin_code: [""],
      clinic: ["", Validators.required],
      appointmentType: ["", Validators.required],
    });
    this.memberId = this.route.snapshot.paramMap.get('userId');
    this.urlparameter = this.route.snapshot.paramMap.get('labId');
    //All Radiology Test
    this.user_id = this.authService.currentUserValue.userid;
    this.token = this.authService.currentUserValue.token;
    const labData = {
      "lab_name": this.booAppointmentForm.value.lab_name,
      "role_id": '4',
    }
    this.patientServiceService.allLabTestList(labData).subscribe(

      (result) => {

        this.labList = result.data;
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
  }

  fetch() {
    //Cart Items
    this.user_id = this.authService.currentUserValue.userid;
    this.urlparameter = this.route.snapshot.paramMap.get('labId');
    const cartData = {
      "created_by_id": this.user_id,
      "lab_id": this.urlparameter,
    }

    this.patientServiceService.cartItem(cartData).subscribe(
      (result) => {
        this.cartList = result.data[0].cart_item;
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
  }
  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    if ((event.target as HTMLInputElement).value.length > 2) {

      this.user_id = this.authService.currentUserValue.userid;
      const testData = {
        "lab_name": this.booAppointmentForm.value.lab_name,
        "test_name": this.booAppointmentForm.value.test_name,
        "pin_code": this.booAppointmentForm.value.pin_code,
        "role_id": '4',
      }

      if ((event.target as HTMLInputElement).value != '') {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {


          this.patientServiceService.allLabTestList(testData).subscribe(
            (result) => {
              this.labList = result.data;
              this.resultCount = result.data.length;
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
        }, 300);
      }
    }
    else {

      const testData = {
        "lab_name": '',
        'test_name': '',
        'pin_code': '',
        "role_id": '4',
      }

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {


        this.patientServiceService.allLabTestList(testData).subscribe(
          (result) => {
            this.labList = result.data;
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
      }, 300);

    }
  }

  // applytestName(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;

  //   //All Lab Test
  //   this.user_id = this.authService.currentUserValue.userid;
  //   const testData = {
  //     "test_name": this.booAppointmentForm.value.test_name,
  //   }

  //   if ((event.target as HTMLInputElement).value != '') {
  //     clearTimeout(this.timeout);
  //     this.timeout = setTimeout(() => {


  //       this.patientServiceService.allLabTestList(testData).subscribe(
  //         (result) => {
  //           this.labList = result.data;
  //           if (result.status_code == 200) {

  //           }

  //         },
  //         (err) => {
  //           console.log(err);
  //           Swal.fire(
  //             '',
  //             err.message,
  //             'error'
  //           )
  //         });
  //     }, 300);
  //   }


  // }

  // applypincode(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;

  //   //All Lab Test
  //   this.user_id = this.authService.currentUserValue.userid;
  //   const testData = {
  //     "pin_code": this.booAppointmentForm.value.pin_code,
  //   }

  //   if ((event.target as HTMLInputElement).value != '') {
  //     clearTimeout(this.timeout);
  //     this.timeout = setTimeout(() => {


  //       this.patientServiceService.allLabTestList(testData).subscribe(
  //         (result) => {
  //           this.labList = result.data;
  //           if (result.status_code == 200) {

  //           }

  //         },
  //         (err) => {
  //           console.log(err);
  //           Swal.fire(
  //             '',
  //             err.message,
  //             'error'
  //           )
  //         });
  //     }, 300);
  //   }


  // }

  addToCart(labid, test_id, test_name, amount) {
    this.user_id = this.authService.currentUserValue.userid;
    this.urlparameter = this.route.snapshot.paramMap.get('labId');
    this.memberId = this.route.snapshot.paramMap.get('userId');
    let cartItem = [
      {
        test_id: test_id,
        test_name: test_name,
        amount: amount
      }
    ]
    const labData = {
      "created_by_id": this.memberId,
      "lab_id":labid,
      "cart_item": cartItem,
    }

    // console.log('lab id',this.urlparameter);
    

    this.patientServiceService.addCart(labData).subscribe(
      (result) => {
        this.cartData = result.data;

        if (result.status_code == 200) {
          setTimeout(() => {
            this.router.navigate(["patient/book-appointment/radio-cart-page/" + labid + '/' + this.memberId]);
          }, 300);
        }
        this.fetch();
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

}