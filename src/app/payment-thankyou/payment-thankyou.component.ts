import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-payment-thankyou',
  templateUrl: './payment-thankyou.component.html',
  styleUrls: ['./payment-thankyou.component.sass']
})
export class PaymentThankyouComponent implements OnInit {

  constructor(
    private router : Router,
    private activatedRoute : ActivatedRoute
  ) { 

  }

  ngOnInit(): void {
    
    Swal.fire(
      '',
      'Payment Success !',
      'success'
    )
    setTimeout(() => {
      
      //this.router.navigate(["/patient/myprofile"]);
      this.router.navigate(["/patient/book-appointment/appointment-list"]).then(() => {
        // window.location.reload();
       });
    }, 5000);
  }

}
