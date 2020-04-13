import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent  {
  sources: Array<Object>;

  constructor() {
    this.sources = [
      {
          src: "http://static.videogular.com/assets/audios/videogular.mp3",
          type: "audio/mp3"
      }
  ];
  }
}
