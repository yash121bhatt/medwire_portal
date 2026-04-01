import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from "src/app/core/service/auth.service";
import { DoctorServiceService } from "src/app/services/doctor-service.service";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";


export interface PeriodicElement {
  s_no: string;
  document_name: string;
  upload_date: string;
  actions: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    s_no: "1",
    document_name: "Kunochi clinic prescription",
    upload_date: "23/12/2022",
    actions: " ",
  },
  {
    s_no: "2",
    document_name: "November prescription",
    upload_date: "21/12/2022",
    actions: " ",
  },
  {
    s_no: "3",
    document_name: "Dr Batra prescription",
    upload_date: "22/12/2022",
    actions: " ",
  },
  
];
@Component({
  selector: 'app-patient-document',
  templateUrl: './patient-document.component.html',
  styleUrls: ['./patient-document.component.sass']
})
export class PatientDocumentComponent implements OnInit {
//mat-tablle-filter
@ViewChild('empTbSort') empTbSort = new MatSort();

@Input() requestID: any;
sort: MatSort;
urlparameter: any;
imageURL = `${environment.documentUrl}`;
dicomURl = `${environment.dicomUrl}`;
  documentType: any;
  showdcmFile: boolean =false;
  showpdfFile: boolean = false;
  htmlReturnDicom: string;

ngAfterViewInit() {
  this.dataSource3.sort = this.empTbSort;
}
showTitleErorIcon() {
  Swal.fire({
    icon: "success",
    text: "Your Request has been sent to your patient.",
  });
}
displayedColumns: string[] = [
  "s_no",
  "document_title",
  "document_date",
  "actions",
];
dataSource = ELEMENT_DATA;
dataSource2 = new MatTableDataSource<PeriodicElement>();
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
dataSource3 = new MatTableDataSource(ELEMENT_DATA);
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource3.filter = filterValue.trim().toLowerCase();
}
constructor(
  private authService : AuthService,
  private doctorServiceService : DoctorServiceService
) {
  
}

ngOnInit() {
  // console.log('dicom path', this.dicomURl)
  this.dataSource3.paginator = this.paginator;
  this.getDocument('prescription');
}

getDocument(type:any){
  const data = {
      requestId:this.requestID,
      filtertype : type
  }
   this.documentType = type;
   
  this.doctorServiceService.getProfiledocument(data).subscribe(
    (result)=>{
    this.dataSource3 = new MatTableDataSource(result.data); //pass the array you want in the table
    this.dataSource3.sort = this.empTbSort;
    this.dataSource3.paginator = this.paginator;
    },
    (err)=>{
      Swal.fire({
        icon: "error",
        text: err,
      });
    }
    )

}

checkCondition (document:any){
  const myFileType = document.split(/[#?]/)[0].split('.').pop().trim();

 
  if(myFileType =='zip' || myFileType =='DCM'){
    this.showdcmFile = true;
    this.showpdfFile = false;
    this.htmlReturnDicom = '<img src="assets/images/dicom1.png">';

  }
  else{
     this.showpdfFile = true;
     this.showdcmFile = false;
  }
}

}
