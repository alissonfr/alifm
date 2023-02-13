import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userData: any = []
  type: string = 'tracks'
  timeRange: string = 'long_term'
  limit: number = 20
  offset: number = 0

  tracks: any = [];
  loggedIn = false;

  tab: number = 1;

  constructor(
    private spotifyService: SpotifyService
  ) {}

  ngOnInit() {
    this.getData()
  }

  async login() {
    this.spotifyService.login().then(data => {
      });
  }

  async handle() {
    this.spotifyService.handleCallback()
  }

  getData() {
    var data: any = {
      time_range: this.timeRange,
      limit: this.limit,
      offset: this.offset,
    };
    
    this.spotifyService.getData(data).subscribe((result: any) => {
        this.tracks = result.items
      })
  }

  changeTimeRange(tab: number) {
    this.tab = tab
    switch (tab) {
        case 1:
          this.timeRange = 'short_term'
          break;
        case 2:
          this.timeRange = 'medium_term'
          break;
        case 3:
          this.timeRange = 'long_term'
          break;
        default:
          this.timeRange = 'short_term'
          break;
    }
    this.getData()
  }
}
