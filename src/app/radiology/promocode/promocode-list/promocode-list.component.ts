import { Component, OnInit , ViewChild} from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from '@angular/material/sort';
import { AuthService } from "src/app/core/service/auth.service";
import { PatientServiceService } from "src/app/services/patient-service.service";
import { environment } from "src/environments/environment";
import { ModalDismissReasons , NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
export interface PeriodicElement {
  no: number;
  banner_image_name: any;
  promo_code: string;
  promo_code_for: string;
  discount_type: string;
  offer: string;
  max_uses: string;
  validity_start_date:string;
  validity_end_date:string;
  description:any;
  price:string;
  action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'app-promocode-list',
  templateUrl: './promocode-list.component.html',
  styleUrls: ['./promocode-list.component.sass']
})
export class PromocodeListComponent implements OnInit {
  @ViewChild('empTbSort') empTbSort = new MatSort();
  sort: MatSort;
  urlparameter: any;
  role_id : any = 4;
  currentDate : Date = new Date();
  userId : any;
  rows : [];
  imageURL = `${environment.documentUrl}`;
  deleteId : any;
  closeResult: string;
  error_message:boolean = false;
  error_message_text:string;
 fetch(){
  let data = {
     user_id : this.userId,
     role_id : this.role_id
  }
  this.patientService.promocodeList(data).subscribe((result) => {
    this.rows = result.data;
    this.dataSource3 = new MatTableDataSource(this.rows);
    this.dataSource3.paginator = this.paginator;
    this.dataSource3.sort = this.empTbSort;
}, 
(err) => {
  console.log(err);
})
}

  ngAfterViewInit() {
    this.dataSource3.sort = this.empTbSort;
  }
  displayedColumns: string[] = [
    "no",
    "banner_image_name",
    "promo_code",
    "promo_code_for",
    "discount_type",
    "offer",
    "max_uses",
    "validity_start_date",
    "validity_end_date",
    "price",
    "description",
    "action",
  ];
  dataSource = ELEMENT_DATA;
  dataSource2 = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource3 = new MatTableDataSource(ELEMENT_DATA);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    private patientService:PatientServiceService  , 
    private authService:AuthService ,  
    private modalService: NgbModal,
    private router : Router
    ) {}
  ngOnInit() {

    if((this.authService.currentUserValue.address==null || this.authService.currentUserValue.address=='') || (this.authService.currentUserValue.pin_code==null || this.authService.currentUserValue.pin_code=='')){
      Swal.fire(
        '',
        `${environment.profileCompleteMessage}`,
        'info'
      )
        this.router.navigate(["/radiology/radioeditprofile"])

    }
    else{

    }

    this.userId = this.authService.currentUserValue.userid;
    this.fetch();
  }

  compareDate(current_date , validity_end_date, type){
    let date1 = new Date(current_date);
    let date2 = new Date(validity_end_date);
    if(type == 1){
      if (date1.getTime() < date2.getTime())
      return true;
      return false
    }
    if(type == 2){
      if (date1.getTime() > date2.getTime())
      return true;
      return false
    }
 
 }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
  getdeleteID(Id){
    this.deleteId= Id;
  }

  deleteRecord(){
    const data = { 
      promo_code_id : this.deleteId
    };
   this.patientService.deletePromocode(data).subscribe(
    (result)=>{
      setTimeout(()=> {
        this.fetch();
      }, 300 );
      Swal.fire(
        '',
        result.message,
        'success'
      )
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
}