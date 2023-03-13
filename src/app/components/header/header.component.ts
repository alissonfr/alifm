import { Component, OnInit, Input, Output } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() isLogged: boolean = false;
  @Input() changeDataType: any;

  constructor(
    private spotifyService: SpotifyService,
  ) {}

  ngOnInit() {

  }

  changeData(type: string) {
    this.changeDataType(type);
  }

  async login() {
    this.spotifyService.login().then(data => {
      });
  }
 
}
