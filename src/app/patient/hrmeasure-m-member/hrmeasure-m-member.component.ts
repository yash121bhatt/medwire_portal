import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from '@angular/material/sort';
import { ActivatedRoute ,Router} from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { PatientdataService } from 'src/app/services/patientdata.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';


interface Reportdoc {
  s_no: string | Number;
  heart_rate: any;
  createdate:any;
}


@Component({
  selector: 'app-hrmeasure-m-member',
  templateUrl: './hrmeasure-m-member.component.html',
  styleUrls: ['./hrmeasure-m-member.component.sass']
})
export class HrmeasureMMemberComponent {

  maxDate = new Date();
  Report_doc: Reportdoc[];
  displayedColumns: string[] = [
  "s_no",
  "heart_rate",
  "createdate",
  "action",
  ];



@ViewChild('empTbSort') empTbSort = new MatSort();
ngAfterViewInit() {
  this.dataSource3.sort = this.empTbSort;
}

@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource3 = new MatTableDataSource(null);
  //dataSource3 = new MatTableDataSource < OrdersDetailsDataSource > (null);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }

success_message:boolean= false;
error_message:boolean = false;
error_message_text:string;

closeResult: string;
deleteId: number;
currentDate:Date = new Date();  
heravalueForm: FormGroup;
  hide3 = true;
  agree3 = false;
  constructor(
    private fb: FormBuilder,
    private patientdataService : PatientdataService,
    private authService : AuthService,
    private router : Router,
    private route:ActivatedRoute,
    private modalService: NgbModal
    ) {
    this.heravalueForm = this.fb.group({
      hrvalue: ["",[Validators.required]],
      dop: ["", [Validators.required]],
    });
  }

  ngOnInit(){
    this.dataSource3.paginator = this.paginator;
    const heartList = {
      "member_id" : atob(this.route.snapshot.paramMap.get('type')),
      "user_id" : this.authService.currentUserValue.userid
      }
  
      this.patientdataService.heartList(heartList).subscribe(
        (result)=>
        {
          this.Report_doc = result.data;  
          this.dataSource3 = new MatTableDataSource (result.data); //pass the array you want in the table
          this.dataSource3.sort = this.empTbSort;
          this.dataSource3.paginator = this.paginator;
        },
        (err)=>{
        console.log(err);  
        }
      );
    
  }


  onSubmit(data) {
    console.log('date su = ', data.dop);
    if (this.heravalueForm.invalid) {
      return;
    } else {
  if(data.hrvalue!=null && data.dop!=null){
    const heartrateAdd ={
      "heart_rate" : data.hrvalue,
      "member_id" : atob(this.route.snapshot.paramMap.get('type')),
      "user_id" : this.authService.currentUserValue.userid,
      "createdate" : data.dop
  }
    this.patientdataService.heartRate(heartrateAdd).subscribe(
      (result)=>{
        if(result.status=="success"){
          //this.success_message=true;
          //this.error_message = false;
          setTimeout(() => {
            const currentUrl = 'patient/hrmeasure-m-member/'+this.route.snapshot.paramMap.get('type');
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                this.router.navigate([currentUrl]);
            });
          }, 500);

          Swal.fire(
            '',
            result.message,
            'success'
          )
          
        }  
      },
      (err)=>{
        Swal.fire(
          '',
         err,
          'error'
        )
     //   this.error_message = true;
        //this.success_message=false;
        //this.error_message_text = err;
      }
    );
  }
    }


  }

  // Pop delete Code here
  open(content) {
    
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  getId(Id){
    this.deleteId= Id;
  }
  deleteRecord(){
    const deleteData = {
      "health_report_id":this.deleteId,
      "member_id":atob(this.route.snapshot.paramMap.get('type')),
      "user_id":this.authService.currentUserValue.userid
       
     };
  
     this.patientdataService.deleteHealth(deleteData).subscribe(
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
      return  `with: ${reason}`;
    }
  }

  dateFormate(date_formate){
    var date_Data = new Date(date_formate.substring(0,10));
    //var time_Format = date_formate.substring(11,19);

    return date_Data;
   
  }

}
