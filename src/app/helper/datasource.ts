import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';



@Injectable({providedIn:'root'})
export class DataSourceService {
  constructor(private http: HttpClient) { }
  baseURL: string = "https://halsted-calculator.herokuapp.com/api";
  
    calculate(ob:any): Observable<any> {
        const header = new HttpHeaders();
        header.append('content-type','application/json');
        header.append('Access-Control-Allow-Origin', '*');
    
      // body=JSON.stringify(ob);
   // console.log(body)
    return this.http.post(this.baseURL, ob,{headers:header});
  }
}