import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from '@angular/material/sort';
import { ClinicServiceService } from "src/app/services/clinic-service.service";
import { AuthService } from "src/app/core/service/auth.service";
import Swal from "sweetalert2";
import {  Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
export interface PeriodicElement {
  no:number;
  profile_image: any;
  full_name: string;
  gender: string;
  date_of_birth: string;
  mobile_number: number;
  aadhar_card_number: number;
  email: string;
  role: string;
  actions: any;
}
let ELEMENT_DATA: PeriodicElement[] = [
  // {
  //   no: 1,
  //   img: "assets/images/user/clinic_doc.jpg",
  //   full_name: "John Doe",
  //   gender: "Male",
  //   dob: "21/05/1994",
  //   mobile_no: 7858585485,
  //   adharcardno: 123456789540,
  //   email: "test@example.com",
  //   role: "Receptionist",
  //   actions: " ",
  // },
  // {
  //   no: 2,
  //   img: "assets/images/user/user_2.jpeg",
  //   full_name: "Hinata Hyuga",
  //   gender: "Female",
  //   dob: "12/02/1887",
  //   mobile_no: 8989545658,
  //   adharcardno: 745458568585,
  //   email: "hyugahin@example.com",
  //   role: "Prescription Writer",
  //   actions: " ",
  // },
  // {
  //   no: 3,
  //   img: "assets/images/user/doctor.jpg",
  //   full_name: "Rose Barn",
  //   gender: "Female",
  //   dob: "12/02/1887",
  //   mobile_no: 9896584585,
  //   adharcardno: 459671326548,
  //   email: "barnrose@example.com",
  //   role: "Receptionist",
  //   actions: " ",
  // },
  
];

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.sass']
})
export class StaffListComponent implements OnInit {
  //mat-tablle-filter
  imageURL = `${environment.documentUrl}`;
  @ViewChild('empTbSort') empTbSort = new MatSort();
  sort: MatSort;
  urlparameter: any;
  rows : [];
  closeResult: string;
  deleteId: number;
   user_id : any;
   error_message:boolean = false;
  error_message_text:string;
  ngAfterViewInit() {
    this.dataSource3.sort = this.empTbSort;
  }
  displayedColumns: string[] = [
    "no",
    "profile_image",
    "full_name",
    "gender",
    "date_of_birth",
    "mobile_number",
    "email",
    "role",
    "actions",
  ];
  // dataSource = ELEMENT_DATA;
  // dataSource2 = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA); 
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource3 = new MatTableDataSource(ELEMENT_DATA);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    private router :Router ,   
    private modalService: NgbModal,
    private clinicService : ClinicServiceService , 
    private authService : AuthService) {}
  ngOnInit() {
    if((this.authService.currentUserValue.address==null || this.authService.currentUserValue.address=='') || (this.authService.currentUserValue.pin_code==null || this.authService.currentUserValue.pin_code=='')){
      Swal.fire(
        '',
        `${environment.profileCompleteMessage}`,
        'info'
      )
      this.router.navigate(["/clinic/clinic-editmyprofile"]);
  
    }
    else{
  
    }
     this.fetch();
  }

  fetch() {
    let clinic_id =   this.authService.currentUserValue.userid;
    let data = {
       clinic_id : clinic_id
    }
    this.clinicService.staffList(data).subscribe((result) => {
        this.rows = result.data;
        this.dataSource3 = new MatTableDataSource(this.rows);
        this.dataSource3.paginator = this.paginator;
        this.dataSource3.sort = this.empTbSort;
    }, 
    (err) => {
      console.log(err);
    })
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  getdeleteID(Id){
    this.deleteId= Id;
  }

  deleteRecord(){
    const data = { 
      staff_id : this.deleteId
    };
   this.clinicService.deleteStaff(data).subscribe(
    (result)=>{
      setTimeout(()=> {
        this.fetch();
        //this.router.navigate(["/patient/lab-m-report/"+this.route.snapshot.paramMap.get('type')]);
        //this.ngOnInit();
      }, 300 );
      Swal.fire(
        '',
        result.message,
        'success'
      )
      //this.ngOnInit();
    },
    (err)=>{
      this.error_message= true;
      this.error_message_text=err;
      Swal.fire(
        '',
        err.message,
        'error'
      )
    }
   );
  }
  




  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
 
}
