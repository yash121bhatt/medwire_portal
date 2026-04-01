
import * as _ from 'lodash';

import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, Output } from '@angular/core';

import { BehaviorSubject, Subscription } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { AuthService } from 'src/app/core/service/auth.service';
import { environment } from "src/environments/environment";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

export enum FileQueueStatus {
  Pending,
  Success,
  Error,
  Progress
}

export class FileQueueObject {
  public file: any;
  public status: FileQueueStatus = FileQueueStatus.Pending;
  public progress: number = 0;
  public request: Subscription = null;
  public response: HttpResponse<any> | HttpErrorResponse = null;
  // user_id: string | Blob;

  constructor(file: any) {
    this.file = file;
  }

  // actions
  public upload = () => { /* set in service */ };
  public cancel = () => { /* set in service */ };
  public remove = () => { /* set in service */ };

  // statuses
  public isPending = () => this.status === FileQueueStatus.Pending;
  public isSuccess = () => this.status === FileQueueStatus.Success;
  public isError = () => this.status === FileQueueStatus.Error;
  public inProgress = () => this.status === FileQueueStatus.Progress;
  public isUploadable = () => this.status === FileQueueStatus.Pending || this.status === FileQueueStatus.Error;

}

// tslint:disable-next-line:max-classes-per-file
@Injectable()
export class UploadBulkReportService {

  public labDocumentUrl: string = `${environment.apiUrl}` + 'laboratory/upload-multiple-report';

