import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';
import { UnautherizehttpService } from 'src/app/services/unautherizehttp.service'
import { Auth } from '../model/auth' ;  

@Injectable({
  providedIn: 'root'
})
export class PatientdataService {
  data:any;
  constructor(
    private _httpservices : HttpService,
    private _unautherizehttpService:UnautherizehttpService

    ) { }

  userData(){
    return [{name:"rajmal",email:"aaa@yahoo.com"},{name:"rajmsssal",email:"aaerera@yahoo.com"}]
  }
  // Sign Up 
  signUp(data){
    return this._unautherizehttpService.post(environment.apiUrl +'auth/signup',data);  
  }

  //SignUp lab radiology
  
  signUplabRadio(data){
    return this._unautherizehttpService.post(environment.apiUrl +'auth/radiosignup',data);  
  }


  //  Sign In 
  signIn(data){
    return this._httpservices.post(environment.apiUrl +'auth/signin',data);  
  }

  //  Get User Detail 
  getUserdetail(user_id:Number){
    return this._httpservices.get(environment.apiUrl +'auth/user_detail/'+user_id);  
  }

  // Fecth profile data
  profile(id:any){
    return this._httpservices.post(environment.apiUrl +'auth/profile',id);  
  }

  //forgot password
  forgotpassword(email:any){
    return this._unautherizehttpService.post(environment.apiUrl +'auth/forgotPassword',email);  
  }
  // Reset password
  resetpassword(data:any){
    return this._unautherizehttpService.post(environment.apiUrl +'auth/resetPassword',data);  
  }
  // main user profile update
  profileupdate(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/updateUser',data);  
  }
  
  //update password
  updatePassword(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/updatePassword',data);  
  }

  // Member List
  memberList(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/members',data);

  }
  
  // Add BMI
  addBmi(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/addBmi',data);
      
  }
 
   // BMI List
  bmiList(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/listBmi',data);
      
  }

   //temperature Adds
  temperatureAdd(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/temperature',data);
      
  }
  
  temperatureList(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/listTemperature',data);
      
  }

  addBloodpressure(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/bloodPressure',data);
      
  }

  listBloodpressure(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/listBloodPressure',data);
      
  }

  
  respiratoryrateAdd(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/respiratory',data);
      
  }
  

  resporateryrateList(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/listRespiratory',data);
         
  }
  
  oxygensaturationAdd(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/oxygen',data);
         
  }

  oxygensaturationlist(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/listOxygen',data);
         
  }
  //Add Heart Rate
  heartRate(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/heartRate',data);
         
  }

   // Heart rate List 
   heartList(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/listHeartRate',data);
         
  }

  //Delete Health
  deleteHealth(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/deletehealthreport',data);
         
  }

  // Doctors List
  doctorsList(data: any) {
    return this._httpservices.post(environment.apiUrl + 'auth/doctorList', data);

  }

  // Add baby
  addBaby(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/add_baby',data); 
  }

  //List Baby 
  babyList(data:any){
   
    return this._httpservices.post(environment.apiUrl +'auth/list_baby',data);
  }

  //Delete Baby

  deletebaby(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/delete_baby',data);
         
  }

  //Single Baby fecth
  singleBaby(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/single_baby',data);
  }

  //Update baby
  updateBaby(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/update_baby',data); 
  }

  //Document/bill/test_report Add
  documentAdd(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/add_document',data);
  }

  // Document List 
  labreportList(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/list_document',data);
  }

  //  List six Doc
  labreportListlatest(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/list-document-latest',data);
  }
 // Document delete
 deleteDocument(data:any){
  return this._httpservices.post(environment.apiUrl +'auth/delete_document',data);
 }
 
 dashboardChart(data:any){
  return this._httpservices.post(environment.apiUrl +'auth/dashboardChart',data);
 }

 // symtomes API
 
 addSymtomes(data:any){
  return this._httpservices.post(environment.apiUrl +'auth/add-symtome',data);
 }

 // Symtomes List
  
 symtomesList(data:any){
  return this._httpservices.post(environment.apiUrl +'auth/symtomes-list',data);
 }

  // Add Woman
  
  addWoman(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/add-pregnant-women',data);
   }
   
   // woman list

   womanList(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/pregnant-women',data);
   }

   // single woman 
   singleWoman(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/view-pregnant-women',data);
   }

   // single woman 
   deleteWomen(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/delete-pregnant-women',data);
   }
   

    // Vaccination Baby Chart
    babyVaccinationchart(data:any){
      return this._httpservices.post(environment.apiUrl +'auth/user_baby_vaccination',data);
     }
   
     //Baby Vaccination Update 
     babyVaccinationupdate(data:any){
      return this._httpservices.post(environment.apiUrl +'auth/update_baby_vaccination',data);
     }
    
     //Add Mensuration

     mensurationAdd(data:any){
      return this._httpservices.post(environment.apiUrl +'auth/add-menturation-cycle',data);
     }

     //Second Add Mensuration

     mensurationAddsecond(data:any){
      return this._httpservices.post(environment.apiUrl +'auth/add-menturation-cycles',data);
     }

      // List Mensuration
     mensurationList(data:any){
      return this._httpservices.post(environment.apiUrl +'auth/list-menturation-cycle',data);
     }
     
