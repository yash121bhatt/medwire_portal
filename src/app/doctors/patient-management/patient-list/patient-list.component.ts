import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
export interface PeriodicElement {
  img: any;
  full_name: string;
  gender: string;
  dob: string;
  mobile_no: number;
  adharcardno: number;
  email: string;
  actions: any;
  pincode: number;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {
    img: "assets/images/user/clinic_doc.jpg",
    full_name: "John Doe",
    gender: "Male",
    dob: "21-05-1994",
    mobile_no: 7858585485,
    adharcardno: 123456789540,
    email: "test@example.com",
    pincode:452556,
    actions: " ",
  },
  {
    img: "assets/images/user/user_2.jpeg",
    full_name: "Hinata Hyuga",
    gender: "Female",
    dob: "12-02-1887",
    mobile_no: 8989545658,
    adharcardno: 745458568585,
    email: "hyugahin@example.com",
    pincode:565852,
    actions: " ",
  },
  {
    img: "assets/images/user/doctor.jpg",
    full_name: "Rose Barn",
    gender: "Female",
    dob: "12-02-1887",
    mobile_no: 9896584585,
    adharcardno: 459671326548,
    email: "barnrose@example.com",
    pincode:859654,
    actions: " ",
  },
  
];
@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.sass']
})
export class PatientListComponent implements OnInit {
  displayedColumns: string[] = [
    "img",
    "full_name",
    "gender",
    "dob",
    "mobile_no",
    "adharcardno",
    "email",
    "pincode",
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
  constructor() {}
  ngOnInit() {
    this.dataSource2.paginator = this.paginator;
  }
}
