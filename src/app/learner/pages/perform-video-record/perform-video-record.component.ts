import { Component, OnInit, Input, OnDestroy, ElementRef } from '@angular/core';
import videojs from 'video.js';
import * as adapter from 'webrtc-adapter/out/adapter_no_global.js';
import * as RecordRTC from 'recordrtc';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonServicesService } from '@core/services/common-services.service';
/*
// Required imports when recording audio-only using the videojs-wavesurfer plugin
import * as WaveSurfer from 'wavesurfer.js';
import * as MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone.js';
WaveSurfer.microphone = MicrophonePlugin;

// Register videojs-wavesurfer plugin
import * as Wavesurfer from 'videojs-wavesurfer/dist/videojs.wavesurfer.js';
*/

// register videojs-record plugin with this import
import * as Record from 'videojs-record/dist/videojs.record.js';

@Component({
  selector: 'app-perform-video-record',
  templateUrl: './perform-video-record.component.html',
  styleUrls: ['./perform-video-record.component.scss']
})
export class PerformVideoRecordComponent implements OnInit {
  @Input() performDetailsSend: any;
  @Input() itrationSend: any;
  userDetail: any;
  courseid: any;
  checkDetails: any;
  courseName: any;
  videopath: any;

  // tslint:disable-next-line:variable-name
  private _elementRef: ElementRef;

  // index to create unique ID for component
  idx = 'clip1';

  private config: any;
  private player: any;
  private plugin: any;


  constructor(elementRef: ElementRef, private gs: GlobalServiceService,
              private commonServices: CommonServicesService, private sanitizer: DomSanitizer,
              public toastr: ToastrService, public route: Router, public Lservice: LearnerServicesService) {
    const detail =
      this.route.getCurrentNavigation() &&
      this.route.getCurrentNavigation().extras &&
      this.route.getCurrentNavigation().extras.state &&
      this.route.getCurrentNavigation().extras.state.data;
    this.checkDetails = detail;
    if (this.gs.checkLogout()) {
      this.userDetail = this.gs.checkLogout();
      this.courseid = this.checkDetails
        ? this.checkDetails.courseId
        : localStorage.getItem('Courseid');
      this.courseName = this.checkDetails
        ? this.checkDetails.courseName
        : localStorage.getItem('CourseName');
    }
    this.player = false;

    // save reference to plugin (so it initializes)
    this.plugin = Record;

    // video.js configuration
    this.config = {
      controls: true,
      autoplay: false,
      fluid: false,
      loop: false,
      width: 320,
      height: 240,
      bigPlayButton: false,
      controlBar: {
        volumePanel: false
      },
      plugins: {
        /*
        // wavesurfer section is only needed when recording audio-only
        wavesurfer: {
            backend: 'WebAudio',
            waveColor: '#36393b',
            progressColor: 'black',
            debug: true,
            cursorWidth: 1,
            displayMilliseconds: true,
            hideScrollbar: true,
           /* plugins: [
                // enable microphone plugin
                WaveSurfer.microphone.create({
                    bufferSize: 4096,
                    numberOfInputChannels: 1,
                    numberOfOutputChannels: 1,
                    constraints: {
                        video: false,
                        audio: true
                    }
                })
            ]
        },
        */
        // configure videojs-record plugin
        record: {
          audio: true,
          video: true,
          maxLength: 10000000,
          debug: true,
          // fire the timestamp event every 2 seconds
          //  timeSlice: 2000
        }
      }
    };
  }

  ngOnInit() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    console.log('performDetailsSend', this.performDetailsSend);
    console.log('itrationSend', this.itrationSend);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    // ID with which to access the template's video element
    const el = 'video_' + this.idx;

    // setup the player via the unique element ID
    this.player = videojs(document.getElementById(el), this.config, () => {
      console.log('player ready! id:', el);

      // print version information at startup
      const msg = 'Using video.js ' + videojs.VERSION +
        ' with videojs-record ' + videojs.getPluginVersion('record') +
        ' and recordrtc ' + RecordRTC.version;
      videojs.log(msg);
    });

    // device is ready
    this.player.on('deviceReady', () => {
      console.log('device is ready!');
    });

    // user clicked the record button and started recording
    this.player.on('startRecord', () => {
      console.log('started recording!');
    });

    // user completed recording and stream is available
    this.player.on('finishRecord', () => {
      // recordedData is a blob object containing the recorded data that
      // can be downloaded by the user, stored on server etc.
      const performVideo = new FormData();
      performVideo.append('image', this.player.recordedData);
      this.Lservice.uploadVideo(performVideo).subscribe((data: any) => {
        if (data.Message === 'Success') {
          this.videopath = 'https://edutechstorage.blob.core.windows.net/' + data.Result.path;
          const videoDetails = {
            videourl: this.videopath,
            fileName: data.Result.filename,
            size: data.Result.size
          };
          this.Lservice.closeRecoderdData$.next(videoDetails);
          this.Lservice.performDetailsSend$.next(this.performDetailsSend);
          this.Lservice.itrationSend$.next(this.itrationSend);
        } else {
          this.toastr.warning(data.message);
        }
      });


      // var buffer = await this.player.recordedData.arrayBuffer();
      // console.log('buffer buffer', buffer);
    });

    // error handling
    this.player.on('error', (element, error) => {
      console.warn(error);
    });

    this.player.on('deviceError', () => {
      console.error('device error:', this.player.deviceErrorCode);
    });
  }

  // use ngOnDestroy to detach event handlers and remove the player
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
      this.player = false;
    }
  }




}
