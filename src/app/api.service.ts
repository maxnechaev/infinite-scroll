import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiKey: string = 'pQU4IGuOtXYPrjp3O11O3920KNDOSu4k';
  apiURL: string = `http://api.giphy.com/v1/gifs/random?api_key=${this.apiKey}`;

  constructor(private httpClient: HttpClient) { }

  getGifData() {
      return this.httpClient.get(`${this.apiURL}`);
    }

}
