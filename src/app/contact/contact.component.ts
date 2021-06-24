import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  companynames : any[]=['amazon','google','facebook','twitter','JPMC','microsoft'];
  constructor(private ds:DataService,private router:Router,private location:Location) { }
  lform=true;
  sform=false;
  forgotpwd=false;
  invalidrollno=false;
  invalidpwd=false;
  invalidemail=false;
  existingemail=false;
  existingrollno=false;
  loggedin=false;
  colleges=['VNRVJIET','CBIT','GRIET','JNTU'];
  branches=['CSE','IT','MECH','EIE','CIVIL','ECE','EEE'];

  ngOnInit(): void {
    if(this.ds.users.length>0){
      this.loggedin=true;
    }

  }
  createacc(form:any){
    this.invalidrollno=false;
    this.invalidpwd=false;
    this.invalidemail=false;
    this.existingemail=false;
    this.existingrollno=false;
    this.ds.createuser(form.value).subscribe(
      (res)=>{
        console.log("response from api",res);
        if(res=="invalidrollno"){
          this.invalidrollno=true;
        }
        else if(res=="existingemail"){
          this.existingemail=true;
        }
        else if(res=="existingrollno"){
          this.existingrollno=true;
        }
        else{
          this.ds.users.push(res);
          this.gotoaddinfo();
        }
      },
      (err)=>{console.log(err);}
    );
  }
  updatepwd(form:any){
    this.invalidrollno=false;
    this.invalidpwd=false;
    this.invalidemail=false;
    this.existingemail=false;
    this.existingrollno=false;
    this.ds.updatepwd(form.value).subscribe(
      (res)=>{
          console.log("response from api",res);
           if(res=="invalidemail"){
               this.invalidemail=true;
           }
           else{
              this.lform=true;
              this.forgotpwd=false;
              this.sform=false;
              alert(JSON.stringify(res));
            }
      },
      (err)=>{console.log(err)}
    );
  }
  getuser(form:any){
    this.invalidrollno=false;
    this.invalidpwd=false;
    this.invalidemail=false;
    this.existingemail=false;
    this.existingrollno=false;
      this.ds.getuser(form.value).subscribe(
        (res)=>{
          console.log("response from api",res);
          if(res.message=="invalidrollno"){
               this.invalidrollno=true;
          }
          else if(res.message=="invalidpwd"){
               this.invalidpwd=true;
           }
          else{
            this.ds.users.push(res.data);
            this.gotoaddinfo();
          }},
        (err)=>{console.log(err)}
      );
  }
  gotosignupform(){
    this.sform=true;
    this.lform=false;
    this.forgotpwd=false;
    this.invalidrollno=false;
    this.invalidpwd=false;
    this.invalidemail=false;
    this.existingemail=false;
    this.existingrollno=false;
  }
  gotologinform(){
    this.lform=true;
    this.sform=false;
    this.forgotpwd=false;
    this.invalidrollno=false;
    this.invalidpwd=false;
    this.invalidemail=false;
    this.existingemail=false;
    this.existingrollno=false;
  }
  gotoforgotpwd(){
    this.lform=false;
    this.sform=false;
    this.forgotpwd=true;
    this.invalidrollno=false;
    this.invalidpwd=false;
    this.invalidemail=false;
    this.existingemail=false;
    this.existingrollno=false;
  }
  reloadComponent() {
    this.router.navigateByUrl("/pagenotfound",{skipLocationChange:true}).then(()=>{
      this.router.navigate([decodeURI(this.location.path())]);
    });
  }
  gotohome(){
    this.router.navigateByUrl("/home").then(
      ()=>{this.router.navigate([decodeURI(this.location.path())])}
    );
  }
  gotoaddinfo(){
    this.router.navigateByUrl("/addinfo").then(
      ()=>{this.router.navigate([decodeURI(this.location.path())])}
    );
  }

}
