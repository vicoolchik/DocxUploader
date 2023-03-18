import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
   
  //public users: any=[];

  public fullName: string="";

  constructor(private api: ApiService , private auth: AuthService , private  userStore: UserStoreService){}

  ngOnInit() {
    //this.api.getUsers()
    //.subscribe(res=>{
    //  this.users=res;
    //});

    this.userStore.getFullNameFromStore()
    .subscribe(variableName => {
      let fullNameFromToken = this.auth.getFullNameFromToken();
      this.fullName = variableName || fullNameFromToken;
    });
  }

  logout(){
    this.auth.singOut();
  }
}
