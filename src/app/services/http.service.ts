import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService} from 'src/app/core/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private _http : HttpClient,
    private authService:AuthService
    ) { }
  
  get(url:string):Observable<any>{
    let token = this.authService.currentUserValue.token;
    return this._http.get<any>(url,{headers:{'x-access-token': token}});
  }
  postrequest(url:string):Observable<any>{
    let token = this.authService.currentUserValue.token;
    return this._http.post<any>(url,'',{headers:{'x-access-token': token}});
  }
  post(url:string, obj :object):Observable<any>{
    let token = this.authService.currentUserValue.token;
    return this._http.post<any>(url, obj,{headers:{'x-access-token': token}});
  }
  update(url:string, obj: object):Observable<any>{
    let token = this.authService.currentUserValue.token;
    return this._http.put<any>(url, obj,{headers:{'x-access-token': token}});
  }
  delete(url:string):Observable<any>{
    let token = this.authService.currentUserValue.token;
    return this._http.delete<any>(url,{headers:{'x-access-token': token}} );
  }
  
  
}
