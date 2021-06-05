import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }
  users:any=[];
  data:any;
  //users apicalls
  createuser(form:any):Observable<any>{
    return this.http.post("http://localhost:4000/createuser",form);
  }
  getuser(form:any):Observable<any>{
    return this.http.get(`http://localhost:4000/getuser/${form.rollno}/${form.password}`)
  }
  updatepwd(form:any):Observable<any>{
    return this.http.put(`http://localhost:4000/updatepwd`,form);
  }
  //data apicalls
  addinfo(form:any):Observable<any>{
    return this.http.post<any>("http://localhost:4000/enterdata",form);

  }
  getdata():Observable<any>{
    return this.http.get("http://localhost:4000/getdata");
  }
}
