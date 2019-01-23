import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  _apiURI: string;

  constructor() {
    this._apiURI = 'http://localhost:4200';
  }

  getApiURI() {
    return this._apiURI;
  }
}
