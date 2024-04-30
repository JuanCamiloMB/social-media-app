import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { API } from '../../config';
import { DOCUMENT } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

import { ICOMMENT, IPOST } from '../../models/models';

@Injectable({
  providedIn: 'root',
})
export default class UserService {
  username: string = '';
  isAuth: boolean = false;

  showComments: ICOMMENT[] = [];

  posts: IPOST[] = [];

  constructor(
    private http: HttpClient,
    private _cookieService: CookieService,
    private router: Router
  ) {}

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

  getPosts() {
    this.http
      .get<{ results: any }>('https://randomuser.me/api/?results=10')
      .subscribe((posts) => {
        const postsFixed = posts.results.map((result: any )=> ({...result, hasLiked: false, likes: 0, comments: []}))
        this.posts = postsFixed as IPOST[];
      });
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

  signOut() {
    this._cookieService.delete('token');
    this.router.navigate(['/login']);
  }
}
