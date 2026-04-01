import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/service/auth.service';
import { FileQueueObject , BulkReportService } from './bulk-report.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-bulk-report',
  templateUrl: './bulk-report.component.html',
  styleUrls: ['./bulk-report.component.sass']
})

export class BulkReportComponent implements OnInit {

  @Output() onCompleteItem = new EventEmitter();

  @ViewChild('fileInput') fileInput;

  queue: Observable<FileQueueObject[]>;
  loading = false;
  countFileExit: number =0;

  constructor(
    public uploader: BulkReportService,
    private authService : AuthService,
    private router : Router
    ) {

      
    }

  ngOnInit() {
    this.uploader.clearQueueSecond();
    if((this.authService.currentUserValue.address==null || this.authService.currentUserValue.address=='') || (this.authService.currentUserValue.pin_code==null || this.authService.currentUserValue.pin_code=='')){
      Swal.fire(
        '',
        `${environment.profileCompleteMessage}`,
        'error'
      )
        this.router.navigate(["/doctor/labeditprofile"])

    }
    else{

    }
    this.queue = this.uploader.queue;
    this.uploader.onCompleteItem = this.completeItem;
  }

  completeItem = (item: FileQueueObject, response: any) => {
    this.loading = false;
    this.onCompleteItem.emit({ item, response });
  }

  addToQueue() {
    this.countFileExit = 1;
    const fileBrowser = this.fileInput.nativeElement;
    this.uploader.addToQueue(fileBrowser.files);
  }

  loadingCondition(){
    if(this.countFileExit==1){
      this.loading =true;
      setTimeout(() => {
         this.loading =false;
      }, 8000);
    }
    else{

    }
   
  }
  refreshData(){
    
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    this.router.navigate([currentUrl]);
             });
  }

}
