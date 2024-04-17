import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { API } from '../../config';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export default class UserService {
  username: string = '';
  isAuth: boolean = false;

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) {}

  get getUsername() {
    return this.username;
  }

  get getIsAuth() {
    return this.isAuth;
  }

  set setIsAuth(isAuth: boolean) {
    this.isAuth = isAuth;
  }

  set setUsername(username: string) {
    this.username = username;
  }

  logIn(username: string, password: string) {
    const url: string = `${API}/login`;

    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        withCredentials: 'true',
      }),
    };
    const body = {
      username,
      password,
    };
    return this.http.post(url, body, headers);
  }

  register(
    name: string,
    username: string,
    email: string,
    password: string,
    date: string
  ) {
    const url: string = `${API}/register`;

    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        withCredentials: 'true',
      }),
    };
    const body = {
      name,
      email,
      password,
      date,
      username,
    };

    return this.http.post(url, body, headers);
  }
}
