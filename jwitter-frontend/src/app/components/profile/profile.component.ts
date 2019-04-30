import { Component, OnInit } from '@angular/core';
import { Jweet } from '../../models/jweet';
import { APIService } from '../../services/api.service';
import { trigger, transition, animate } from '@angular/animations';
import { style } from '@angular/animations';
import { state } from '@angular/animations';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
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
export class ProfileComponent implements OnInit {

  mentions: Jweet[];
  jweets: Jweet[];

  constructor(private api: APIService) { }

  ngOnInit() {
    this.getMentions();
    this.getJweets();
  }

  getMentions() {
    this.api.getMyMentions().subscribe((res) => {
      if(res['success']) {
        console.log(res['data']);
        this.mentions = res['data'];
      }
      else {
        console.log(res['message']);
      }
    })
  }

  getJweets() {
    this.api.getMyJweets().subscribe((res) => {
      if(res['success']) {
        console.log(res['data']);
        
        this.jweets = res['data'];
      }
      else {
        console.log(res['message']);
      }
    })
  }

}
