import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from "@angular/material/table";
import { AuthService } from 'src/app/core/service/auth.service';
import { ClinicServiceService } from 'src/app/services/clinic-service.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';


export interface PeriodicElement {
  plan_for:string;
  plan_name: string;
  price: string;
  validity: string;
  benefit:string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {
    plan_for: "Clinic",
    plan_name: "Standard",
    price: "₹ 39.95",
    validity: "1 Month",
    benefit:"20 user",
  },
  {
    plan_for: "Laboratory",
    plan_name: "Premium",
    price: "₹ 39.95",
    validity: "3 Month",
    benefit:"40 reports",
  },
  {
    plan_for: "Laboratory",
    plan_name: "Basic",
    price: "₹ 39.95",
    validity: "Free",
    benefit:"55 reports",
  },
  {
    plan_for: "Radiology",
    plan_name: "Premium",
    price: "₹ 39.95",
    validity: "3 Month",
    benefit:"45 reports",
  },
  {
    plan_for: "Radiology",
    plan_name: "Standard",
    price: "₹ 39.95",
    validity: "1 Month",
    benefit:"70 reports",
  },
  {
    plan_for: "Radiology",
    plan_name: "Basic",
    price: "₹ 39.95",
    validity: "Free",
    benefit:"30 reports",
  },
  {
    plan_for: "Standard",
    plan_name: "Basic",
    price: "₹ 39.95",
    validity: "Free",
    benefit:"benefit",
  },
];

@Component({
  selector: 'app-plan-details',
  templateUrl: './plan-details.component.html',
  styleUrls: ['./plan-details.component.sass']
})
export class PlanDetailsComponent implements OnInit {

  @ViewChild('empTbSort') empTbSort = new MatSort();
  ngAfterViewInit() {
    this.dataSource3.sort = this.empTbSort;
  }

  closeResult: string;
  deleteId: number;
  error_message: boolean = false;
  error_message_text: string;

  displayedColumns: string[] = [
    "no",
    "plan_name",
    "price",
    "validity",
    "benefit",
    "action",
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource3 = new MatTableDataSource();
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    private authService : AuthService,
    private clinicServiceService : ClinicServiceService,
    private modalService: NgbModal,
    private route: ActivatedRoute,

  ) {

  }

  
  ngOnInit() {
    const dataplan = {
      "role": "clinic"
  }

   this.clinicServiceService.getallPlan(dataplan).subscribe(
    (result)=>{
      this.dataSource3 = new MatTableDataSource(result.data);
      this.dataSource3.sort = this.empTbSort;
      this.dataSource3.paginator = this.paginator;
    },
    (err)=>{

    }
   );
  }

    // Pop delete Code here
    open(content) {

      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
    getId(Id:number) {
      // console.log(Id);
      this.deleteId = Id;
    }
    deleteRecord() {
  
      // const deleteData = {
      //   "plan_id": this.deleteId,
  
      // };
      // console.log('delete = ', deleteData);
  
      // this.adminService.deleteplan(deleteData).subscribe(
      //   (result) => {
      //     Swal.fire(
      //       '',
      //       result.message,
      //       'success'
      //     )

      //     this.ngOnInit();
      //   },
      //   (err) => {
      //     Swal.fire(
      //       '',
      //       err,
      //       'error'
      //     )
      //     //this.error_message= true;
      //     //this.error_message_text=err;
      //   }
      // );
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
}
