import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService} from 'src/app/core/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(
    private _http : HttpClient,
    private authService:AuthService
    ) { }
  
  get(url:string):Observable<any>{
    let token = this.authService.currentUserValue.token;
    return this._http.get<any>(url,{headers:{'x-access-token': token}});
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
    return this._http.delete<any>(url,{headers:{'x-access-token': token}});
  }
}
