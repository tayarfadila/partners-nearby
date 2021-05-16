import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Endpoint } from 'src/app/help/Endpoint';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Partners Nearby';
  year = new Date().getFullYear();
  loggedIn = sessionStorage.getItem(Endpoint.USER_KEY) ? true : false;
  errorMsg: string = '';
  loading = false;

  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    sessionStorage.setItem(Endpoint.LOGIN_KEY, Endpoint.LOGIN_INVALID);
  }

  login() {
    this.loggedIn = true;
    sessionStorage.setItem(Endpoint.USER_KEY, JSON.stringify('test'));
    this.loggedIn = true;
    sessionStorage.setItem(Endpoint.LOGIN_KEY, Endpoint.LOGIN_VALID);
  }

  logout() {
    try {
      sessionStorage.removeItem(Endpoint.LOGIN_KEY);
      sessionStorage.removeItem(Endpoint.USER_KEY);
      this.loggedIn = false;
    } catch (error) {
      console.log({ error });
    }
  }
}
