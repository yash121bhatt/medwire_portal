import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpServiceService } from './http-service.service';


@Injectable({
  providedIn: 'root'
})
export class PatientServiceService {
  editmember: any;

  constructor(private _httpservices: HttpServiceService) { }

  userData() {
    return [{ name: "patient", email: "xyz@gmail.com" }, { name: "radiology", email: "radio@gmail.com" }]
  }

  // Sign Up 
  signUp(data) {
    return this._httpservices.post(environment.apiUrl + 'auth/signup', data);
  }

  //  Sign In 
  signIn(data) {
    return this._httpservices.post(environment.apiUrl + 'auth/signin', data);
  }

  //  My Profile
  profile(data) {
    return this._httpservices.post(environment.apiUrl + 'auth/profile', data);
  }

  //  My Profile
  members(data: any) {
    return this._httpservices.post(environment.apiUrl + 'auth/members', data);
  }

  //  Add Member
  addmember(data: any) {
    return this._httpservices.post(environment.apiUrl + 'auth/addmember', data);
  }

  //  Add Member
  deletemember(data: any) {
    return this._httpservices.post(environment.apiUrl + 'auth/deletemember', data);
  }

  //  Edit Member
  editMember(data: any) {
    return this._httpservices.post(environment.apiUrl + 'auth/updatemember', data);
  }

  // Add Heart Rate
  addHeartrate(id: any) {
    return this._httpservices.post(environment.apiUrl + 'auth/heartRate', id);
  }

  // Add Heart Rate
  heartrateList(id: any) {
    return this._httpservices.post(environment.apiUrl + 'auth/listHeartRate', id);
  }

  // Dashboard Count
  dashboardCount(id) {
    return this._httpservices.post(environment.apiUrl + 'auth/listdashboard', id);
  }

  // Add History Notepad
  addHistoryNotepad(data) {
    return this._httpservices.post(environment.apiUrl + 'auth/history_notepad', data);
  }

  // History Notepad List
  historyNotepadList(data) {
    return this._httpservices.post(environment.apiUrl + 'auth/list_history_notepad', data);
  }

  // Single History Notepad
  signlehistoryNotepad(data) {
    return this._httpservices.post(environment.apiUrl + 'auth/single_history_notepad', data);
  }

  // Edit History Notepad
  edithistoryNotepad(data) {
    return this._httpservices.post(environment.apiUrl + 'auth/update_history_notepad', data);
  }


  // Add Pre Medicine Reminder
  addPreMedicine(data) {
    return this._httpservices.post(environment.apiUrl + 'auth/notification_pre_medicine', data);
  }

  // Add Pre Medicine Reminder
  preMedicineList(data) {
    return this._httpservices.post(environment.apiUrl + 'auth/list_notification_pre_medicine', data);
  }


  // Add Pre Medicine Reminder
  preLabNotification(data) {
    return this._httpservices.post(environment.apiUrl + 'auth/list_pre_notification', data);
  }

  // Add Pre Medicine Reminder
  addlabTest(data) {
    return this._httpservices.post(environment.apiUrl + 'auth/pre_notification', data);
  }

  // Add Pre Medicine Reminder
  memberSearch(data) {
    return this._httpservices.post(environment.apiUrl + 'laboratory/memberSearch', data);
  }

  // Add Pre Medicine Reminder
  categoryList(data) {
    return this._httpservices.post(environment.apiUrl + 'laboratory/newVisit', data);
  }

  // Add Pre Medicine Reminder
  labList(data) {
    return this._httpservices.post(environment.apiUrl + 'laboratory/visitList', data);
  }

  // Edit Category
  deleteCategory(data) {
    return this._httpservices.post(environment.apiUrl + 'laboratory/delete-category', data);
  }

  // Category List
  labcategoryList(data) {
    return this._httpservices.post(environment.apiUrl + 'laboratory/category-list', data);
  }

  // Add Category
  addCategory(data) {
    return this._httpservices.post(environment.apiUrl + 'laboratory/add-category', data);
  }

  // Single Category
  singleCategory(data) {
    return this._httpservices.post(environment.apiUrl + 'laboratory/category', data);
  }

