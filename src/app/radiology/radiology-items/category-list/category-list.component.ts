import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from '@angular/material/sort';
import { AuthService } from 'src/app/core/service/auth.service';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';


export interface PeriodicElement {
  no:number;
  category_name: string;
  created_at: string;
  actions: any;
}
const ELEMENT_DATA: PeriodicElement[] = [
  
];

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.sass']
})
export class CategoryListComponent implements OnInit {

  //mat-tablle-filter
  @ViewChild('empTbSort') empTbSort = new MatSort();
  sort: MatSort;
  urlparameter: any;
  user_id: any;
  rows = [
  ];
  deleteId: number;
  closeResult: string;
  cat_id: any;

  ngAfterViewInit() {
    this.dataSource3.sort = this.empTbSort;
  }
  displayedColumns: string[] = [
    "no",
    "category_name",
    "created_at",
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
  
  constructor(
    private authService : AuthService,
    private patientServiceService : PatientServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal
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
    this.patientServiceService.labcategoryList(data).subscribe(
      (result:any) => {
            // console.log(result);
        this.rows = result.data;
          // console.log(this.rows);
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
    this.cat_id = Id;
  }
  deleteRecord(){
    this.urlparameter = this.route.snapshot.paramMap.get('catid')
    this.user_id = this.authService.currentUserValue.userid;

    const deleteData = {
      'lab_id': this.user_id,
      "cat_id":  this.cat_id,
       
     };
  
     this.patientServiceService.deleteCategory(deleteData).subscribe(
      (result)=>{
        Swal.fire(
          '',
          'Deleted Successfully!',
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
