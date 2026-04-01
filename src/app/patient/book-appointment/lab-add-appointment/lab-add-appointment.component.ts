
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lab-add-appointment',
  templateUrl: './lab-add-appointment.component.html',
  styleUrls: ['./lab-add-appointment.component.sass']
})
export class LabAddAppointmentComponent implements OnInit {
  filterValue: any;
  pin_code: any;
  labData: any;
  memberid: string;
  labId: string;
  labListone: any;
  resultCount: any;
  packageCount: any;
  selectedDevice: any;
  EmpData: any;
  i: any;
  // applyPincode($event: any) {
  //   throw new Error('Method not implemented.');
  // }

  booAppointmentForm: FormGroup;
  user_id: any;
  token: any;
  packageList: any;
  labList: any;
  rows: any;
  userFilter;
  lab_name = [];
  showData: boolean = true;
  memberId: any;
  test_name: [];
  imageURL = `${environment.labDocumentUrl}`;
  timeout: any;
  lab_id: any;
  urlparameter: any;
  cartList: any;
  cartData: any;
  length: number;
  cart_item: any;
  amount: any;
  checkPincodeCondition: boolean = true;
  messageResult: any;
  datapackage: any = [];
  data: any = [];
  total: any;
  pagination1: any;
  labid: string;

  constructor(
    private _formBuilder: FormBuilder,
    private patientServiceService: PatientServiceService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    //Package Paginator
    for (let i = 1; i <= 100; i++) {
      this.datapackage.push(`item ${i}`);
    }

    //Laboratory Paginator
    for (let i = 1; i <= 100; i++) {
      this.data.push(`item ${i}`);
    }

  }

  ngOnInit(): void {



    this.fetch();
    // this.getallCategory();
    this.booAppointmentForm = this._formBuilder.group({
      lab_name: [""],
      package_name: [''],
      test_name: [""],
      pin_code: [""],
      clinic: ["", Validators.required],
      appointmentType: ["", Validators.required],
    });
    this.memberId = this.route.snapshot.paramMap.get('userId');


    //All Lab Test
    this.user_id = this.authService.currentUserValue.userid;
    this.token = this.authService.currentUserValue.token;
    const labData = {
      "lab_name": this.booAppointmentForm.value.lab_name,
      "package_name": this.booAppointmentForm.value.package_name,
      "test_name": this.booAppointmentForm.value.test_name,
      "pin_code": this.booAppointmentForm.value.pin_code,
      // "package_name" :  this.booAppointmentForm.value.package_name,
    }

    this.patientServiceService.allLabTestList(labData).subscribe(

      (result) => {

        this.labList = result.data;
        this.labListone = result.datapackage;
        this.resultCount = result.data.length;
        this.packageCount = result.datapackage.length;

        // console.log(this.labListone);
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
    this.memberId = this.route.snapshot.paramMap.get('userId');

    this.user_id = this.authService.currentUserValue.userid;
    this.labid = this.route.snapshot.paramMap.get('labId');
    const cartData = {
      "created_by_id": this.memberId,
      "lab_id": this.labid,
    }

    // console.log(this.labid);

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


  //Add to Cart API
  selected: { id: number; test_name: string; amount: string; lab_name: string; img: any; checked: boolean; }[];
  addToCart(labid, test_id, test_name, amount, type) {
    this.user_id = this.authService.currentUserValue.userid;
    this.urlparameter = this.route.snapshot.paramMap.get('labId');
    this.memberId = this.route.snapshot.paramMap.get('userId');
    let cartItem = []
    if (type === 'test') {
      cartItem.push(
        {
          test_id: test_id,
          test_name: test_name,
          amount: amount
        }
      )
    } else {
      cartItem.push(
        {
          package_id: test_id,
          test_name: test_name,
          amount: amount
        }
      )
    }
    const labData = {
      "created_by_id": this.memberId,
      "lab_id": labid,
      "cart_item": cartItem,
    }

    this.patientServiceService.addCart(labData).subscribe(
      (result) => {
        this.cartData = result.data;

        if (result.status_code == 200) {
          setTimeout(() => {
            this.router.navigate(["patient/book-appointment/cart-page/" + labid + '/' + this.memberId]);
          }, 500);
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

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    if ((event.target as HTMLInputElement).value.length > 2) {

      this.user_id = this.authService.currentUserValue.userid;
      const testData = {
        "lab_name": this.booAppointmentForm.value.lab_name,
        "package_name": this.booAppointmentForm.value.package_name,
        "test_name": this.booAppointmentForm.value.test_name,
        "pin_code": this.booAppointmentForm.value.pin_code,
        "role_id": '3',
      }

      if ((event.target as HTMLInputElement).value != '') {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {


          this.patientServiceService.allLabTestList(testData).subscribe(
            (result) => {
              this.labList = result.data;
              this.labListone = result.datapackage;
              this.resultCount = result.data.length;
              this.packageCount = result.datapackage.length;
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
        "package_name": '',
        'test_name': '',
        'pin_code': '',
        "role_id": '3',
      }

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {


        this.patientServiceService.allLabTestList(testData).subscribe(
          (result) => {
            this.labList = result.data;
            this.labListone = result.datapackage;
            this.resultCount = result.data.length;
            this.packageCount = result.datapackage.length;
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

  // FIlter Test Code 
  // someMethod(value){
  //   console.log(value);
  // }
  // public variables = [];
  // public filteredList2 = this.variables.slice();

  // getallCategory() {
  //   const labData = {
  //     "lab_id": 14
  //   }

  //   this.patientServiceService.getAllCategories(labData).subscribe(
  //     (result) => {
  //       for (let i = 0; i < result.data.length; i++) {
  //         this.variables.push(result.data[i].test_name);
  //       }

  //       this.filteredList2 = this.variables.slice();
  //     },
  //     (err) => {

  //     }
  //   );
  // }


}

