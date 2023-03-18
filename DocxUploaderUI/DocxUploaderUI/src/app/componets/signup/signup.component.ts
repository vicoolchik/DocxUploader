import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  type:string="password"
  isText: boolean=false;
  eyeIcon: string ="fa-eye-slash";
  singUpForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router){}

  ngOnInit(): void {
    this.singUpForm=this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  hideShowPass(){
    this.isText=!this.isText;
    this.isText ? this.eyeIcon="fa-eye" : this.eyeIcon="fa-eye-slash";
    this.isText ? this.type="text": this.type="password";
  }

  onSingup(){
    if(this.singUpForm.valid){
      console.log(this.singUpForm.value);

      this.auth.signUp(this.singUpForm.value)
      .subscribe({
        next:(res)=>{
          alert(res.message);
          this.singUpForm.reset();
          this.router.navigate(['login']);
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })
    }else{
      ValidateForm.validateAllFormFileds(this.singUpForm);
      alert("Your form is invalid")
    }
  }
}
