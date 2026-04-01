import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';
@Injectable({
  providedIn: 'root'
})
export class DoctorServiceService {

  constructor(
    private _httpservices : HttpService,
  ) {

   }

   // Profile Doctor
  profileDoctor(id:any){
    return this._httpservices.post(environment.apiUrl +'auth/profile',id);      
  }

  // Update Password 

  updatePassword(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/updatePassword',data);
  }

  // Clinic List 
  clinicList(id:any){
    return this._httpservices.post(environment.apiUrl +'auth/get-doctors-clinic',id);
  }

  // Appointment List
  appointmentList(data:object){
    return this._httpservices.post(environment.apiUrl +'auth/appointment-list',data);
  }

  // add vital
  addvitalInfo(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/add-vital',data);
  }

  // Add Examination
  addexamination(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/add-examination-finding',data);
  }


// labRadio list

labRadioList(data:any){
  return this._httpservices.post(environment.apiUrl +'auth/labRadiolist',data);
  }
  
  // Add labRadio
  
  addLabRadio(data:any){
  return this._httpservices.post(environment.apiUrl +'auth/AddlabRadio',data);
  }
  
  //DoctorlabRadioList
  
  DoctorlabRadioList(data:any){
  return this._httpservices.post(environment.apiUrl +'auth/DoctorlabRadioList',data);
  }
  
  // DeleteDoctorlabRadio
  
  DeleteDoctorlabRadio(data:any){
  return this._httpservices.post(environment.apiUrl +'auth/DeleteDoctorlabRadio',data);
  }

  //get all test
  getallTest(data:any){
    return this._httpservices.post(environment.apiUrl +'laboratory/lab-test-list',data);
  }

  getLaborateryList(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/DoctorlabRadioList',data);
  }

  addDiagonist(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/add-diagnostic',data); 
  }

  // Symptomes History
  addSymptomes(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/add-symptom',data);
  }

  addAdvice(data :any){
    return this._httpservices.post(environment.apiUrl +'auth/add-advice',data);
  }

  // add drugs
  addDrugs(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/add-drug',data);
  }

  // follow Up 
  followUpAdd(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/add-follow-up',data);
  }

  //Final Submit Pdf 
  finalSubmitPrescription(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/generate-pdf',data);
  }

  // get doctor Clinic
  clinicListData(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/clinic-list',data);
  }
  esignaturGet(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/get-doctor-signature',data);
  }
  esignaturAdd(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/upload-signature',data);
  }
  getDashboardCount(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/doctorCard',data);
  }

  profileAccessRequest(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/profile-access-request',data);
  }
  accessProfileList(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/profile-access-list',data);
  }

  getHealthResult(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/healthResult',data);
  }

  getProfiledocument(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/documentAccess',data);
  }

  accessProfilecheck(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/viewProfileAccess',data);
  }
  deleteprofileRequest(data:any){
    return this._httpservices.post(environment.apiUrl +'auth/delete-profile-access',data);
  }

getaccess(){
  
}

resendprofileRequest(data:any){
  return this._httpservices.post(environment.apiUrl +'auth/resendProfileAcess',data);
}

checkAccessdetail(data:any){
  return this._httpservices.post(environment.apiUrl +'auth/profileAccessDetail',data);
}

createAppointmentMeeting(data:any){
  return this._httpservices.post(environment.apiUrl +'auth/create-online-appointment-meeting',data);
}

getDoctorSpecialitiy(data:any){
  return this._httpservices.post(environment.apiUrl + 'auth/doctor-speciality-master-list', data); 
}

doctorprofileupdate(data:any){
  return this._httpservices.post(environment.apiUrl + 'auth/updateUserDoctor', data);   
}

insightAppointmant(data: any) {
  return this._httpservices.post(environment.apiUrl + 'auth/get-insight-appointments', data);
}


}
