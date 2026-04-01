import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from "@angular/material/table";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "src/app/core/service/auth.service";
import { DoctorServiceService } from "src/app/services/doctor-service.service";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";



export interface PeriodicElement {
  no: number;
  img: any;
  laboratory_name: string;
  dataSource3:[]; 
  mobile_no: number;
  email: string;
  address: string;
  pin: any;
  status: string;
  actions: any;
}
const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'app-lab-list',
  templateUrl: './lab-list.component.html',
  styleUrls: ['./lab-list.component.sass']
})
export class LabListComponent implements OnInit {

  @ViewChild('empTbSort') empTbSort = new MatSort();
  sort: MatSort;
  urlparameter: any;
  labRadioData:[];
  deleteID: any;
  closeResult: string;
  ngAfterViewInit() {
    this.dataSource3.sort = this.empTbSort;
  }
  displayedColumns: string[] = [
    "no",
    "profile_image",
    "first_name",
    "mobile",
    "email",
    "address",
    "pin_code",
    "status",
    "actions",
  ];
  dataSource = ELEMENT_DATA;
  dataSource2 = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource3 = new MatTableDataSource(ELEMENT_DATA);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }
  
  imageURL = `${environment.documentUrl}`;

  constructor(private doctorService:DoctorServiceService,
    private authService : AuthService,
    private modalService: NgbModal,
    private _snackBar: MatSnackBar,
    ) {}
  ngOnInit() {
    this.dataSource3.paginator = this.paginator;
    this.DoctorlabRadioList();
  }

  DoctorlabRadioList(){
             
    const data = {
      doctor_id : this.authService.currentUserValue.userid,
      role_id  : 3
    }
    this.doctorService.DoctorlabRadioList(data).subscribe((res:any)=>{
      // console.log(res);
      
      this.labRadioData = res.data;
      this.dataSource3 = new MatTableDataSource(res.data); 
      this.dataSource3.sort = this.empTbSort;
      this.dataSource3.paginator = this.paginator;
    },(error:any)=>{
      console.log(error);
      Swal.fire(
        '',
         error,
        'error'
      )
    })

  }



  getdeleteID(id){ 
    this.deleteID = id;
   }

  DeleteDoctorlabRadio(){
    const data = { 
      doctor_id : this.authService.currentUserValue.userid,
      user_id: this.deleteID
    };
    this.doctorService.DeleteDoctorlabRadio(data).subscribe((res:any)=>{
      // console.log(res);
      setTimeout(()=> {

        this.DoctorlabRadioList()
        this.fetch(data);
        
      }, 300 );
     

      Swal.fire(
        '',
        res.message,
        'success'
      )
      
    },(error:any)=>{
      console.log(error);
      Swal.fire(
        '',
         error,
        'error'
      )
      
    })
  }
  fetch(data: any) {
    throw new Error("Method not implemented.");
  }

 // Pop delete Code here
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
}
