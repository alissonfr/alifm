import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  limit: number = 10
  offset: number = 0

  tracks: any = [];
  isLogged = false;

  tab: number = 1;

  constructor(
    private spotifyService: SpotifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      if(params.code) {
        this.spotifyService.handleCallback().then(data => {
          this.getData();
          this.isLogged = true;
        });
      };
    });
  }

  async login() {
    this.spotifyService.login().then(data => {

      });
  }

  getData() {
    var data: any = {
      time_range: this.timeRange,
      limit: this.limit,
      offset: this.offset,
    };
    
    this.spotifyService.getData(data, this.type).subscribe((result: any) => {
        this.tracks = result.items;
      });
  }

  changeDataType(type: string) {
    this.type = type;
    this.getData();
  }

  changeTimeRange(tab: number) {
    this.tab = tab;
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
    };
    this.getData();
  }

  changeLimit() {
    this.limit = this.limit + 10;
    this.getData();
  }
}
