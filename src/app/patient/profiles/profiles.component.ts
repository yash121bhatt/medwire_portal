import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DatatableComponent } from "@swimlane/ngx-datatable";

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.sass']
})
  
export class ProfilesComponent implements OnInit {
  rows = [];


  constructor() {}


  ngOnInit(): void {
  }

}

