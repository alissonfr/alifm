import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() isLogged: boolean = false;
  @Input() limit: number = 10;

  @Output() changeDataTypeParent = new EventEmitter();

  constructor(
    private spotifyService: SpotifyService,
  ) {}

  ngOnInit() {
  }

  changeData(type: string) {
    this.changeDataTypeParent.emit(type);
  }

  emitToParent(type: string) {

  }

  async login() {
    this.spotifyService.login().then(data => {
      });
  }
 
}
