import { Component, OnInit } from "@angular/core";
import { DirectionService } from "src/app/core/service/direction.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-main-layout",
  templateUrl: "./main-layout.component.html",
  styleUrls: [],
})
export class MainLayoutComponent implements OnInit {
  direction: string;
  public config: any = {};
  conditionSidebar :boolean= false;

  constructor(
    private directoryService: DirectionService,
    private router : Router
    ) {
    this.directoryService.currentData.subscribe((currentData) => {
      if (currentData) {
        this.direction = currentData;
      } else {

        setTimeout(() => {
          this.conditionSidebar = true;
        }, 400);
       
        if (localStorage.getItem("isRtl")) {
          if (localStorage.getItem("isRtl") === "true") {
            this.direction = "rtl";
          } else if (localStorage.getItem("isRtl") === "false") {
            this.direction = "ltr";
          }
        } else {
          if (this.config.layout.rtl == true) {
            this.direction = "rtl";
          } else {
            this.direction = "ltr";
          }
        }
      }
    });
  }
  ngOnInit(): void {

  }

  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }
}
