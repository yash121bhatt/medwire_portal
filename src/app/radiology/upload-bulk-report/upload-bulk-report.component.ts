import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/service/auth.service';
import { FileQueueObject } from 'src/app/doctor/bulk-report/bulk-report.service';
import { UploadBulkReportService } from './upload-bulk-report.service';
import Swal from 'sweetalert2';
import { environment } from "src/environments/environment";
import { Router } from '@angular/router';


@Component({
  selector: 'app-upload-bulk-report',
  templateUrl: './upload-bulk-report.component.html',
  styleUrls: ['./upload-bulk-report.component.sass']
})
export class UploadBulkReportComponent implements OnInit {

  @Output() onCompleteItem = new EventEmitter();

  @ViewChild('fileInput') fileInput;
  queue: Observable<FileQueueObject[]>;
  loading = false;
  countFileExit: number = 0;
  
  constructor(
    public uploader: UploadBulkReportService,
    private authService: AuthService,
    private router: Router
  ) {

  }

  ngOnInit() {
    if ((this.authService.currentUserValue.address == null || this.authService.currentUserValue.address == '') || (this.authService.currentUserValue.pin_code == null || this.authService.currentUserValue.pin_code == '')) {

      Swal.fire(
        '',
        `${environment.profileCompleteMessage}`,
        'error'
      )
      this.router.navigate(["/radiology/radioeditprofile"])

    }
    else {

    }
    // this.uploader.clearQueue();
    this.queue = this.uploader.queue;
    this.uploader.onCompleteItem = this.completeItem;
  }

  completeItem = (item: FileQueueObject, response: any) => {
    this.onCompleteItem.emit({ item, response });
  }

  // addToQueue() {
  //   const fileBrowser = this.fileInput.nativeElement;
  //   this.uploader.addToQueue(fileBrowser.files);
  // }

  uploadFile() {
    console.log('OKK');
    this.uploader.uploadAll()
  }

  addToQueue() {
    this.countFileExit = 1;


    const fileBrowser = this.fileInput.nativeElement;
    this.uploader.addToQueue(fileBrowser.files);
  }

  loadingCondition() {
    if (this.countFileExit == 1) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 8000);
    }
    else {

    }

  }
  refreshData() {

    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }


}