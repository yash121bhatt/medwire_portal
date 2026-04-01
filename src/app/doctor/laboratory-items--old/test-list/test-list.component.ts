import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from '@angular/material/sort';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import Swal from 'sweetalert2';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface PeriodicElement {
  // no:number;
  img: any;
  test_name: string;
  category_name: string;
  report_time: string;
  fast_time: string;
  test_recommanded: string;
  description: string;
  actions: any;
}
const ELEMENT_DATA: PeriodicElement[] = [
  
];

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.sass']
})
export class TestListComponent implements OnInit {

  //mat-tablle-filter
  @ViewChild('empTbSort') empTbSort = new MatSort();
  sort: MatSort;
  urlparameter: any;
  user_id: any;
  rows: [];
  test_id: any;
  closeResult: string;
  cat_id: any;
  // modalService: any;

  ngAfterViewInit() {
    this.dataSource3.sort = this.empTbSort;
  }

  displayedColumns: string[] = [
    "no",
    "image",
    "category_name",
    "test_name",
    "test_report",
    "fast_time",
    "test_recommended",
    "description",
    "amount",
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
    private patientServiceService : PatientServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private authService : AuthService,
    private modalService: NgbModal
  ) {}
  ngOnInit() {
    this.fetch((data) => {
      this.rows = data;
      // this.filteredData = rows;
    });
    this.dataSource3.paginator = this.paginator;
    
  }

  fetch(_cb: (data: any) => void) {
    this.user_id = this.authService.currentUserValue.userid;
    // this.token = this.authService.currentUserValue.token;
    const data = {
      "lab_id" : this.user_id,
    }   
    this.patientServiceService.testList(data).subscribe(
      (result:any) => {
            console.log(result);
        this.rows = result.data;
          console.log(this.rows);
        this.dataSource3 = new MatTableDataSource(this.rows);
        // console.log("-----------------",this.dataSource3);
        
        this.dataSource3.paginator = this.paginator;
        this.dataSource3.sort = this.sort;
      },
      
      (err) => {
        console.log(err);
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

  getId(Id){
    this.test_id = Id;
  }
  deleteRecord(){
    this.urlparameter = this.route.snapshot.paramMap.get('testId');
    this.user_id = this.authService.currentUserValue.userid;

    const deleteData = {
      'lab_id': this.user_id,
      "test_id":  this.test_id,
       
     };
  
     this.patientServiceService.deleteTest(deleteData).subscribe(
      (result)=>{
        Swal.fire(
          '',
          result.message,
          'success'
        )
  
        this.ngOnInit();
      },
      (err)=>{
        Swal.fire(
          '',
          err,
          'error'
        )
        //this.error_message= true;
        //this.error_message_text=err;
      }
     );
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
