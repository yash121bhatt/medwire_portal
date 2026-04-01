import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ClinicServiceService {

  constructor(
    private _httpservices : HttpService,
  ) { }

   // Add Doctor
   addDoctor(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/add-doctor',data);  
  }

  //Doctor List 
  doctorList(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/get-all-doctors',data);  
  }

  deleteDoctor(id:any){
    return this._httpservices.post(environment.apiUrl +'auth/delete-doctor',id);
  }

  doctorEdit(id:any){
    return this._httpservices.post(environment.apiUrl +'auth/get-doctor-details',id);
  }

   //Update Doctor
   updateDoctor(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/update-doctor',data);
  }

  // search Patient Mobile
  searchPatientMobile(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/search-patient',data);
  }

  // Patient Add

  addPatient(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/add-patient-clinic',data);
  }

  addPatientLabRadio(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/add-patient',data);
  }
  

  // getAllDoctorfees all doctor
  getAllDoctorfees(id:any){
    return this._httpservices.post(environment.apiUrl +'auth/fee-specific-doctor-list',id);
  }

  addDoctorfess(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/add-doctor-fee',data);
  }

  // Clininc doctor fees

  doctorFesslist(id:any){
    return this._httpservices.post(environment.apiUrl +'auth/get-all-doctor-fees',id);
  }

  // P code  start here
  profile(data){
    return this._httpservices.post(environment.apiUrl +'auth/clinic-hosptial-profile',data);
  }

  updateProfile(data){
    return this._httpservices.post(environment.apiUrl +'auth/update-profile',data);
  }

  addBankDetail(data){
    return this._httpservices.post(environment.apiUrl +'auth/add-update-bank-detail',data);
  }

  viewBankDetail(data){
    return this._httpservices.post(environment.apiUrl +'auth/get-bank-detail',data);
  }

  addStaff(data){
    return this._httpservices.post(environment.apiUrl +'auth/add-staff',data);
  }

  staffList(data){
    return this._httpservices.post(environment.apiUrl +'auth/get-all-staffs',data);
  }

  staffDetail(data){
    return this._httpservices.post(environment.apiUrl +'auth/get-staff-detail',data);
  }

  updateStaff(data){
    return this._httpservices.post(environment.apiUrl +'auth/update-staff',data);
  }

  deleteStaff(data){
    return this._httpservices.post(environment.apiUrl +'auth/delete-staff',data);
  }
  //Get Patient

  getPatient(id:any){
    return this._httpservices.post(environment.apiUrl +'auth/get-all-patients',id);
  }


  // Plan List 
  getallPlan(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/get-all-plans',data); 
  }

  // list Patient

listPatient(data:any){
  return this._httpservices.post(environment.apiUrl +'auth/get-all-patients-clinic',data);
  }
  
  
  // Update Patient
  updatePatient(data:any){
  return this._httpservices.post(environment.apiUrl +'auth/update-patient',data);
  }
  
  // Delete Patient
  deletePatient(data:any){
  return this._httpservices.post(environment.apiUrl +'auth/delete-patient',data);
  }
  
  //Get Patient Detail
  
  patientDetail(data:any){
  return this._httpservices.post(environment.apiUrl +'auth/get-patient-detail',data);
  }

  feesDetail(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/get-doctor-fee-detail',data);
  }

  updateDoctorFees(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/update-doctor-fee',data);
  }


  // <-----Parth------>
  //addDoctorWeeklySchedule
  addDoctorWeeklySchedule(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/add-doctor-schedule',data); 
  }

  // viewDoctorWeeklySchedule
  viewDoctorWeeklySchedule(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/view-doctor-weekly-schedule',data); 
  }

   //addDoctorAvailability
   addDoctorAvailability(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/add-doctor-availability',data); 
  }

  //addDoctorAvailability
  viewDoctorAvailability(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/view-doctor-availability',data); 
  }

  clinicAppointment(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/clinicAppointmenHistory',data); 
  }

  appointmenStatusupdate(data:any){
    return this._httpservices.post(environment.apiUrl +'laboratory/lab-radio-appointment-status',data); 
  }

  // recehcudle appointment doctor
  rescheduledoctorAppointment(data:any){
    return this._httpservices.post(environment.apiUrl +'laboratory/lab-radio-appointment-reschedule',data); 
  }

  //Staff Via Receipnist

// Fecth profile data

// Fecth profile data
profileStaff(id:any){
  return this._httpservices.post(environment.apiUrl +'auth/profile',id);
  }

// main user profile update
profileupdate(data:any){
return this._httpservices.post(environment.apiUrl +'auth/updateUser',data);
}

//update password
updatePassword(data:any){
return this._httpservices.post(environment.apiUrl +'auth/updatePassword',data);
}

// Header Prescription
addPreseciptionHeader(data:any){
  return this._httpservices.post(environment.apiUrl +'auth/manage-prescription-header',data);
}


// Footer prescription
addprescriptionFooter(data:any){
  return this._httpservices.post(environment.apiUrl +'auth/manage-prescription-footer',data); 
}

//get presciption header footer
getPrescriptionDetail(data:any){
  return this._httpservices.post(environment.apiUrl +'auth/get-prescription-detail',data); 
}

addNotification(data){
  return this._httpservices.post(environment.apiUrl +'auth/add-notification',data);  
}

notificationList(data){
  return this._httpservices.post(environment.apiUrl +'auth/get-all-notifications',data);  
}
  
singleNotification(data){
  return this._httpservices.post(environment.apiUrl +'auth/get-notification-detail',data);  
}

editNotification(data){
  return this._httpservices.post(environment.apiUrl +'auth/update-notification',data);  
}
deleteNotification(data){
  return this._httpservices.post(environment.apiUrl +'auth/delete-notification',data);  
}
getclinicdashCount(data){
  return this._httpservices.post(environment.apiUrl +'auth/clinicCard',data);  
}

//Doctor list by fees 
doctorFeesList(data:any){
  return this._httpservices.post(environment.apiUrl +'auth/get-all-doctor-fees',data);  
}
//clinic book doctor appointment for patient
bookAppointmentForPatient(data){
  return this._httpservices.post(environment.apiUrl + "auth/clinic-add-appointment-doctor",data);  
}


  // Clinic Booking History
  clinicBillingHistory(data: any) {
    return this._httpservices.post(environment.apiUrl + 'auth/clinicBookingHistory', data);
  }

  getDoctorSpecialitiy(data:any){
    return this._httpservices.post(environment.apiUrl + 'auth/doctor-speciality-master-list', data); 
  }

}
