import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-gif',
  templateUrl: './gif.component.html',
  styleUrls: ['./gif.component.css']
})
export class GifComponent implements OnInit {

URLList: string[] = [];
dummyGif: string = 'https://media0.giphy.com/media/1xVfBttjb6DbRoe3M6/giphy.gif';

  constructor(public apiService: ApiService) {

  }

  ngOnInit() {
    this.addURLToArray();
  }

  onScrollEnd() {
    this.addURLToArray();
  }

  addURLToArray(){
    const length = this.URLList.length;
    let gifURL: any;
    for (let i = length; i < length + 20; i++) {
      this.getGifData().subscribe(res => {
        gifURL = res;
        gifURL = gifURL.data.image_url;
        if (gifURL) {
          this.URLList.push(gifURL);
        }
        else {
          this.URLList.push(this.dummyGif);
        }
      })
    }
    console.log(this.URLList);
    return this.URLList;
  }

  getGifData(){
    return this.apiService.getGifData();
  }

}
