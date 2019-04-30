import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient) { }

  isAuthenticated() {
    if(localStorage.getItem('token')) {
      return true;
    }
    else {
      return false;
    }
  }

  login(credentials) {
    return this.http.post('http://localhost:3000/users/login', credentials);
  }

  register(credentials) {
    return this.http.post('http://localhost:3000/users/register', credentials);    
  }

  jweet(jweet) {
    return this.http.post('http://localhost:3000/jweets', jweet);
  }

  fetchJweets() {
    return this.http.get('http://localhost:3000/jweets');
  }

  mention(mention) {
    return this.http.get('http://localhost:3000/users/' + mention);
  }

  checkUsername(username) {
    return this.http.get('http://localhost:3000/users/check-username/' + username);
  }

  getMyMentions() {
    return this.http.get('http://localhost:3000/jweets/my-mentions');
  }

  getMyJweets() {
    return this.http.get('http://localhost:3000/jweets/my-jweets');    
  }

}
