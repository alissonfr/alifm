import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  apiUrl: string;
  api: string;

  constructor(
    private http: HttpClient,
    private router: Router
    ) {
    this.apiUrl = environment.apiSpotify
    this.api = environment.api
  }

  getToken() {
    let token: any = localStorage.getItem('access_token')
    if (token) {
      return token;
    }
    return null
  }

  async login() {
    const clientId = '0a0be73ac35b43b0ac1eb0688fd80450';
    const redirectUri = encodeURIComponent(this.api);
    const scope = encodeURIComponent('user-top-read, user-read-recently-played, user-read-currently-playing');
    const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;
  
    window.location.href = url;
  }

  async handleCallback() {
    const code = this.getCodeFromUrl();
    if (!code) return;
    const clientId = '0a0be73ac35b43b0ac1eb0688fd80450';
    const clientSecret = '640e417de18142f7a8e88a55af5e9a20';
    const redirectUrl = this.api;
    console.log(redirectUrl);
    const response: any = await this.http
      .post('https://accounts.spotify.com/api/token', null, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${(btoa(`${clientId}:${clientSecret}`))}`,
        },
        params: {
          'grant_type': 'authorization_code',
          'code': code,
          'redirect_uri': redirectUrl,
        },
      })
      .toPromise();
  
    localStorage.setItem('access_token', response.access_token);
    localStorage.setItem('refresh_token', response.refresh_token);
    this.router.navigate(['/']);
    return response
  }

  getCodeFromUrl() {
    const match = window.location.search.match(/code=([^&]*)/);
    return match ? match[1] : null;
  }

  getTopItems(data: any, type: string): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      }),
      params: data
    }
    return this.http.get(this.apiUrl + `me/top/${type}`, httpOptions)
  }

  getRecentlyPlayed(data: any): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      }),
      params: data
    }
    return this.http.get(this.apiUrl + `me/player/recently-played`, httpOptions)
  }

  getUser(data: any): Observable<any> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      }),
      params: data
    }
    return this.http.get(this.apiUrl + `me/`, httpOptions)
  }
}
