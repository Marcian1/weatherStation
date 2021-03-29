import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) {}
  getWeather(): Observable<any> {
    return this.http.get<any>('https://3f05678306f6.ngrok.io/');
  }
}