  // Edit Category
  editCategory(data) {
    return this._httpservices.post(environment.apiUrl + 'laboratory/edit-category', data);
  }

  // Add Test
  addTest(data) {
    return this._httpservices.post(environment.apiUrl + 'laboratory/add-lab-test', data);
  }

  // Single Test
  singleTest(data) {
    return this._httpservices.post(environment.apiUrl + 'laboratory/lab-test', data);
  }

  // Test List
  testList(data) {
    return this._httpservices.post(environment.apiUrl + 'laboratory/lab-test-list', data);
  }

  // Test List
  testListdep(data) {
    return this._httpservices.post(environment.apiUrl + 'laboratory/findTestlistBycategory', data);
  }

  // Edit Test
  editTest(data) {
    return this._httpservices.post(environment.apiUrl + 'laboratory/edit-lab-test', data);
  }

  // Delet Test
  deleteTest(data) {
    return this._httpservices.post(environment.apiUrl + 'laboratory/delete-lab-test', data);
  }

  // Single Package
  singlePackage(data) {
    return this._httpservices.post(environment.apiUrl + 'laboratory/package', data);
  }

  // Add Package
  addPackage(data) {
    return this._httpservices.post(environment.apiUrl + 'laboratory/add-package', data);
  }

  // Delete Package
  deletePackage(data) {
    return this._httpservices.post(environment.apiUrl + 'laboratory/delete-package', data);
  }

  // Edit Package
  editPackage(data) {
    // console.log('-----', data);
    return this._httpservices.post(environment.apiUrl + 'laboratory/edit-package', data);
  }


  // Package List
  packageList(data) {
    return this._httpservices.post(environment.apiUrl + 'laboratory/package-list', data);
  }

  // Appointment List
  appointmentList(data: any) {
    return this._httpservices.post(environment.apiUrl + 'laboratory/appointment-list', data);

  }

  // Package List
  allPackageList(data) {
    return this._httpservices.post(environment.apiUrl + 'laboratory/all-package', data);
  }

  // Package Detail
  packageDetail(data) {
    return this._httpservices.post(environment.apiUrl + 'laboratory/package-description', data);
  }

  // Lab Test List
  allLabTestList(data) {
    return this._httpservices.post(environment.apiUrl + 'laboratory/all-lab-test', data);
  }

  // Add To Cart
  addCart(data) {
    return this._httpservices.post(environment.apiUrl + 'laboratory/add-cart', data);
  }

  // Add To Cart Items
  cartItem(data) {
    // console.log('======>',data);
    return this._httpservices.post(environment.apiUrl + 'laboratory/cart-item', data);

  }

  // Lab Test List
  labTestDetail(data) {
    return this._httpservices.post(environment.apiUrl + 'laboratory/lab-test-description', data);
  }

  // Single Test List
  labTestList(data) {
    return this._httpservices.post(environment.apiUrl + 'laboratory/more-test-list', data);
  }

  // Date and Time Slot
  checkDatetime(data) {
    return this._httpservices.post(environment.apiUrl + 'laboratory/checkAppointment-datetime', data);
  }

  // Coupon Code
  couponApi(data) {
    return this._httpservices.post(environment.apiUrl + 'laboratory/coupon-codes', data);
  }

  // Booking Summary API
  bookingSummary(data) {
    return this._httpservices.post(environment.apiUrl + 'laboratory/bookingSummery', data);
  }

  // Time Slot List
  timeList(data: any) {
    return this._httpservices.post(environment.apiUrl + 'laboratory/timeslote-list', data);

  }

  // Add Appointment
  addAppointment(data: any) {
    return this._httpservices.post(environment.apiUrl + 'laboratory/add-Appointment', data);

  }

  // Add Report
  addReport(data) {
    return this._httpservices.post(environment.apiUrl + 'laboratory/uploadReport', data);
  }

  //  Get User Detail 
  getUserdetail(user_id: Number) {
    return this._httpservices.get(environment.apiUrl + 'auth/user_detail/' + user_id);
  }
  // Lab Appointment
  labAppointments(data: any) {
    return this._httpservices.post(environment.apiUrl + 'laboratory/lab-radio-appointmentList', data);

  }

