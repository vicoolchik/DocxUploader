import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent implements OnInit {

  type:string="password"
  isText: boolean=false;
  eyeIcon: string ="fa-eye-slash";
  loginForm!: FormGroup;

  constructor(
    private fd: FormBuilder, 
    private auth: AuthService, 
    private router: Router,
    private userStore: UserStoreService){}

  ngOnInit(): void {
    this.loginForm=this.fd.group({
      username :['', Validators.required],
      password:['', Validators.required]
    })
  }

  hideShowPass(){
    this.isText=!this.isText;
    this.isText ? this.eyeIcon="fa-eye" : this.eyeIcon="fa-eye-slash";
    this.isText ? this.type="text": this.type="password";
  }
 
  onLogin(){
    if(this.loginForm.valid){
      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res)=>{
          alert(res.message);
          this.loginForm.reset();
          this.auth.storeToken(res.token);
          const tokenPayload= this.auth.decodeToken();
          this.userStore.setFullNameForStore(tokenPayload.name);
          this.userStore.setRoleForStore(tokenPayload.role);
          this.router.navigate(['dashboard'])
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })
    }else{
      ValidateForm.validateAllFormFileds(this.loginForm);
      alert("Your form is invalid")
    }
  }

}
