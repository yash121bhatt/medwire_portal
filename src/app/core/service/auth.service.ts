import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../models/user";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string,role_id:any) {
    return this.http
      .post<any>(`${environment.apiUrl}auth/role-signin`, {
        email,
        password,
        role_id
      })
      .pipe(
        map((user) => {
          console.log(user);
          if(user.status_code===203){
      
          }
          else{
            this.http.post<any>(`${environment.apiUrl}auth/profile`, {
              id:user.data.userData.id,
             },{headers:{'x-access-token': user.data.token}}).subscribe(
              (result)=>{
              const user_detail ={
              userid:user.data.userData.id,
              img: result.data[0].img??"assets/image/user/demouser.png",
              username: user.data.userData.username,
              password: "",
              firstName: user.data.userData.first_name,
              lastName: user.data.userData.last_name,
              role: user.data.userData.user_type,
              roleID : user.data.userData.role_id,
              token: user.data.token,
              address:user.data.userData.address,
              pin_code:user.data.userData.pin_code,
              image_name:result.data[0].imgName!=null && result.data[0].imgName!="" ?  result.data[0].imgName : 'demouser.png',
              online_offline_status:user.data.userData.online_offline_status
            
            };
            localStorage.setItem("isOnline", user.data.userData.online_offline_status);
            localStorage.setItem("currentUser", JSON.stringify(user_detail)); 
            this.currentUserSubject.next(user_detail);  
            
            },
            (error)=>{
              console.log(error)
            }
  
            );
          }

          
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          // const user_detail ={
          //   userid:user.data.userData.id,
          //   img: user.data.userData.img??"assets/image/user/demouser.png",
          //   username: user.data.userData.username,
          //   password: "",
          //   firstName: user.data.userData.first_name,
          //   lastName: user.data.userData.last_name,
          //   role: user.data.userData.user_type,
          //   token: user.data.token,
          // };
          // localStorage.setItem("currentUser", JSON.stringify(user_detail));
          // this.currentUserSubject.next(user_detail);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
    return of({ success: false });
  }
}