  // Approve Appointment
  approveAppointment(data: any) {
    return this._httpservices.post(environment.apiUrl + 'laboratory/lab-radio-appointment-status', data);

  }
  // Radio Patient Booking History
  patientRadioHistory(data: any) {
    return this._httpservices.post(environment.apiUrl + 'auth/patientBillingHistoryLabRadio', data);

  }
  // Lab Booking History
  labAppointmentsHistory(data: any) {
    return this._httpservices.post(environment.apiUrl + 'laboratory/lab-radio-billing-history', data);

  }
  // Test List
  labTest(data: any) {
    return this._httpservices.post(environment.apiUrl + 'laboratory/lab-test-list', data);
  }

  // Doctor Management
  doctorManagementList(data: any) {
    return this._httpservices.post(environment.apiUrl + 'laboratory/DoctorRequestlabRadioList', data);

  }

  // Doctor Management Status
  DoctorlabRadioChangeStatus(data: any) {
    return this._httpservices.post(environment.apiUrl + 'laboratory/DoctorlabRadio-change-status', data);

  }

  // Add Promocode
  addPromocode(data) {
    return this._httpservices.post(environment.apiUrl + 'auth/add-promo-code', data);
  }

  // Promocode list 
  promocodeList(data) {
    return this._httpservices.post(environment.apiUrl + 'auth/get-all-promo-codes', data);
  }

  // delete promocode
  deletePromocode(data) {
    return this._httpservices.post(environment.apiUrl + 'auth/delete-promo-code', data);
  }

  singlePromocode(data) {
    return this._httpservices.post(environment.apiUrl + 'auth/get-promo-code-detail', data);
  }

  patientList(data) {
    return this._httpservices.post(environment.apiUrl + 'auth/get-all-patients', data);
  }

  editPromocode(data) {
    return this._httpservices.post(environment.apiUrl + 'auth/update-promo-code', data);
  }

  addNotification(data) {
    return this._httpservices.post(environment.apiUrl + 'auth/add-notification', data);
  }

  notificationList(data) {
    return this._httpservices.post(environment.apiUrl + 'auth/get-all-notifications', data);
  }

  singleNotification(data) {
    return this._httpservices.post(environment.apiUrl + 'auth/get-notification-detail', data);
  }

  editNotification(data) {
    return this._httpservices.post(environment.apiUrl + 'auth/update-notification', data);
  }

  deleteNotification(data) {
    return this._httpservices.post(environment.apiUrl + 'auth/delete-notification', data);
  }

  planList(data) {
    return this._httpservices.post(environment.apiUrl + 'auth/get-all-plans', data);
  }

  purchasePlan(data) {
    return this._httpservices.post(environment.apiUrl + 'auth/purchase-plan', data);
  }

  //My Code  20-12-2022

  getlabSlot(data: any) {
    return this._httpservices.post(environment.apiUrl + 'laboratory/timeslote-list', data);
  }

  //lab resechdule
  reschedulelabAppointment(data: any) {
    return this._httpservices.post(environment.apiUrl + 'laboratory/lab-radio-appointment-reschedule', data);
  }

  // planList(data) {
  //   return this._httpservices.post(environment.apiUrl + 'auth/get-all-plans', data);
  // }

  // purchasePlan(data) {
  //   return this._httpservices.post(environment.apiUrl + 'auth/purchase-plan', data);
  // }

  renewPlan(data) {
    return this._httpservices.post(environment.apiUrl + 'auth/renew-plan', data);
  }

  // Clinic Patient Booking History
  patientClinicHistory(data: any) {
    return this._httpservices.post(environment.apiUrl + 'auth/patientBillingHistoryClinic', data);

  }

  doctorListLab(data: any) {
    return this._httpservices.post(environment.apiUrl + 'laboratory/labRadioApprovedDoctor', data);
  }

  insightAppointmant(data: any) {
    return this._httpservices.post(environment.apiUrl + 'auth/get-insight-appointments', data);
  }

  labdashboardCount(data:any){
    return this._httpservices.post(environment.apiUrl + 'laboratory/lab-radio-count-detail', data);
  }
}