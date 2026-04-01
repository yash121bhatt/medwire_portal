import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-single-body-test',
  templateUrl: './single-body-test.component.html',
  styleUrls: ['./single-body-test.component.sass']
})
export class SingleBodyTestComponent implements OnInit {
  user_id: any;
  packageDetail: any;
  imageURL = `${environment.labDocumentUrl}`;
  testData: any;
  amount: any;
  package_name: any;
  description: any;
  images: any;
  image: any;
  urlparameter: string;
  test_id: any;
  testDetail: any;
  cartData: any;
  cartList: any;
  labList: any;
  labid: any;
  memberId: any;
  // showDiv : boolean = false;
  // hideDiv : boolean = false;
  role_id: any;
  lab_id: string;
  user_role_id: any;

  constructor(
    private patientServiceService: PatientServiceService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    //Lab Test List
    this.urlparameter = this.route.snapshot.paramMap.get('testId');
    const data = {
      test_id: this.urlparameter,
    };
    this.memberId = this.route.snapshot.paramMap.get('userId');

    this.patientServiceService.labTestDetail(data).subscribe(
      (result) => {
        this.testDetail = result.data;
      },

      (err) => {
        console.log(err);
      }
    );

  }

  // showBlock(){
  //   if(this.user_role_id == 3){
  //     this.showDiv == true;
  //   } else {
  //     this.showDiv == false;
  //   }
  // }

  fetch() {
    //Cart Items
    this.user_id = this.authService.currentUserValue.userid;
    this.urlparameter = this.route.snapshot.paramMap.get('labId');
    const cartData = {
      "created_by_id": this.user_id,
      "lab_id": this.labid,
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

  addToCart(labid, test_id, test_name, amount ,type) {
    this.user_id = this.authService.currentUserValue.userid;
    this.urlparameter = this.route.snapshot.paramMap.get('labId');
    let cartItem = [
      // {
      //   test_id: test_id,
      //   test_name: test_name,
      //   amount: amount
      // }
    ]
    if (type === 'test') {
      cartItem.push(
        {
          test_id: test_id,
          test_name: test_name,
          amount: amount
        }
      )
    } else {
      // cartItem.push(
      //   {
      //     package_id: test_id,
      //     test_name: test_name,
      //     amount: amount
      //   }
      // )
    }
    const labData = {
      "created_by_id": this.user_id,
      "lab_id": labid,
      "cart_item": cartItem,
    }

    this.patientServiceService.addCart(labData).subscribe(
      (result) => {
        this.cartData = result.data;

        if (result.status_code == 200) {
          setTimeout(() => {
            this.router.navigate(["patient/book-appointment/cart-page/" + this.testDetail[0].lab_id + '/' + this.memberId]);
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


}