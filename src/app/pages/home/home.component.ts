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
  recentlyPlayed: any = [];
  isLogged = false;
  showTracks = false;
  loading = false;

  tab: number = 1;

  constructor(
    private spotifyService: SpotifyService,
  ) {}

  ngOnInit() {

  }


  getTopItems() {
    this.loading = true;
    var data: any = {
      time_range: this.timeRange,
      limit: this.limit,
      offset: this.offset,
    };
    
    this.spotifyService.getTopItems(data, this.type).subscribe((result: any) => {
      this.loading = false;
      this.showTracks = true;
      this.tracks = result.items;
      console.log(this.tracks);
      console.log(this.showTracks);
    });
  }
  
  getRecentlyPlayed() {
    this.loading = true;
    var data: any = {
      limit: this.limit,
      offset: this.offset,
    };
    
    this.spotifyService.getRecentlyPlayed(data).subscribe((result: any) => {
        this.loading = false;
        this.showTracks = false;
        this.recentlyPlayed = result.items;
        console.log(this.recentlyPlayed);
        console.log(this.showTracks);
      });
  }

  changeDataType($event: any) {
    console.log('eventooooooooooooooooo ', $event)
    this.type = $event;
    if (this.type === 'recently') {
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

  isLoggedFeedback($event: any) {
    this.isLogged = $event
    console.log($event)
  }
}
