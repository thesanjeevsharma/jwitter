import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { APIService } from '../../services/api.service';
import { Jweet } from '../../models/jweet';
import { trigger, transition, animate } from '@angular/animations';
import { style } from '@angular/animations';
import { state } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations : [
    trigger('fade', [
      transition(':enter', [ // void => *
        style({ opacity : 0 }),
        animate(2000)
      ])
    ]),
    trigger('slideIn', [
      state('void', style({ transform : 'translateY(-50px)', opacity : 0 })),
      transition('void <=> *', [
        animate(500)
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  jweetForm: FormGroup;
  jweets: Jweet[];
  mentions: string[];

  constructor(private _fb: FormBuilder, private api: APIService, private _router : Router) { }

  ngOnInit() {
    this.createJweetForm();
    this.fetchJweets();
  }

  createJweetForm() {
    return this.jweetForm = this._fb.group({
      body : ['', [Validators.required, Validators.maxLength(1024)]]
    })
  }

  onJweet() {
    this.api.jweet(this.jweetForm.value).subscribe((res) => {
      if(res['success']) {
        this.jweetForm.reset();
        this.jweets.unshift(res['data']['jweet']);
      } 
      else {
        console.log(res['message']);
        if(res['message'] === 'Not logged in!') {
          this._router.navigate(['/login']);
        }
      }
    })
  }

  fetchJweets() {
    this.api.fetchJweets().subscribe((res) => {
      if(res['success']) {
        this.jweets = res['data'];
      }
      else {
        console.log(res['message']);
      }
    })
  }

  autoGrow() {
    if(this.jweetForm.value.body) {
      let words = this.jweetForm.value.body.split(' ');
      if(words[words.length - 1][0] === "@") {
        let mention = words[words.length - 1].slice(1);
        this.api.mention(mention).subscribe((res) => {
          this.mentions = res['data'];
        })
      }
      else {
        this.mentions = [];        
      }
      document.getElementById('jweetLength').innerText = this.jweetForm.value.body.length;
      if(this.jweetForm.value.body.length > 1024) {
        document.getElementById('jweetLength').parentElement.style.color = 'crimson';
      }
      else {
        document.getElementById('jweetLength').parentElement.style.color = '#666';
      }
    }
  }

  mentioned(username) {
    let freshBody = this.jweetForm.value.body;
    freshBody = freshBody.split(' ');
    freshBody[freshBody.length - 1] = '@' + username;
    freshBody = freshBody.join(' ');
    this.jweetForm.patchValue({
      body : freshBody
    })
    this.mentions = [];
  }

}