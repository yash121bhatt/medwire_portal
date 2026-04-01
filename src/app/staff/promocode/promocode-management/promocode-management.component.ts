import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from '@angular/material/sort';
export interface PeriodicElement {
  img: any;
  no: number;
  promoCode: string;
  offer_type: string;
  offer: string;
  uses_times: string;
  startDate:string;
  endDate:string;
  pricerange:string;
  description:string;
  action: any;

}
const ELEMENT_DATA: PeriodicElement[] = [
  {
    no: 1,
    img: "assets/images/promocode/promocode1.png",
    promoCode: 'SAFE40',
    offer_type: "By %",
    offer: "40%",
    uses_times: '5',
    startDate: "12/08/2022",
    endDate: "30/08/2022",
    pricerange:"1499",
    description: "Lorem Ipsum Frenka Strio Kamnla",
    action : '',
  },
  {
    no: 2,
    img: "assets/images/promocode/promocode2.png",
    promoCode: 'DIW10',
    offer_type: "By Flat",
    offer: "200 rs Off",
    uses_times: '3',
    startDate: "12/01/2022",
    endDate: "16/01/2022",
    pricerange:"1800",
    description: "Lorem Ipsum Frenka Strio Kamnla",
    action : '',
  },
  {
    no: 3,
    img: "assets/images/promocode/promocode3.png",
    promoCode: 'VEXIN',
    offer_type: "By %",
    offer: "30%",
    uses_times: '4',
    startDate: "28/02/2022",
    endDate: "04/03/2022",
    pricerange:"2299",
    description: "Lorem Ipsum Frenka Strio Kamnla",
    action : '',
  },
  {
    no: 3,
    img: "assets/images/promocode/promocode1.png",
    promoCode: 'MEDI15',
    offer_type: "By Flat",
    offer: "300 rs Off",
    uses_times: '4',
    startDate: "30/05/2022",
    endDate: "07/06/2022",
    pricerange:"2249",
    description: "Lorem Ipsum Frenka Strio Kamnla",
    action : '',
  },
  {
    no: 4,
    img: "assets/images/promocode/promocode2.png",
    promoCode: 'FAMILY',
    offer_type: "By Flat",
    offer: "800 rs Off",
    uses_times: '5',
    startDate: "10/10/2022",
    endDate: "18/10/2022",
    pricerange:"3000",
    description: "Lorem Ipsum Frenka Strio Kamnla",
    action : '',
  },
 
  
];
@Component({
  selector: 'app-promocode-management',
  templateUrl: './promocode-management.component.html',
  styleUrls: ['./promocode-management.component.sass']
})
export class PromocodeManagementComponent implements OnInit {
  //mat-tablle-filter
  @ViewChild('empTbSort') empTbSort = new MatSort();
  sort: MatSort;
  urlparameter: any;
  ngAfterViewInit() {
    this.dataSource3.sort = this.empTbSort;
  }
  displayedColumns: string[] = [
    "no",
    "img",
    "promoCode",
    "offer_type",
    "offer",
    "uses_times",
    "startDate",
    "endDate",
    "pricerange",
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
  constructor() {}
  ngOnInit() {
    this.dataSource3.paginator = this.paginator;
  }
}