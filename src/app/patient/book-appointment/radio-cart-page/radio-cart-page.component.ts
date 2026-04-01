import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-radio-cart-page',
  templateUrl: './radio-cart-page.component.html',
  styleUrls: ['./radio-cart-page.component.sass']
})
export class RadioCartPageComponent implements OnInit {

  selectedStatus: number;
  testgroup: FormGroup
  ReadMore: boolean = true
  visible: boolean = false
  user_id: any;
  cartListone: any;
  cartList: any;
  urlparameter: any;
  labList: any;
  cartData: any;
  length: number;
  imageURL = `${environment.labDocumentUrl}`;
  memberId: any;

  constructor(
    private _formBuilder: FormBuilder,
    private patientServiceService: PatientServiceService,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.testgroup = this._formBuilder.group({
      lab_test: ["", Validators.required],
    });

    this.fetch();
    this.memberId = this.route.snapshot.paramMap.get('userId');
  }

  onclick() {
    this.ReadMore = !this.ReadMore; //not equal to condition
    this.visible = !this.visible

    //test list api
    this.urlparameter = this.route.snapshot.paramMap.get('labId');
    this.user_id = this.authService.currentUserValue.userid;
    this.memberId = this.route.snapshot.paramMap.get('userId');
    const labData = {
      "created_by_id": this.memberId,
      "lab_id": this.urlparameter,
    }

    this.patientServiceService.labTestList(labData).subscribe(
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
    this.memberId = this.route.snapshot.paramMap.get('userId');
    this.urlparameter = this.route.snapshot.paramMap.get('labId');
    const cartData = {
      "created_by_id": this.memberId,
      "lab_id": this.urlparameter
    }

    this.patientServiceService.cartItem(cartData).subscribe(
      (result) => {
        this.cartListone = result.data;
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
  selected: { id: number; name: string; fee: string; lab_name: string; img: any; checked: boolean; }[];
  add() {
    var t = this.labList
      .filter(opt => opt.checked)
      .map(opt => opt);
    this.selected = t;

    //cart api
    this.length = this.selected.length;
    this.user_id = this.authService.currentUserValue.userid;
    this.urlparameter = this.route.snapshot.paramMap.get('labId');
    this.memberId = this.route.snapshot.paramMap.get('userId');
    for (let i = 0; i < this.cartList.length; i++) {
      this.selected.push(this.cartList[i]);
    }



    const labData = {
      "created_by_id": this.memberId,
      "lab_id": this.urlparameter,
      "cart_item": this.selected
    }

    this.patientServiceService.addCart(labData).subscribe(
      (result) => {
        this.cartData = result.data;
        if (result.status_code == 200) {
          Swal.fire(
            'Item added in cart',
            result.message,
            'success'
          )
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

  //Delete Item
  customWithFunction(i) {
    Swal.fire({
      text: "Are you sure you want to remove this test from the Cart ?",
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
        this.urlparameter = this.route.snapshot.paramMap.get('labId');
        this.memberId = this.route.snapshot.paramMap.get('userId');

        const labData = {
          "created_by_id": this.memberId,
          "lab_id": this.urlparameter,
          "cart_item": this.cartList
        }
        this.patientServiceService.addCart(labData).subscribe(
          (result) => {
            this.cartData = result.data;
            if (result.status_code == 200) {
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
    });


  }


}
