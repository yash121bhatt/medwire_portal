import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "src/app/core/service/auth.service";

@Component({
  selector: "app-breadcrumb",
  templateUrl: "./breadcrumb.component.html",
  styleUrls: ["./breadcrumb.component.sass"],
})
export class BreadcrumbComponent implements OnInit {
  @Input() title: string;
  @Input() items: any[];
  @Input() active_item: string;
  userRole:any;
  navigateLink:any;

  constructor(private authService:AuthService) {}
  

  ngOnInit(): void {
     this.userRole = this.authService.currentUserValue.role;
     if (this.userRole === "patient") {
      this.navigateLink= "/patient/dashboard";
    } else if (this.userRole === "laboratories") {
      this.navigateLink= "/doctor/dashboard";
    } else if (this.userRole === "radiology") {
      this.navigateLink= "/radiology/dashboard";
    } else if (this.userRole === "clinic") {
      this.navigateLink= "/clinic/dashboard";
    } else if (this.userRole === "doctor") {
      this.navigateLink = "/doctors/dashboard";
    }
    else if (this.userRole === "staff" || this.userRole === "receiptionist" || this.userRole === "prescription_writer") {
      this.navigateLink = "/staff/dashboard";
    }
  }
}
