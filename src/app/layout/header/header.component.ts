import { DOCUMENT } from "@angular/common";
import { PatientdataService } from 'src/app/services/patientdata.service';
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
  AfterViewInit,
  ViewChild
} from "@angular/core";

import { Router } from "@angular/router";
import { ConfigService } from "src/app/config/config.service";
import { AuthService } from "src/app/core/service/auth.service";
import { RightSidebarService } from "src/app/core/service/rightsidebar.service";
import { LanguageService } from "src/app/core/service/language.service";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { DashboardComponent } from "src/app/patient/dashboard/dashboard.component";
import { environment } from "src/environments/environment";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { DoctorServiceService } from "src/app/services/doctor-service.service";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";


const document: any = window.document;

@Component({
  providers: [DashboardComponent],
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.sass"],
})
export class HeaderComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit, AfterViewInit {
  [x: string]: any;
  public config: any = {};
  userImg: string;
  homePage: string;
  profilepage: string;
  isNavbarCollapsed = true;
  flagvalue;
  countryName;
  langStoreValue: string;
  defaultFlag: string;
  isOpenSidebar: boolean;
  userRoleu: string;
  userName: string;
  userid: number;
  Users: [];
  checked: any = false;
  isShow: boolean = false;
  offlineOnlineStatus: string = "";
  icon: boolean = true;
  @ViewChild('notificationContain') notificationContain: ElementRef;
  imageURL = `${environment.documentUrl}`;
  closeResult: string;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private rightSidebarService: RightSidebarService,
    private configService: ConfigService,
    private authService: AuthService,
    private router: Router,
    public languageService: LanguageService,
    private patientdataService: PatientdataService,
    private doctorServiceService: DoctorServiceService,
    private comp: DashboardComponent,
    private sanitizer: DomSanitizer,
    private modalService: NgbModal
  ) {
    super();
  }
  listLang = [
    { text: "English", flag: "assets/images/flags/us.svg", lang: "en" },
    { text: "Spanish", flag: "assets/images/flags/spain.svg", lang: "es" },
    { text: "German", flag: "assets/images/flags/germany.svg", lang: "de" },
  ];
  notifications: any[] = [

  ];
  
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
  ngOnInit() {
    this.checked = localStorage.getItem('isOnline') === '1' ? true : false;

    this.config = this.configService.configData;
    const userRole = this.authService.currentUserValue.role;
    this.userImg = `${environment.documentUrl}` + this.authService.currentUserValue.image_name ?? 'demouser.png';

    if (userRole === "Admin") {
      this.userRoleu = "Admin";
      this.homePage = "admin/dashboard/main";
      this.profilepage = "patient/myprofile";
    } else if (userRole === "patient") {
      this.userRoleu = "patient";
      this.homePage = "patient/dashboard";
      this.profilepage = "patient/myprofile";
    } else if (userRole === "laboratories") {
      this.isShow = true;
      this.userRoleu = "Doctor";
      this.offlineOnlineStatus = localStorage.getItem('isOnline') === '1' ? 'Online' : 'Offline';
      this.homePage = "doctor/dashboard";
      this.profilepage = "doctor/labmyprofile";
    } else if (userRole === "radiology") {
      this.isShow = true;
      this.userRoleu = "Radiology";
      this.offlineOnlineStatus = localStorage.getItem('isOnline') === '1' ? 'Online' : 'Offline';
      this.homePage = "radiology/dashboard";
      this.profilepage = "radiology/radiomyprofile";
    } else if (userRole === "clinic") {
      this.userRoleu = "clinic";
      this.homePage = "clinic/dashboard";
      this.profilepage = "clinic/clinic-myprofile";
    } else if (userRole === "doctor") {
      this.userRoleu = "doctor";
      this.homePage = "doctors/dashboard";
      this.profilepage = "doctors/my-profile";
    }
    else if (userRole === "staff" || userRole === "receiptionist" || userRole === "prescription_writer") {
      this.userRoleu = "staff";
      this.homePage = "staff/dashboard";
      this.profilepage = "staff/staff-myprofile";
    }
    else {
      this.userRoleu = "stack";
      this.homePage = "admin/dashboard/main";
      this.profilepage = "patient/myprofile";
    }

    this.langStoreValue = localStorage.getItem("lang");
    const val = this.listLang.filter((x) => x.lang === this.langStoreValue);
    this.countryName = val.map((element) => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) {
        this.defaultFlag = "assets/images/flags/us.svg";
      }
    } else {
      this.flagvalue = val.map((element) => element.flag);
    }

    this.userName = this.authService.currentUserValue.firstName;
    // this.userImg = this.authService.currentUserValue.img;

    this.userid = this.authService.currentUserValue.userid;
    const userId = {
      "id": this.userid
    }
    this.patientdataService.memberList(userId).subscribe(
      (result) => {
        this.Users = result.data;
      },
      (err) => {
        console.log(err);
      }
    );

    const doctorID = {
      doctor_id: this.userid
    }

    if (userRole === 'clinic') {
      this.doctorServiceService.clinicList(doctorID).subscribe(
        (result) => {
          this.doctorData = result.data;
        },
        (err) => {
          console.log(err);
        }
      );
    } else {

    }



    this.systemNotification();

  }

  ngAfterViewInit() {
    // set theme on startup
    if (localStorage.getItem("theme")) {
      this.renderer.removeClass(this.document.body, this.config.layout.variant);
      this.renderer.addClass(this.document.body, localStorage.getItem("theme"));
    } else {
      this.renderer.addClass(this.document.body, this.config.layout.variant);
    }

    if (localStorage.getItem("menuOption")) {
      this.renderer.addClass(
        this.document.body,
        localStorage.getItem("menuOption")
      );
    } else {
      this.renderer.addClass(
        this.document.body,
        "menu_" + this.config.layout.sidebar.backgroundColor
      );
    }

    if (localStorage.getItem("choose_logoheader")) {
      this.renderer.addClass(
        this.document.body,
        localStorage.getItem("choose_logoheader")
      );
    } else {
      this.renderer.addClass(
        this.document.body,
        "logo-" + this.config.layout.logo_bg_color
      );
    }

    if (localStorage.getItem("sidebar_status")) {
      if (localStorage.getItem("sidebar_status") === "close") {
        this.renderer.addClass(this.document.body, "side-closed");
        this.renderer.addClass(this.document.body, "submenu-closed");
      } else {
        this.renderer.removeClass(this.document.body, "side-closed");
        this.renderer.removeClass(this.document.body, "submenu-closed");
      }
    } else {
      if (this.config.layout.sidebar.collapsed === true) {
        this.renderer.addClass(this.document.body, "side-closed");
        this.renderer.addClass(this.document.body, "submenu-closed");
      }
    }
  }
  callFullscreen() {
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      this.icon = false;
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      }
    } else {
      this.icon = true;
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }
  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.langStoreValue = lang;
    this.languageService.setLanguage(lang);
  }
  mobileMenuSidebarOpen(event: any, className: string) {
    const hasClass = event.target.classList.contains(className);
    if (hasClass) {
      this.renderer.removeClass(this.document.body, className);
    } else {
      this.renderer.addClass(this.document.body, className);
    }
  }
  callSidemenuCollapse() {
    const hasClass = this.document.body.classList.contains("side-closed");
    if (hasClass) {
      this.renderer.removeClass(this.document.body, "side-closed");
      this.renderer.removeClass(this.document.body, "submenu-closed");
    } else {
      this.renderer.addClass(this.document.body, "side-closed");
      this.renderer.addClass(this.document.body, "submenu-closed");
    }
  }
  logout() {
    this.subs.sink = this.authService.logout().subscribe((res) => {
      if (!res.success) {
        this.router.navigate(["/authentication/signin"]);
      }
    });
  }

  public callMe(): void {

    this.comp.testCall();
  }

  dashboardClick(data) {

    this.router.navigateByUrl('/patient/dashboard');
  }

  transform_image(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  encryptionData(id) {
    return btoa(id);

  }


  dashboardRedirectLink = 'patient/dashboard/' + btoa(this.authService.currentUserValue.userid);


  systemNotification() {
    const data = {

      user_id: this.authService.currentUserValue.userid,
      role_id: this.authService.currentUserValue.roleID,
      is_get_all: 0
    }

    this.patientdataService.systemNotification(data).subscribe((res: any) => {

      this.notifications = res.data[0].all_notifications;
      this.unreadNotificationCount = res.data[0].unread_notifications_count;
      //  this.unreadNotifications = res.data[0].all_notifications.unread_notifications;

    }, (error: any) => {
      console.log(error);

    })
  }

  profilePopup(){
    setTimeout(() => {
      const element = document.getElementById('profileContent') as HTMLElement;
      element.click();
  
    }, 1000);
  }

  //Notification Route
  notificationRedirect(value: any) {

    setTimeout(() => {
      this.unreadNotificationCount = 0;
      const element = document.getElementById('notificationContain') as HTMLElement;
      element.click();

    }, 1000);
    if (value === 'patient') {
      this.router.navigate(["/patient/notification-list"]);
    } else if (value === 'clinic') {
      // console.log('inside Clinic');
      this.router.navigate(["/clinic/notification-list"]);
    } else if (value === 'Radiology') {
      this.router.navigate(["/radiology/notification-list"]);
    } else if (value === 'Doctor') {
      this.router.navigate(["/doctor/notification-list"]);
    } else if (value === 'doctor') {
      this.router.navigate(["/doctors/notification-list"]);
    }



  }

  labOnlineOffline(e) {
    this.user_id = this.authService.currentUserValue.userid
    const onOffToggle = {
      "user_id": this.user_id,
      "status": this.checked === true ? '1' : '0'
    }
    this.offlineOnlineStatus = this.checked === true ? 'Online' : 'Offline'
    this.patientdataService.labStatus(onOffToggle).subscribe(
      (result) => {
        this.toggleStatus = result.data;
        localStorage.setItem("isOnline", this.checked === true ? '1' : '0');
      },
      (err) => {
        console.log(err);
      }
    );
    // console.log(this.checked)
  }

}
