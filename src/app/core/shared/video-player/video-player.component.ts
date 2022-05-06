import { Component, Input } from '@angular/core';
import { CommonServicesService } from '@core/services/common-services.service';
// tslint:disable-next-line:class-name
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
  // tslint:disable-next-line:no-input-rename
  @Input('url') url: any;
  // tslint:disable-next-line:ban-types
  sources: Array<Object>;
  controls = false;
  autoplay = false;
  loop = false;
  preload = 'auto';
  // api: VgAPI;
  // fsAPI: VgFullscreenAPI;
  nativeFs = true;
  playback = '1.0';
  playbackRate: playback[] = [
    { value: '0.5', viewValue: '0.5' },
    { value: '1.0', viewValue: '1x' },
    { value: '2.0', viewValue: '2x' }
  ];

  constructor(public service: CommonServicesService) {
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.service.pauseVideo.subscribe((data: any) => {
      if (data === 'off') {
        // this.api.pause();
      }
    });
    this.sources = [
      {
        src: this.url,
        type: 'video/mp4'
      },
    ];
  }

  // onPlayerReady(api: VgAPI) {
  //   this.api = api;
  //   this.fsAPI = this.api.fsAPI;
  //   this.nativeFs = this.fsAPI.nativeFullscreen;

  //   this.api.getDefaultMedia().subscriptions.ended.subscribe(
  //     () => {
  //       this.api.getDefaultMedia().currentTime = 0;
  //     }
  //   );
  // }
  // added time to 10sec
  next(currenttime) {
    const time = currenttime + 10;
    // this.api.currentTime = time;
  }
  // less time to 10sec
  previous(currenttime) {
    const time = currenttime - 10;
    // this.api.currentTime = time;
  }

  onChangeNativeFs($event) {
    // this.fsAPI.nativeFullscreen = this.nativeFs;

  }
  // to speed up and speed down
  playbackValues(playbackValue) {
    // this.api.playbackRate = playbackValue.value;
  }

}
