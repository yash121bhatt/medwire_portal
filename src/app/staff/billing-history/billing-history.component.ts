import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClinicEditmyprofileComponent } from 'src/app/clinic/clinic-editmyprofile/clinic-editmyprofile.component';

export interface Reportdoc {
  // image : string;
  doctor_name: String ;
  order_id: String ;
  clinic_name: String ;
  patient_name: string;
  no: number;
  reason : string;
  date : string;
  time_slot : string;
  booking_status : string;
  payment_status : string;
  banking_status : string;
  medwire_status : string;
  payment_id : string;
  payment : number;
  file : string;
}
const ELEMENT_DATA: Reportdoc[] = [
  {
    no: 1,
    order_id: "3223",
    patient_name: "Naruto Ujumaki",
    clinic_name: "Life Line Clinic",
    doctor_name: "Dr. John Doe",
    reason: 'Fever, Viral',
    date: '12-10-2022',
    time_slot : '10:00 - 10:30 AM',
    booking_status: "Approved",
    payment_status: "Paid",
    banking_status: "Completed",
    medwire_status: "Completed",
    payment_id: "11199097",
    payment: 300,
    file: ' ',
  },
  {
    no: 2,
    order_id: "5444",
    patient_name: "Minato Ujumaki",
    clinic_name: "Family Doom Clinic",
    doctor_name: "Dr. Zeel Patel",
    reason: 'Body Pain, Cold',
    date: '12-10-2022',
    time_slot : '10:00 - 10:30 AM',
    booking_status: "Cancel",
    payment_status: "Unpaid",
    banking_status: "Pending",
    medwire_status: "Pending",
    payment_id: "11199098",
    payment: 250,
    file: ' ',
  },
  {
    no: 3,
    order_id: "6567",
    patient_name: "Itachi Uchiha",
    clinic_name: "BCM Clinic",
    doctor_name: "Dr. Airi Satou",
    reason: 'Acne, Dry Skin',
    date: '12-10-2022',
    time_slot : '10:00 - 10:30 AM',
    booking_status: "Reschedule",
    payment_status: "Unpaid",
    banking_status: "Pending",
    medwire_status: "Pending",
    payment_id: "11199099",
    payment: 250,
    file: ' ',
  },
  {
    no: 4,
    order_id: "3900",
    patient_name: "Obito Uchiha",
    clinic_name: "Care Take Clinic",
    doctor_name: "Dr. Michel Bros",
    booking_status: "Pending",
    reason: 'Itching, Fungas',
    date: '12-10-2022',
    time_slot : '10:00 - 10:30 AM',
    payment_status: "Paid",
    banking_status: "Completed",
    medwire_status: "Completed",
    payment_id: "11199100",
    payment: 300,
    file: ' ',
  },
  {
    no: 5,
    order_id: "6332",
    patient_name: "Naruto Ujumaki",
    clinic_name: "Life Line Clinic",
    doctor_name: "Dr. John Doe",
    reason: 'Fever, Viral',
    date: '12-10-2022',
    time_slot : '10:00 - 10:30 AM',
    booking_status: "Visit",
    payment_status: "Paid",
    banking_status: "Completed",
    medwire_status: "Completed",
    payment_id: "11199097",
    payment: 300,
    file: ' ',
  },
  {
    no: 6,
    order_id: "4112",
    patient_name: "Minato Ujumaki",
    clinic_name: "Family Doom Clinic",
    doctor_name: "Dr. Zeel Patel",
    reason: 'Body Pain, Cold',
    date: '12-10-2022',
    time_slot : '10:00 - 10:30 AM',
    booking_status: "Completed",
    payment_status: "Unpaid",
    banking_status: "Pending",
    medwire_status: "Pending",
    payment_id: "11199098",
    payment: 250,
    file: ' ',
  },
];
@Component({
  selector: 'app-billing-history',
  templateUrl: './billing-history.component.html',
  styleUrls: ['./billing-history.component.sass']
})
export class BillingHistoryComponent implements OnInit {

  //mat-tablle-filter
  @ViewChild('empTbSort') empTbSort = new MatSort();
  sort: MatSort;
  urlparameter: any;
  ngAfterViewInit() {
    this.dataSource3.sort = this.empTbSort;
  }


  displayedColumns: string[] = [
    "no",
    "order_id",
    "patient_name",
    "doctor_name",
    "date",
    "booking_status",
    "payment",
    "payment_id",
    "payment_status",
    // "banking_status",
    "medwire_status",
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource3 = new MatTableDataSource(ELEMENT_DATA);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }

  constructor() { }

  ngOnInit(): void {
    this.dataSource3.paginator = this.paginator;
  }

}
