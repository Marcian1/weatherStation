import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) {}
  getWeather(): Observable<any> {
    return this.http.get<any>('https://1a0e534df984.ngrok.io/');
  }
}
