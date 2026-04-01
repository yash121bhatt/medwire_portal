import { Component, OnInit, ViewChild } from '@angular/core';
import { from } from 'rxjs';
import { Bmi } from '../add-bmi/bmi';
import { BMILIST } from '../add-bmi/mock-bmiList';
import { ActivatedRoute } from '@angular/router';
import { PatientdataService } from 'src/app/services/patientdata.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

interface Reportdoc {
  s_no: string | Number;
  BMI: any;
  Height: string | number;
  Weight: string | number;
  createdate: any;
}


@Component({
  selector: 'app-add-bmi',
  templateUrl: './add-bmi.component.html',
  styleUrls: ['./add-bmi.component.sass'],

})
export class AddBmiComponent implements OnInit {
  maxDate = new Date();

  Report_doc: Reportdoc[];
  displayedColumns: string[] = [
    "s_no",
    "BMI",
    "Height",
    "Weight",
    "createdate",
    "action",
  ];

  bmiList = BMILIST;
  bmi = Bmi;

  cmValue: any;
  kgValue: any;
  bmiValue2: any;
  bmi_cal_date: string;
  required_message: boolean;

  bmiImageUrl = '/img/BMICLogo.png';
  color: string;
  bmiLv: string;
  closeResult: string;
  deleteId: number;
  error_message: boolean = false;
  error_message_text: string;

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



  get bmiValue() {
    return this.calculateBmi();
  }

  addResult(event) {
    if (this.cmValue != null && this.bmi_cal_date != null) {
      this.required_message = false;
      this.bmiValue2 = this.calculateBmi();
      this.updateList();
      // console.log(this.color + ',' + this.bmiLv);
      this.bmiList.push({
        bmiValue: this.bmiValue2, cmValue: this.cmValue, kgValue: this.kgValue, color: this.color,
        bmiLv: this.bmiLv
      });
      const bmiData = {
        "Height": this.cmValue,
        "Weight": this.kgValue,
        "BMI": this.bmiValue2,
        "member_id": atob(this.route.snapshot.paramMap.get('type')),
        "user_id": this.authService.currentUserValue.userid,
        "createdate": this.bmi_cal_date
      }

      this.patientdataService.addBmi(bmiData).subscribe(
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
        }
      );
    }
    else {

      this.required_message = true;

    }

  }

  calculateBmi() {
    return (this.kgValue / ((this.cmValue * 0.01) * (this.cmValue * 0.01)));
  }

  listDel(i) {
    this.bmiList.splice(i, 1);
  }

  updateList() {
    var bmiLv = '';
    var color = '';
    if (this.bmiValue2 < 18.5) {
      this.bmiLv = 'Too light';
      this.color = 'color-b';

    } else if (this.bmiValue2 >= 18.5 && this.bmiValue2 <= 23.9) {
      this.bmiLv = 'Ideal';
      this.color = 'color-g';
    } else if (this.bmiValue > 24 && this.bmiValue <= 27.9) {
      this.bmiLv = 'Too heavy';
      this.color = 'color-o';
    } else if (this.bmiValue >= 28 && this.bmiValue < 30) {
      this.bmiLv = 'Slightly obese';
      this.color = 'color-bo';
    } else if (this.bmiValue >= 30.1 && this.bmiValue < 35) {
      this.bmiLv = 'Moderate obesity';
      this.color = 'color-bbo';
    } else if (this.bmiValue >= 35) {
      this.bmiLv = 'severe obesity';
      this.color = 'color-r';
    }
  }

  deleteSelectedItems() {
    for (let i = (this.bmiList.length - 1); i > -1; i--) {
      if (this.bmiList[i]) {
        this.bmiList.splice(i, 1);
      }

    }
  }

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private patientdataService: PatientdataService,
    private modalService: NgbModal


  ) { }

  ngOnInit(): void {
    const bmiList = {
      "member_id": atob(this.route.snapshot.paramMap.get('type')),
      "user_id": this.authService.currentUserValue.userid
    }

    this.patientdataService.bmiList(bmiList).subscribe(
      (result) => {
        this.Report_doc = result.data;
        this.dataSource3 = new MatTableDataSource(result.data); //pass the array you want in the table
        this.dataSource3.sort = this.empTbSort;
        this.dataSource3.paginator = this.paginator;
      },
      (err) => {
        console.log(err);
      }
    );

  }
  dateFormate(date_formate) {
    var date_Data = new Date(date_formate.substring(0,10));
    return date_Data;
  }


  // Pop delete Code here
  open(content) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  getId(Id:number) {
    this.deleteId = Id;
  }
  deleteRecord() {

    const deleteData = {
      "health_report_id": this.deleteId,
      "member_id": atob(this.route.snapshot.paramMap.get('type')),
      "user_id": this.authService.currentUserValue.userid

    };

    this.patientdataService.deleteHealth(deleteData).subscribe(
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
}

