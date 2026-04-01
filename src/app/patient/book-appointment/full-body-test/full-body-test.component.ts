import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-full-body-test',
  templateUrl: './full-body-test.component.html',
  styleUrls: ['./full-body-test.component.sass']
})
export class FullBodyTestComponent implements OnInit {

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
  cartData: any;
  cartList: any;
totalTest: any;
  memberid: string;
  memberId: string;
test_recommended: any;

  constructor(
    private patientServiceService: PatientServiceService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // this.testDetail();
    this.memberid =this.route.snapshot.paramMap.get('userId');
    
    //Package Detail API
    this.urlparameter = this.route.snapshot.paramMap.get('packageId');
    this.user_id = this.authService.currentUserValue.userid;
    const data = {
      package_id: this.urlparameter,
    };
    this.fetch();

    // console.log(this.packageDetail);
    

    this.patientServiceService.packageDetail(data).subscribe(
      (result) => {
        this.packageDetail = result.data[0];
        this.testData = this.packageDetail.testData ? this.packageDetail.testData : [];
        this.amount = this.packageDetail.amount ? this.packageDetail.amount : '-';
        this.package_name = this.packageDetail.package_name ? this.packageDetail.package_name : '-';
        this.description = this.packageDetail.description ? this.packageDetail.description : '-';
        this.image = this.packageDetail.image ? this.packageDetail.image : '-';
        this.totalTest = this.packageDetail.totalTest ? this.packageDetail.totalTest : '-';
        this.test_recommended = this.packageDetail.test_recommended ? this.packageDetail.test_recommended : '-';
      },
      

      (err) => {
        console.log(err);
      }
      
    );
    
  }

  // testDetail(){
  //   //Lab Test List
  //   this.urlparameter = this.route.snapshot.paramMap.get('testId');
  //   const data = {
  //     test_id: this.urlparameter,
  //   };
  //   this.memberId = this.route.snapshot.paramMap.get('userId');

  //   this.patientServiceService.labTestDetail(data).subscribe(
  //     (result) => {
  //       this.testDetail = result.data;
  //     },

  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }

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

  //Add To Cart API
  addToCart(labid, package_id, test_name, amount , type) {
    this.user_id = this.authService.currentUserValue.userid;
    this.urlparameter = this.route.snapshot.paramMap.get('labId');
    let cartItem = [
      // {
      //   package_id: package_id,
      //   test_name: test_name,
      //   amount: amount
      // }
    ]
    if (type === 'package') {
      cartItem.push(
        {
          package_id: package_id,
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
            this.router.navigate(["patient/book-appointment/cart-page/" + labid+'/'+this.memberid]);
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