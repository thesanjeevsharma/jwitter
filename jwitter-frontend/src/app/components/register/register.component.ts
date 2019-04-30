import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { APIService } from '../../services/api.service';
import { Router } from '@angular/router';
import { trigger, transition, animate } from '@angular/animations';
import { state } from '@angular/animations';
import { style } from '@angular/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations : [
    trigger('slideIn', [
      state('void', style({ opacity : 0, left : '90%' })),
      transition('void <=> *', [
        animate(200)
      ])
    ])
  ]
})
export class RegisterComponent implements OnInit {

  registerForm : FormGroup;
  usernameTaken: Boolean = false;

  constructor(private _fb : FormBuilder, private api: APIService, private _router: Router) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    return this.registerForm = this._fb.group({
      username : ['', [Validators.required]],
      password : ['', [Validators.required]]
    });
  }

  onRegister() {
    this.api.register(this.registerForm.value).subscribe((res) => {
      if(res['success']) {
        this._router.navigate(['/login']);
      }
      else {
        console.log(res['message']);
      }
    })
  }

  checkUsername() {
    setTimeout(() => {
      if(this.registerForm.value.username) {
      this.api.checkUsername(this.registerForm.value.username).subscribe((res) => {
        if(res['success']) {
          this.usernameTaken = false;
        }
        else {
          this.usernameTaken = true;
        }
      })
      }
      else {
        this.usernameTaken = false;
      }
  }, 1000);
  }

}
