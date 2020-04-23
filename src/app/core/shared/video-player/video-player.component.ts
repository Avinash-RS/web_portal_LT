import { Component, OnInit } from '@angular/core';
import { VgAPI, VgFullscreenAPI } from 'videogular2/compiled/core';
@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent {
  title = 'videoplayer';
  sources: Array<Object>;
    controls: boolean = false;
    autoplay: boolean = false;
    loop: boolean = false;
    preload: string = 'auto';
    api: VgAPI;
    fsAPI: VgFullscreenAPI;
    nativeFs: boolean = true;

    constructor() {
        this.sources = [
            {
                src: "http://static.videogular.com/assets/videos/videogular.mp4",
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
    next(currenttime){
      var time =  currenttime + 10
      this.api.currentTime = time
    }
   // less time to 10sec
    previous(currenttime){
      var time =  currenttime - 10
      this.api.currentTime = time
    }

    onChangeNativeFs($event) {
        this.fsAPI.nativeFullscreen = this.nativeFs;
        
    }

}
