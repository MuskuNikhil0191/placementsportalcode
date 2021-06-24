import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import  {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-addinfo',
  templateUrl: './addinfo.component.html',
  styleUrls: ['./addinfo.component.css']
})
export class AddinfoComponent implements OnInit {

  skills=[
    {name:"C",isselected:false},
    {name:"C++",isselected:false},
    {name:"JAVA",isselected:false}, 
    {name:"PYTHON",isselected:false},
    {name:"JAVASCRIPT",isselected:false},
    {name:"SQL",isselected:false},
    {name:"DATA STRUCTURES AND ALGORITHSMS",isselected:false},
    {name:"HTML5",isselected:false},
    {name:"CSS",isselected:false},
    {name:"MACHINE LEARNING",isselected:false},
    {name:"ANGULARJS",isselected:false},
    {name:"REACTJS",isselected:false},
    {name:"PHP",isselected:false},
    {name:"NODEJS",isselected:false},
    {name:"EXPRESSJS",isselected:false},
    {name:"LINUX",isselected:false}
  ]
  skillsrequired:any;
  temp:any;
  iexp=true;
  constructor(private ds:DataService,private router:Router,private location:Location) { }
  name=this.ds.users[0].name;
  onsubmit(data:any){
    this.iexp=false;
    this.skillsrequired=this.skills.filter(x=>x.isselected==true).map(x=>x.name).join(",").toString();
    data=data.value;
    this.temp={rollno:this.ds.users[0].rollno,companyname:data.companyname,role:data.role,package:data.package,skills:this.skillsrequired,interviewexperience:data.interviewexperience};
    this.ds.addinfo(this.temp).subscribe(
       (res)=>{console.log(res)},
       (err)=>{console.log(err)}
     );
  }
  anotherresponse(){
    this.iexp=true;
  }
  ngOnInit(): void {
    if(this.ds.users.length==0){
      this.gotohome();
    }
  }
  logout(){
    this.ds.users.splice(0,this.ds.users.length);
  }
  gotohome(){
    this.router.navigateByUrl("/home").then(
      ()=>{this.router.navigate([decodeURI(this.location.path())])}
    );
  }
  reloadComponent() {
    this.router.navigateByUrl("/pagenotfound",{skipLocationChange:true}).then(()=>{
      this.router.navigate([decodeURI(this.location.path())]);
    });
  }

}
