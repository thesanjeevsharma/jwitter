import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { APIService } from '../../services/api.service';
import { Router } from '@angular/router';
import { trigger, state, transition, animate } from '@angular/animations';
import { style } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations : [
    trigger('slideIn', [
      state('void', style({ opacity : 0, left : '10%' })),
      transition('void <=> *', [
        animate(200)
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private _fb : FormBuilder, private api: APIService, private _router: Router) { }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    return this.loginForm = this._fb.group({
      username : ['', [Validators.required]],
      password : ['', [Validators.required]]
    });
  }

  onLogin() {
    this.api.login(this.loginForm.value).subscribe((res) => {
      if(res['success']) {
        localStorage.setItem('token', res['data']['token']);
        this._router.navigate(['/']);
      }
      else {
        console.log(res['message']);
      }
    })
  }

}
