import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-meet',
  templateUrl: './meet.component.html',
  styleUrls: ['./meet.component.sass']
})
export class MeetComponent implements OnInit {

  name = 'Zoom Meeting';
  url: any;
  urlSafe: SafeResourceUrl;


  constructor(public sanitizer: DomSanitizer,private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.url = environment.meetingLinkPatient;
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }


}

