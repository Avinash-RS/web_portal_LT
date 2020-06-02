import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { VgAPI, VgFullscreenAPI } from 'videogular2/compiled/core';
export interface playback {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})

export class VideoPlayerComponent {
  @Input('url') url: any;
  sources: Array<Object>;
  controls: boolean = false;
  autoplay: boolean = false;
  loop: boolean = false;
  preload: string = 'auto';
  api: VgAPI;
  fsAPI: VgFullscreenAPI;
  nativeFs: boolean = true;
  playback = '1.0';
  playbackRate: playback[] = [
    { value: '0.5', viewValue: '0.5' },
    { value: '1.0', viewValue: '1x' },
    { value: '2.0', viewValue: '2x' }
  ];

  constructor() {
  }
  ngOnInit() {
    this.sources = [
      {
        src: this.url.preview_video,
        type: "video/mp4"
      },
    ];
  }
  
  onPlayerReady(api: VgAPI) {
    this.api = api;
    this.fsAPI = this.api.fsAPI;
    this.nativeFs = this.fsAPI.nativeFullscreen;

    this.api.getDefaultMedia().subscriptions.ended.subscribe(
      () => {
        // Set the video to the beginning
        this.api.getDefaultMedia().currentTime = 0;
      }
    );
  }
  // added time to 10sec
  next(currenttime) {
    var time = currenttime + 10
    this.api.currentTime = time
  }
  // less time to 10sec
  previous(currenttime) {
    var time = currenttime - 10
    this.api.currentTime = time
  }

  onChangeNativeFs($event) {
    this.fsAPI.nativeFullscreen = this.nativeFs;

  }
  // to speed up and speed down 
  playbackValues(playbackValue) {
    this.api.playbackRate = playbackValue.value
  }

}
