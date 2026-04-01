import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService} from 'src/app/core/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UnautherizehttpService {


  constructor(
    private _http : HttpClient,
    private authService:AuthService
    ) { }
  
  get(url:string):Observable<any>{
   
    return this._http.get<any>(url);
  }
  post(url:string, obj :object):Observable<any>{
   
    return this._http.post<any>(url, obj);
  }
  update(url:string, obj: object):Observable<any>{
    let token = this.authService.currentUserValue.token;
    return this._http.put<any>(url, obj);
  }
  delete(url:string):Observable<any>{
    let token = this.authService.currentUserValue.token;
    return this._http.delete<any>(url);
  }
  
}