     // Delete Mensuration
     
     deleteMensuration(data:any){
      return this._httpservices.post(environment.apiUrl +'auth/delete-menturation-cycle',data);
     }

     // Mensuration Update 

     mensurationUpdate(data:any){
      return this._httpservices.post(environment.apiUrl +'auth/edit-menturation-cycle',data);
     }

     // Test Report 

     testReportListlatest(data:any){
      return this._httpservices.post(environment.apiUrl +'auth/latest-test-report',data);
     }

     // Latest Test Report Patient
    
     patienttestReport(data:any){
      return this._httpservices.post(environment.apiUrl +'auth/patient-test-report',data);
     }

     // OTP verfiy
     
     otpverify(data:any){
      return this._unautherizehttpService.post(environment.apiUrl +'auth/PasswordOtpVerify',data);  
     }
     
     //Scan Document
     searchDocument(data:any){
      return this._httpservices.post(environment.apiUrl +'auth/search-document',data);  
    }

    // Syamtomes List
    
    symtomesListnew(data:any){
      return this._httpservices.post(environment.apiUrl +'auth/default-symptoms-list',data);  
    }

    // Update Symptomes
    updateSymptomes(data:any){
      return this._httpservices.post(environment.apiUrl +'auth/add-user-symptoms',data);  
    }

     //Form Dynamic Creaction
  formsymptomesAPI(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/default-symptoms-list-web',data);
  }

    // Lab Document List 
    labDocList(data: any) {
      return this._httpservices.post(environment.apiUrl + 'auth/latest-doc', data);
    }

    // Bank data
  bankApi(id: any) {
    return this._httpservices.post(environment.apiUrl + 'auth/get-bank-detail', id);
  }

  // Update Bank data
  updateBankDetail(id: any) {
    return this._httpservices.post(environment.apiUrl + 'auth/add-update-bank-detail', id);
  }
  
  // Add Doctor
  addDoctor(data){
  return this._httpservices.post(environment.apiUrl +'auth/addDoctor',data);
  }
  
  // List Doctor
  doctorList(data: any) {
  return this._httpservices.post(environment.apiUrl + 'auth/doctorList', data);
  }
  
  // Delete Doctor
  deleteDoctor(id:any){
  return this._httpservices.post(environment.apiUrl +'auth/deletedoctor',id);
  }
  
  // Serch Doctor
  searchDoctor(id:any){
  return this._httpservices.post(environment.apiUrl +'auth/search-doctor',id);
  }

  searchDoctorAppointment(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/all-doctor-search',data);
  }

  //Clinic 
  getClinic(){
    return this._httpservices.postrequest(environment.apiUrl +'auth/allclinicList'); 
  }

  // get Doctor detail

  getDoctordetail(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/doctorDetail',data);
  }

  // get doctors slot
  getavailableSlot(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/doctotTimeSlote',data);
  }

  addAppointmentDoctor(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/addAppointmentDoctor',data);
  }

  doctorAppointmentList(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/appointmentForDoctorList',data); 
  }

  paymentTest(data:any){
    return this._httpservices.post(environment.apiUrl+'auth/payment-now',data); 
  }
  //System Notifications API
  systemNotification(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/get-all-system-notifications',data); 
  }

  labStatus(id: any) {
    return this._httpservices.post(environment.apiUrl + 'auth/onlineOflineStatus', id);
  }

  verifyingOTP(data:any){
  
    return this._unautherizehttpService.post(environment.apiUrl + 'auth/EmailOtpVerify', data);
  }

  getAccessProfileList(data:any){
    return this._httpservices.post(environment.apiUrl + 'auth/profile-access-list', data);
  }

  deleteRequestAccess(data:any){
    return this._httpservices.post(environment.apiUrl + 'auth/delete-profile-access', data);
  }

 // profile request
 profileAccessrequest(data:any){
  return this._httpservices.post(environment.apiUrl + 'auth/change-profile-access-request-status', data);
 }

 readAllNotification(data:any){
  return this._httpservices.post(environment.apiUrl + 'auth/read-system-notifications', data);
 }

 getOnlineAppointment(data:any){
  return this._httpservices.post(environment.apiUrl + 'auth/get-online-appointment-meeting', data); 
}

planPurchaseHistory(data){
  return this._httpservices.post(environment.apiUrl + "auth/user-plan-purchase-history",data);  
}


//pre medicine delete
deletePreMedicine(data:any){
  return this._httpservices.post(environment.apiUrl + "auth/delete_notification_pre_medicine",data);  
}

//
deletePreNotification(data:any){
  return this._httpservices.post(environment.apiUrl + "auth/delete-pre-notification",data);  
}
 

 // viewDoctorWeeklySchedule
 viewDoctorWeeklySchedule(data:any){
  return this._httpservices.post(environment.apiUrl +'auth/view-doctor-weekly-schedule',data); 
}


resendOtp(data:any){
  return this._unautherizehttpService.post(environment.apiUrl + "auth/resendotp",data);  
}

getLatestReport(data:any){
  return this._httpservices.post(environment.apiUrl +'auth/patient-test-report',data); 

}

}
