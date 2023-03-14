import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() limit: number = 10;

  @Output() changeDataTypeParent = new EventEmitter();
  @Output() isLoggedParent = new EventEmitter();

  constructor(
    private spotifyService: SpotifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isLoggedParent.emit(true);
    this.changeData('tracks');
    this.route.queryParams.subscribe((params: any) => {
      if(params.code) {
        this.spotifyService.handleCallback().then(data => {
          this.changeData('tracks');
          console.log('tueee2 ')
        });
      };
    });
  }

  }

  changeData(type: string) {
    this.changeDataTypeParent.emit(type);
  }

  async login() {
    this.spotifyService.login().then(data => {
      console.log('loguei')
      });
  }
 
}
