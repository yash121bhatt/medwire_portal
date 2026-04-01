import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from '@angular/material/sort';
import { AuthService } from "src/app/core/service/auth.service";
import { ClinicServiceService } from "src/app/services/clinic-service.service";
import { environment } from "src/environments/environment";
export interface PeriodicElement {
  no: number;
  img: any;
  full_name: string;
  gender: string;
  mobile_no: number;
  email: string;
  experience_year: string;
  doctor_degree: string;
  specialty: string;
  languages: string;
  actions: any;
}
const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.sass']
})
export class DoctorListComponent implements OnInit {
  imageURL = `${environment.documentUrl}`;
  //mat-tablle-filter
  @ViewChild('empTbSort') empTbSort = new MatSort();
  sort: MatSort;
  urlparameter: any;
  created_by_id: any;
  ngAfterViewInit() {
    this.dataSource3.sort = this.empTbSort;
  }
  displayedColumns: string[] = [
    "no",
    "img",
    "full_name",
    "experience_year",
    "specialty",
    //  "doctor_degree",
    //  "gender",
    "mobile_no",
    "staff_name",
    "email",
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
  constructor(private authService: AuthService,
    private clinicServiceService: ClinicServiceService,) { }
  ngOnInit() {
    this.staffDetail();
    setTimeout(() => {
      this.doctorsList();
    }, 1000);
  }

   //Staff detail api for clinic id
   staffDetail() {
    let data = {
      staff_id: this.authService.currentUserValue.userid,
    }
    this.clinicServiceService.staffDetail(data).subscribe(
      (result) => {
        if (result.status_code == 200) {
          // console.log(result);
          this.created_by_id = result.data[0].created_by_id;
        }
        // console.log('----', this.created_by_id);

      },
      (err) => {
        console.log(err);
      }
    );
  }

  doctorsList(){

    const doctorList = {
      clinic_id: this.created_by_id
    }

    this.clinicServiceService.doctorList(doctorList).subscribe(
      (result) => {
        // console.log('all docotor', result);
        //this.Report_doc = result.data;
        this.dataSource3 = new MatTableDataSource(result.data);
        this.dataSource3.sort = this.empTbSort;
        this.dataSource3.paginator = this.paginator;
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
