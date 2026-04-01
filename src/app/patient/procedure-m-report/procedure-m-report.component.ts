import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from '@angular/material/sort';
import { ActivatedRoute ,Router} from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { PatientdataService } from 'src/app/services/patientdata.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { environment } from "src/environments/environment";
import Swal from 'sweetalert2';
interface Reportdoc {
  invoice_id: String | Number;
  document_title: any;
  document_date: any;
}

const ELEMENT_DATA: Reportdoc[] =[] ;
@Component({
  selector: 'app-procedure-m-report',
  templateUrl: './procedure-m-report.component.html',
  styleUrls: ['./procedure-m-report.component.sass']
})
export class ProcedureMReportComponent  {

  @ViewChild('empTbSort') empTbSort = new MatSort();
  ngAfterViewInit() {
    this.dataSource3.sort = this.empTbSort;
  }
  profile_image : any;
  deleteId: number;
  submitted = false;
  private form : FormData;
  maxDate = new Date();
  accept: string =".jpeg,.png,.jpg,.pdf";
  displayedColumns: string[] = [
    "invoice_id",
    "document_title",
    "document_date",
    "action",
  ];
  imageURL = `${environment.documentUrl}`;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource3 = new MatTableDataSource();
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }

  labreportForm: FormGroup;
  hide3 = true;
  agree3 = false;
  closeResult: string;
  error_message:boolean = false;
  error_message_text:string;
  constructor(private fb: FormBuilder,
    private authService : AuthService,
    private patientdataService : PatientdataService,
    private router : Router,
    private route:ActivatedRoute,
    private modalService: NgbModal
    ) {

    this.labreportForm = this.fb.group({
      docname: ["", [Validators.required]],
      profile_image: [null,[Validators.required]],
      dob: ["", [Validators.required]],
    });
    
  }

  ngOnInit() {
    this.dataSource3.paginator = this.paginator;
    const labReport = {
      "member_id" : atob(this.route.snapshot.paramMap.get('type')),
      "user_id"   : this.authService.currentUserValue.userid,
      "type"      :  'procedure_report'
      }
  
      this.patientdataService.labreportList(labReport).subscribe(
        (result)=>
        {
          this.dataSource3 = new MatTableDataSource (result.data); //pasSs the array you want in the table
          this.dataSource3.sort = this.empTbSort;
          this.dataSource3.paginator = this.paginator;
        },
        (err)=>{
        console.log(err);  
        }
      );

  }
  
  onSubmit(fData: any,formDirective: FormGroupDirective) {

    //console.log("Form Value", this.labreportForm.value);
    this.submitted = true;

    if (this.labreportForm.invalid) {
      return;
    } else {
      this.form = new FormData();
      this.form.append('user_id',this.authService.currentUserValue.userid);
      this.form.append('member_id',atob(this.route.snapshot.paramMap.get('type')));
      this.form.append('document_title',this.labreportForm.value.docname);
      this.form.append('document_date',this.labreportForm.value.dob);
      this.form.append('type','procedure_report');
      this.form.append('document_file',this.profile_image);

      this.patientdataService.documentAdd(this.form).subscribe (
        (result) => {
          if(result.status_code == 200){
            setTimeout(()=> {
              formDirective.resetForm();
              this.labreportForm.reset();
             
             // this.router.navigate(["/patient/lab-m-report/"+this.route.snapshot.paramMap.get('type')]);
              this.ngOnInit();
            }, 300 );
  
          }
          Swal.fire(
            '',
            result.message,
            'success'
          )
          
        }, 
        (err) => {
          console.log(err);
          Swal.fire(
            '',
            err.message,
            'error'
          )
        } ) ;
    }

    

  }

  async fileChange($event){
    this.profile_image = null;
    if($event && $event.length){
      this.profile_image = $event[0];
     
    }
  }

  //Download-File
  downloadMyFile() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'abc.net/files/test.ino');
    link.setAttribute('download', `products.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
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
    "id":this.deleteId,
    "user_id":this.authService.currentUserValue.userid,
   };

   this.patientdataService.deleteDocument(deleteData).subscribe(
    (result)=>{
      setTimeout(()=> {
        //this.router.navigate(["/patient/lab-m-report/"+this.route.snapshot.paramMap.get('type')]);
        this.ngOnInit();
      }, 300 );
     
      this.ngOnInit();
      Swal.fire(
        '',
        result.message,
        'success'
      )

    },
    (err)=>{
      this.error_message= true;
      this.error_message_text=err;
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
}
