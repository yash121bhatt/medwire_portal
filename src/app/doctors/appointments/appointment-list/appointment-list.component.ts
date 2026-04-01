import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from "@angular/material/table";
import { AuthService } from "src/app/core/service/auth.service";
import { DoctorServiceService } from "src/app/services/doctor-service.service";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";

import { Router, ActivatedRoute } from "@angular/router";



export interface PeriodicElement {
  no: number;
  img: any;
  patient_name: string;
  gender: string;
  dob: string;
  mobile_no: number;
  appointment_date: string;
  status: string;
  actions: any;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {
    no: 1,
    img: "assets/images/user/clinic_doc.jpg",
    patient_name: "Itachi Uchiha",
    gender: "Male",
    dob: "21/05/1994",
    mobile_no: 7858585485,
    appointment_date: "21/05/1994, 10:45 AM",
    status: "Approved",
    actions: " ",
  },
  {
    no: 2,
    img: "assets/images/user/user_2.jpeg",
    patient_name: "Lucy Cage",
    gender: "Female",
    dob: "28/04/2000",
    mobile_no: 9658525256,
    appointment_date: "20/09/2022, 10:45 AM",
    status: "Cancel",
    actions: " ",
  },
  {
    no: 3,
    img: "assets/images/user/user_2.jpeg",
    patient_name: "Billy Irish",
    gender: "Female",
    dob: "12/06/1995",
    mobile_no: 9658525256,
    appointment_date: "20/09/2022, 10:45 AM",
    status: "Reschedule",
    actions: " ",
  },
  
];


@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.sass']
})
export class AppointmentListComponent implements OnInit {
  //mat-tablle-filter
  @ViewChild('empTbSort') empTbSort = new MatSort();
  sort: MatSort;
  urlparameter: any;
  pdfcol: boolean=false;
  presciptioncol: boolean= false;
  colClassName: string;
  ngAfterViewInit() {
    this.dataSource3.sort = this.empTbSort;
  }
  displayedColumns: string[] = [
    "no",
    "appointment_id",
    // "img",
    "patient_name",
    "gender",
    "date_of_birth",
    "mobile_number",
    "appointment_date",
    "appointment_reason",
    "appointment_status",
    "lab_document",
    "radio_document",
    "appointments_user_type",
    "actions",
  ];
  dataSource = ELEMENT_DATA;
  dataSource2 = new MatTableDataSource<PeriodicElement>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource3 = new MatTableDataSource();
  
  htmlReturn: string;
  htmlReturndicom: string;
  htmlReturn2: string;
  htmlReturn1: string;
  dicomUrl = `${environment.dicomUrl}`;
  imageURL = `${environment.labDocumentUrl}`;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }
  
  profileImageurl =  `${environment.documentUrl}`;
  prescriptionurl =  `${environment.prescriptionpdfUrl}`;
 // htmlReturn:string = '<i class="far fa-file-pdf file-style col-red font-20"></i>';
  htmlReturnpdf: string = '<i class="far fa-file-pdf file-style col-red font-20"></i>';
  constructor(
    private authservice : AuthService,
    private doctorServiceService: DoctorServiceService,
    private router: Router,
    private activatedRoute : ActivatedRoute
  ) {

  }
  ngOnInit() {
    this.dataSource3.paginator = this.paginator;
    const data = {
      "doctor_id": this.authservice.currentUserValue.userid,
      "clinic_id": this.activatedRoute.snapshot.paramMap.get('type'),
      "role_id"  : this.authservice.currentUserValue.roleID
    }

    this.doctorServiceService.appointmentList(data).subscribe(
      (result)=>{
        this.dataSource3 = new MatTableDataSource(result.data); //pass the array you want in the table
        this.dataSource3.sort = this.empTbSort;
        this.dataSource3.paginator = this.paginator;
      },
      (err)=>{
       console.log(err);
      }
    );
  }

  navigatingUrl(appId:number){

    localStorage.removeItem('clientData');

    const clientID = {
      clientChoose:this.activatedRoute.snapshot.paramMap.get('type')
    }

    localStorage.setItem('clientData',JSON.stringify(clientID));

    setTimeout(() => {
      this.router.navigate(["/doctors/appointments/prescriptions/prescription-tabs/"+appId]);
    }, 100);
   
  }

  conditionCheck(data:any){
    if(data ==='Completed'){
      this.pdfcol = true;
      this.presciptioncol = false;
    }
    else{
      this.presciptioncol = true;
      this.pdfcol = false;
    //  return false;
    }
  }

  classConditioncheck(status: any){
    if(status=='Approved'){
     this.colClassName = 'badge col-Approved';
    }
    else if(status=='Completed'){
     this.colClassName = 'badge col-Completed';
    }
    else if(status==''){
     this.colClassName = 'badge col-Pending';
    }
    else{
     this.colClassName = 'badge col-Pending';
    }
 }

 createAppointmentMeeting(){
  const data = {
    "user_id" : this.authservice.currentUserValue.userid,
    "role_id" :  5
  }
  // console.log(data);
  
  this.doctorServiceService.createAppointmentMeeting(data).subscribe((res:any)=>{
    // window.location.href =res.data.join_url;
    setTimeout(() => {   
      Swal.fire(
        '',
        res.message,
        'success'
      ) ;
      }, 1000);
        
      let url = res.data.join_url;
      environment.meetingLinkByDoctor = url;
       this.router.navigate(['doctors/meet/']);
     
  },
  (error:any)=>{
    Swal.fire(
      '',
      error,
      'error'
    )
    
  })
 }

 convertReason(data:any){
  return JSON.parse(data);
  
}

//View File
viewDicomFile(imagedicom) {
  this.htmlReturn = '-';
  if (imagedicom !== '-') {
    this.htmlReturn = '<img src="assets/images/dicom1.png">';
  }
  else {
    this.htmlReturn = '-';
  }
}

//Report Redirect
viewReport(fn: string) {
  if (fn !== '-') {
    localStorage.setItem('dicomFile', fn);
    if (localStorage.getItem('dicomFile')) {
      window.open(this.dicomUrl+'#'+fn, "_blank");
    }
  }
  else{
    return false;
  }
}

returnPdf(image) {
  //this.htmlReturn = '-';
  if (image != '-') {
    this.htmlReturn = '<img src="assets/images/pdf.png">';
  }
  else {
    this.htmlReturn = '-';
  }
}

}
