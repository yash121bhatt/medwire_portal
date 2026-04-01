import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/core/service/auth.service';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
export interface PeriodicElement {
  // no:number;
  img: any;
  test_name: string;
  category_name: string;
  package_name: string;
  // fast_time: string;
  test_recommanded: string;
  description: string;
  actions: any;
}
const ELEMENT_DATA: PeriodicElement[] = [

];

@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.sass']
})
export class PackageListComponent implements OnInit {
  packageList: any;
  user_id: any;
  token: string;
  imageURL = `${environment.labDocumentUrl}`;
  packageData: any;
  package_id: any;

  //mat-tablle-filter
  @ViewChild('empTbSort') empTbSort = new MatSort();
  sort: MatSort;
  urlparameter: any;
  rows: [];
  test_id: [];
  closeResult: string;
  cat_id: any;
  // modalService: any;

  ngAfterViewInit() {
    this.dataSource3.sort = this.empTbSort;
  }

  displayedColumns: string[] = [
    "no",
    "image",
    "package_name",
    "category_name",
    "test_name",
    // "fast_time",
    "test_recommended",
    "description",
    "amount",
    "actions",
  ];

  constructor(
    private patientServiceService: PatientServiceService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource3 = new MatTableDataSource(ELEMENT_DATA);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    if((this.authService.currentUserValue.address==null || this.authService.currentUserValue.address=='') || (this.authService.currentUserValue.pin_code==null || this.authService.currentUserValue.pin_code=='')){
      Swal.fire(
        '',
        `${environment.profileCompleteMessage}`,
        'info'
      )
        this.router.navigate(["/doctor/labeditprofile"])

    }
    else{

    }


    this.fetch((data) => {
      this.rows = data;
      // this.filteredData = rows;
    });
    this.dataSource3.paginator = this.paginator;

    // const data = {
    //   "lab_id" : this.user_id,
    // }   
    // this.patientServiceService.labcategoryList(data).subscribe(
    //   (result:any) => {
    //         // console.log('cat list =',result);
    //     this.rows = result.data;
    //       console.log(this.rows);
    //     this.dataSource3 = new MatTableDataSource(this.rows);
    //     // console.log("-----------------",this.dataSource3);

    //     this.dataSource3.paginator = this.paginator;
    //     this.dataSource3.sort = this.sort;
    //   },

    //   (err) => {
    //     console.log(err);
    //   }
    // );

    //Test List Api
    // this.user_id = this.authService.currentUserValue.userid;
    // // this.token = this.authService.currentUserValue.token;
    // const data1 = {
    //   "lab_id" : this.user_id,
    // }   
    // this.patientServiceService.testList(data1).subscribe(
    //   (result:any) => {
    //     // this.filteredList3 = result.data;
    //         console.log('test list--------',result.data);
    //   },

    //   (err) => {
    //     console.log(err);
    //   }
    // );
  }

  fetch(_cb: (data: any) => void) {
    this.user_id = this.authService.currentUserValue.userid;
    this.token = this.authService.currentUserValue.token;
    const data = {
      "lab_id": this.user_id,
    }
    this.patientServiceService.packageList(data).subscribe(
      (result: any) => {
        // console.log('abc',result.data[4].result[0].amount);
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

  getId(Id) {
    this.package_id = Id;
  }
  deleteRecord() {
    this.urlparameter = this.route.snapshot.paramMap.get('packageId');
    this.user_id = this.authService.currentUserValue.userid;

    const deleteData = {
      'lab_id': this.user_id,
      "package_id": this.package_id,

    };

    this.patientServiceService.deletePackage(deleteData).subscribe(
      (result) => {
        Swal.fire(
          '',
          result.message,
          'success'
        )

        this.ngOnInit();
      },
      (err) => {
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

  finalDatareturn(data, i) {
    //   if (Array.isArray(data[i].result) && data[i].result.length>0) {
    //   alert('array')// array exists and is not empty
    // }


    if (data[i].testData.length > 0) {

      // console.log('fd', data[i].testData);
      return data[i].testData[0].test_name ?? '-';
    }
    else {
      //  console.log('empty');
    }

  }

}
