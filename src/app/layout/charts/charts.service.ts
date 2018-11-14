import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor(private _http: HttpClient) { }
  chartsInfo() {
    return this._http.get("./assets/data/economies.json")
      .map(result => result);
  }
}
