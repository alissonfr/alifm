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
  timeRange: string = 'short_term'
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
          this.getTopItems();
          this.isLogged = true;
        });
      };
    });
  }



  getTopItems() {
    var data: any = {
      time_range: this.timeRange,
      limit: this.limit,
      offset: this.offset,
    };
    
    this.spotifyService.getTopItems(data, this.type).subscribe((result: any) => {
        this.tracks = result.items;
        console.log(this.tracks);
      });
  }

  getRecentlyPlayed() {
    var data: any = {
      time_range: this.timeRange,
      limit: this.limit,
      offset: this.offset,
    };
    
    this.spotifyService.getRecentlyPlayed(data).subscribe((result: any) => {
        this.tracks = result.items;
        console.log(this.tracks);
      });
  }

  changeDataType(type: string) {
    this.type = type;
    if (type === 'recently') {
      this.getRecentlyPlayed();
    } else {
      this.getTopItems();
    }
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
    this.getTopItems();
  }

  changeLimit() {
    this.limit = this.limit + 10;
    this.getTopItems();
  }
}
