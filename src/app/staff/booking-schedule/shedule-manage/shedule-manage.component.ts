import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shedule-manage',
  templateUrl: './shedule-manage.component.html',
  styleUrls: ['./shedule-manage.component.sass']
})
export class SheduleManageComponent implements OnInit {

  doctorId: any;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.doctorId = this.activatedRoute.snapshot.paramMap.get("id");
  }

}
