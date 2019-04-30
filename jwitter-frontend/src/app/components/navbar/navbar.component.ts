import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private api : APIService, private _router: Router) { }

  ngOnInit() {
  }

  logout() {
    localStorage.clear();
    this._router.navigate(['/login']);
  }
}
