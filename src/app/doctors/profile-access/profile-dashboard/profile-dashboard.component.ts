import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorServiceService } from 'src/app/services/doctor-service.service';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import { PatientdataService } from 'src/app/services/patientdata.service';
import Swal from "sweetalert2";
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-profile-dashboard',
  templateUrl: './profile-dashboard.component.html',
  styleUrls: ['./profile-dashboard.component.sass']
})
export class ProfileDashboardComponent implements OnInit {
  @Input() requestID: any;
  heart_rate: any;
  BMI: any;
  temperature: any;
  personalID: number;
  member_id: any;
  oxygen_saturation: any;
  respiratory_rate: any;
  blood_pressure: any;
  vacReport: any;
  procedureReport: any;
  dischargeReport: any;
  billsReport: any;
  insuranceReport: any;
  labReportList: any;
  labReport: any;
  imageURL = `${environment.documentUrl}`;
  imageDoc = `${environment.labDocumentUrl}`;
  healthGroupCondition : Boolean = false;
  htmlReturn: string;
  dicomUrl = `${environment.dicomUrl}`;

  dataSource: any;
  dcmDisable: boolean = false;
  pdfDisable : boolean = false;
  htmlReturnDicom: string;
  labReportLatestList: any;
  Users: any;


  constructor(
    private patientServiceService : PatientServiceService,
    private activatedRoute        : ActivatedRoute,
    private doctorServiceService : DoctorServiceService,
    private patientdataService : PatientdataService
  ) { 

  }

  loadHealthGraphComponent(){
    this.healthGroupCondition = true;
   }
  ngOnInit(): void {
   //this.outPut()

   const data ={
    requestId: this.requestID
   }

   this.doctorServiceService.checkAccessdetail(data).subscribe(
    (result)=>{
      this.profileDetails(result.data);
      this.outPut(result.data);
      this.documentData(result.data);
      this.listReportDoc(result.data);
     
    },
    (err)=>{
      Swal.fire(
        '',
        err,
        'error'
      )
    }
   )
  }

   //Dashboard Count API
   outPut(data) {
    const id = {
      "member_id": data.member_id??data.patient_id,
      "user_id": data.patient_id,
    };

    this.patientServiceService.dashboardCount(id).subscribe(
      (result) => {
        // console.log('FINAL =', result.data[0].heart_rate);
        this.BMI = result.data[0].BMI??'-';
        this.heart_rate = result.data[0].heart_rate??'-';
        this.temperature = result.data[0].temperature??'-';
        this.oxygen_saturation = result.data[0].oxygen_saturation??'-';
        this.respiratory_rate = result.data[0].respiratory_rate??'-';
        this.blood_pressure = result.data[0].blood_pressure??'-';
        
        // this.ngOnInit();
        if (this.personalID == 1) {
          this.ngOnInit();
          this.personalID = 2;
        }

      },

      (err) => {
        console.log(err);
      }
    );
  }

  documentData(data){
   
//Find latest Issue

const latestlabRadioReport = {
  "member_id": data.member_id??data.patient_id,

}


this.patientdataService.getLatestReport(latestlabRadioReport).subscribe(
  (result) => {
   
    this.labReportLatestList = result.data;
  },
  (err) => {
    console.log(err);
  }
);

    const labReportList = {
      "member_id": data.member_id??data.patient_id,
      "user_id": data.patient_id,
      "type": 'patient_lab_report'
    }

    this.patientdataService.labDocList(labReportList).subscribe(
      (result) => {
        this.labReportList = result.data;
      },
      (err) => {
        console.log(err);
      }
    );

    //Prescription List API
    const prescriptionList = {
      "member_id": data.member_id??data.patient_id,
      "user_id": data.patient_id,
      "type": 'prescription'
    }

    this.patientdataService.labDocList(prescriptionList).subscribe(
      (result) => {
        this.labReport = result.data;

      },
      (err) => {
        console.log(err);
      }
    );

    //Vaccination List API
    const vaccinationList = {
      "member_id": data.member_id??data.patient_id,
      "user_id": data.patient_id,
      "type": 'vaccination'
    }

    this.patientdataService.labDocList(vaccinationList).subscribe(
      (result) => {
        this.vacReport = result.data;

      },
      (err) => {
        console.log(err);
      }
    );

    //Procedure Report API
    const procedureList = {
      "member_id": data.member_id??data.patient_id,
      "user_id": data.patient_id,
      "type": 'procedure_report'
    }

    this.patientdataService.labDocList(procedureList).subscribe(
      (result) => {
        this.procedureReport = result.data;

      },
      (err) => {
        console.log(err);
      }
    );

    //Discharge Report API
    const dischargeList = {
      "member_id": data.member_id??data.patient_id,
      "user_id": data.patient_id,
      "type": 'discharge_summary'
    }

    this.patientdataService.labDocList(dischargeList).subscribe(
      (result) => {
        this.dischargeReport = result.data;

      },
      (err) => {
        console.log(err);
      }
    );

    //Bills Report API
    const billsList = {
      "member_id": data.member_id??data.patient_id,
      "user_id": data.patient_id,
      "type": 'all_bill'
    }

    this.patientdataService.labDocList(billsList).subscribe(
      (result) => {
        this.billsReport = result.data;

      },
      (err) => {
        console.log(err);
      }
    );

    //Insurance Report API
    const insuranceList = {
      "member_id": data.member_id??data.patient_id,
      "user_id": data.patient_id,
      "type": 'insurance_document'
    }

    this.patientdataService.labDocList(insuranceList).subscribe(
      (result) => {
        this.insuranceReport = result.data;

      },
      (err) => {
        console.log(err);
      }
    );
  }

  listReportDoc(data){
    const labReport = {
      "member_id": data.member_id??data.patient_id,
      "user_id": data.patient_id,
      }
  
      this.patientdataService.labreportListlatest(labReport).subscribe(
        (result)=>
        {
          this.dataSource =result.data; 
        },
        (err)=>{
        console.log(err);  
        }
      );

  }

  //View File
  viewDicomFile(image) {
    if (image !== '-') {
      this.htmlReturn = '<img src="assets/images/dicom1.png">';
    }
    else {
      this.htmlReturn = '-';
    }
  }

  returnPdf(image) {
    if (image != '-') {
      this.htmlReturn = '<img src="assets/images/pdf.png">';
    }
    else {
      this.htmlReturn = '-';
    }
  }

  //Report Redirect
  viewReport(fn: string) {
    if (fn !== '-') {
   //   localStorage.setItem('dicomFile', fn);
     // if (localStorage.getItem('dicomFile')) {
        window.open(fn);
   //   }
    }
    else {
      return false;
    }
  }

  checkCondition(image:any){
    if(image !='-'){
      const myFileType = image.split(/[#?]/)[0].split('.').pop().trim();
      
      if(myFileType=='zip' || myFileType=='DCM'){
        this.htmlReturnDicom = '<img src="assets/images/dicom1.png">';
      this.dcmDisable = true;
      this.pdfDisable = false;

      //this.htmlReturn = '<i class="far fa-file-pdf file-style col-red font-20"></i>';
      }
      else{
      this.pdfDisable = true;
      this.dcmDisable = false;

      //this.htmlReturn = '<i class="fal fa-file-image file-style font-20"></i>';
      }
      
      
  }
}

profileDetails(data){
  const dataProfile = {
     id: data.member_id??data.patient_id 
    };

  this.patientServiceService.profile(dataProfile).subscribe(
    (result) => {
      this.Users = result.data;
    },

    (err) => {
      console.log(err);
    }
  );

}


}
