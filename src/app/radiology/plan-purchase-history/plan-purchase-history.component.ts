import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from '@angular/material/sort';
import { AuthService } from "src/app/core/service/auth.service";
import { environment } from "src/environments/environment";
import { PatientdataService } from 'src/app/services/patientdata.service';


export interface PeriodicElement {
  notification_sent_by: number;
  notification_for: string;
  notification_title:string;
  notification_date_time: string;
  description: string;
  actions: any;
}
const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-plan-purchase-history',
  templateUrl: './plan-purchase-history.component.html',
  styleUrls: ['./plan-purchase-history.component.sass']
})

export class PlanPurchaseHistoryComponent implements OnInit {
  userId:any;
  @ViewChild('empTbSort') empTbSort = new MatSort();
  displayedColumns: string[] = [
    "no",
    "plan_name",
    "plan_price",
    "validity",
    "purchase_date",
    "expiry_date",
    "payment_status",
  ];
  dataSource = ELEMENT_DATA;
  // dataSource2 = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource3 = new MatTableDataSource(ELEMENT_DATA);
  constructor(
    private patientdataService : PatientdataService, 
    private authService : AuthService) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.userId = this.authService.currentUserValue.userid;
    if(this.userId){
       this.planPurchaseHistory();
    }
  }

  planPurchaseHistory(){
    let data = {
      user_id : this.userId
   }
   this.patientdataService.planPurchaseHistory(data).subscribe(
    (result) => {
      //this.Report_doc = result.data;
      let data = []
      for(let i=0;i<result.data.length;i++){
         if(result.data[i].payment_status=="Success"){
            data.push(result.data[i]);
         }         
      }
      if(data.length > 0){
        this.dataSource3 = new MatTableDataSource(data); 
        this.dataSource3.sort = this.empTbSort;
        this.dataSource3.paginator = this.paginator;
      }
    },
    (err) => {
      console.log(err);
    }
  );

  }
  
  ngAfterViewInit() {
    this.dataSource3.sort = this.empTbSort;
  }
 

}
