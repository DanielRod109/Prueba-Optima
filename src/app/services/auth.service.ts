import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserLogin } from '../classes/user-login';
import { Observable, tap } from 'rxjs';
import { ResponseLogin } from '../classes/response-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlAuth:string ="http://159.65.96.86:8080/services/auth/signin";

  private isLoggedIn: boolean = false; // Variable que verifica si se ha iniciado sesión
 
  constructor(private http:HttpClient) { }

  login(data:UserLogin): Observable<ResponseLogin>{
    return this.http.post<ResponseLogin>(this.urlAuth,data).pipe(
      tap((response:ResponseLogin) => {     
      if (response.accessToken != ""){
        this.isLoggedIn = true;
        }
      })
    );
  }


  logout(){
    this.isLoggedIn = false;
  }

  isLogin():boolean{
    return this.isLoggedIn;
  }
}