  private _queue: BehaviorSubject<FileQueueObject[]>;
  private _files: FileQueueObject[] = [];
  //user_id: any;
  token: string;
  private header = new HttpHeaders();
  notUploadedFile: string | Blob;
  user_id: any;
  collectAllFile: any = [];
  finalFileUpload = [];
  countTheFinal: number = 1;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
    this._queue = <BehaviorSubject<FileQueueObject[]>>new BehaviorSubject(this._files);
  }

  // the queue
  public get queue() {
    return this._queue.asObservable();
  }

  // public events
  public onCompleteItem(queueObj: FileQueueObject, response: any): any {
    return { queueObj, response };
  }

  // public functions
  public addToQueue(data: any) {
    // add file to the queue
    _.each(data, (file: any) => this._addToQueue(file));
  }

  public clearQueue() {
    // clear the queue
    this._files = [];
    this.finalFileUpload = [];
    this.collectAllFile = [];
    this._queue.next(this._files);
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  public clearQueueSecond() {
    // clear the queue
    this._files = [];
    this.finalFileUpload = [];
    this.collectAllFile = [];
    this._queue.next(this._files);

  }


  public uploadAll() {
    const filr = [];
    // upload all except already successfull or in progress
    _.each(this._files, (queueObj: FileQueueObject) => {
      if (queueObj.isUploadable()) {

        // filr.push({queueObj});
        this._upload(queueObj);
      }
    });

  }

  // private functions
  private _addToQueue(file: any) {
    const queueObj = new FileQueueObject(file);

    // set the individual object events
    queueObj.upload = () => this._upload(queueObj);
    queueObj.remove = () => this._removeFromQueue(queueObj);
    queueObj.cancel = () => this._cancel(queueObj);

    // push to the queue
    this._files.push(queueObj);
    this._queue.next(this._files);
  }

  private _removeFromQueue(queueObj: FileQueueObject) {
    _.remove(this._files, queueObj);
  }

  private _upload(queueObj: FileQueueObject) {
    // const req = this._httpservices.post(environment.labDocumentUrl +'upload-multiple-report',form);

    // create form data for file

    this.user_id = this.authService.currentUserValue.userid;
    this.token = this.authService.currentUserValue.token;


    this.finalFileUpload.push({ file: queueObj.file, name: queueObj.file.name });
    // }

    this.collectAllFile.push(queueObj);
    // console.log('from  data', this.collectAllFile);




    // return;

    setTimeout(() => {
      if (this.countTheFinal == 1) {
        this.countTheFinal++;
        const form = new FormData();
        form.append('lab_id', this.user_id);
        for (let i = 0; i < this.finalFileUpload.length; i++) {
          console.log('fffinal1', this.finalFileUpload[i].file);
          form.append('report_document', this.finalFileUpload[i].file, this.finalFileUpload[i].name);
        }
        this.header = this.header.set('x-access-token', this.token);
        form.append('type', '2');
        // upload file and report progress
        const req = new HttpRequest('POST', this.labDocumentUrl, form, { headers: this.header });

        // upload file and report progress
        queueObj.request = this.http.request(req).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this._uploadProgress(queueObj, event);

            } else if (event) {


              if (event.body.status_code === "200") {
                //  setTimeout(() => {
                //    const currentUrl = this.router.url;
                //    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                //    this.router.navigate([currentUrl]);
                //    });
                //  }, 2000);
                Swal.fire(
                  '',
                  event.body.status,
                  'success'
                );

                for (let i = 0; i < this.collectAllFile.length; i++) {
                  const dataArray = event.body.notUploadedFile.notUploadedFile;

                  if (dataArray.lastIndexOf(this.collectAllFile[i].file.name) != -1) {
                    if (event instanceof HttpResponse) {
                      this._uploadFailed(this.collectAllFile[i], event.body.status_code);
                    }
                  }
                  else {
                    if (event instanceof HttpResponse) {
                      this._uploadComplete(this.collectAllFile[i], event.body.status_code);
                    }
                  }

                }
              }

            }

          },
          (err: HttpErrorResponse) => {

            if (err.error instanceof Error) {
              // A client-side or network error occurred. Handle it accordingly.
              this._uploadFailed(queueObj, err);
            } else {

              for (let i = 0; i < this.collectAllFile.length; i++) {
                this._uploadFailed(this.collectAllFile[i], err);
              }

              // The backend returned an unsuccessful response code.
              this._uploadFailed(queueObj, err);
            }
          }
        );

        return queueObj;
      }

    }, 4500);


  }

  private _cancel(queueObj: FileQueueObject) {
    // update the FileQueueObject as cancelled
    queueObj.request.unsubscribe();
    queueObj.progress = 0;
    queueObj.status = FileQueueStatus.Pending;
    this._queue.next(this._files);
  }

  private _uploadProgress(queueObj: FileQueueObject, event: any) {
    // update the FileQueueObject with the current progress
    const progress = Math.round(100 * event.loaded / event.total);
    queueObj.progress = progress;
    queueObj.status = FileQueueStatus.Progress;
    this._queue.next(this._files);
  }

  private _uploadComplete(queueObj: FileQueueObject, response: HttpResponse<any>) {
    // update the FileQueueObject as completed
    queueObj.progress = 100;
    queueObj.status = FileQueueStatus.Success;
    queueObj.response = response;
    this._queue.next(this._files);
    this.onCompleteItem(queueObj, response.body);
  }

  private _uploadFailed(queueObj: FileQueueObject, response: HttpErrorResponse) {
    // update the FileQueueObject as errored
    queueObj.progress = 0;
    queueObj.status = FileQueueStatus.Error;
    queueObj.response = response;
    this._queue.next(this._files);
  }

  private _uploadMY(queueObjs) {
    console.log(queueObjs)

    // const req = this._httpservices.post(environment.labDocumentUrl +'upload-multiple-report',form);

    // create form data for file

    this.user_id = this.authService.currentUserValue.userid;
    this.token = this.authService.currentUserValue.token;
    var finalFileUpload = [];
    // let token = this.authService.currentUserValue.token;
    // return this._http.post<any>(url, obj,{headers:{'x-access-token': token}});
    for (let i = 0; i < queueObjs.length; i++) {
      const form = new FormData();
      finalFileUpload.push({ file: queueObjs[i].queueObj.file })
    }


    // return;
    setTimeout(() => {

      const form = new FormData();
      form.append('lab_id', this.user_id);
      for (let i = 0; i < finalFileUpload.length; i++) {
        console.log('fffinal1', finalFileUpload[i].file);
        form.append('report_document', finalFileUpload[i].file);
      }
      this.header = this.header.set('x-access-token', this.token);
      form.append('type', '1');


      // upload file and report progress
      const req = new HttpRequest('POST', this.labDocumentUrl, form, { headers: this.header });

      // upload file and report progress
      queueObjs.request = this.http.request(req).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this._uploadProgress(queueObjs, event);

          } else if (event instanceof HttpResponse) {
            if (event.body.status_code == 200) {
              setTimeout(() => {
                const currentUrl = this.router.url;
                this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                  this.router.navigate([currentUrl]);
                });
              }, 2000);
              Swal.fire(
                '',
                event.body.status,
                'success'
              )
            }
            this._uploadComplete(queueObjs, event);

          }

        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            Swal.fire(
              '',
              err.message,
              'error'
            )
            // A client-side or network error occurred. Handle it accordingly.
            this._uploadFailed(queueObjs, err);
          } else {
            // The backend returned an unsuccessful response code.
            this._uploadFailed(queueObjs, err);
          }
        }
      );

      return queueObjs;
    }, 4500);


  }
}
