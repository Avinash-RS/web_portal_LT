import { Component, OnInit } from '@angular/core';
import videojs from 'video.js';
import * as adapter from 'webrtc-adapter/out/adapter_no_global.js';
import * as RecordRTC from 'recordrtc';

@Component({
  selector: 'app-video-recorder',
  templateUrl: './video-recorder.component.html',
  styleUrls: ['./video-recorder.component.scss']
})
export class VideoRecorderComponent implements OnInit {
  inputSelector: any;
  inputSection: any;
  constructor() {}

  ngOnInit() { }

  ngAfterViewInit() {
    /* eslint-disable */
var devices, deviceId;
var options = {
    controls: true,
    width: 320,
    height: 240,
    fluid: false,
    bigPlayButton: false,
    controlBar: {
        volumePanel: false
    },
    plugins: {
        record: {
            audio: false,
            video: true,
            maxLength: 20,
            debug: true
        }
    }
};
Array.from(document.getElementsByClassName('inputSelector') as HTMLCollectionOf<HTMLElement>)[0].style.display = 'none';

// apply some workarounds for certain browsers
// applyVideoWorkaround();
console.log('tdfsxctcxsgfgx', this.inputSection);

var player = videojs('myVideo', options, function() {
    // print version information at startup
    var msg = 'Using video.js ' + videojs.VERSION +
        ' with videojs-record ' + videojs.getPluginVersion('record') +
        ' and recordrtc ' + RecordRTC.version;
    videojs.log(msg);
});

// enumerate devices once
player.one('deviceReady', function() {
    player.record().enumerateDevices();
});

player.on('enumerateReady', function() {
    devices = player.record().devices;

    // handle selection changes
    this.inputSelector = document.getElementById('selector');
    this.inputSelector.addEventListener('change', changeVideoInput);
    console.log('this.inputSelector', this.inputSelector);
    // populate select options
    var deviceInfo, option, i;
    for (i = 0; i !== devices.length; ++i) {
        deviceInfo = devices[i];
        option = document.createElement('option');
        option.value = deviceInfo.deviceId;
        if (deviceInfo.kind === 'videoinput') {
            console.info('Found video input device: ', deviceInfo.label);
            option.text = deviceInfo.label || 'input device ' +
                (this.inputSelector.length + 1);
            this.inputSelector.appendChild(option);
        }
    }

    if (this.inputSelector.length == 0) {
        // no output devices found, disable select
        option = document.createElement('option');
        option.text = 'No video input devices found';
        option.value = undefined;
        this.inputSelector.appendChild(option);
        this.inputSelector.disabled = true;
        console.warn(option.text);
    } else {
        console.info('Total video input devices found:', this.inputSelector.length);
    }

    // show input selector section
    Array.from(document.getElementsByClassName('inputSelector') as HTMLCollectionOf<HTMLElement>)[0].style.display = 'block';
   
});

function changeVideoInput(event) {
    var label = event.target.options[event.target.selectedIndex].text;
    deviceId = event.target.value;

    try {
        // change video input device
        player.record().setVideoInput(deviceId);

        console.log("Changed video input to '" + label + "' (deviceId: " +
            deviceId + ")");
    } catch (error) {
        console.warn(error);

        // jump back to first output device in the list as it's the default
        event.target.selectedIndex = 0;
    }
}

// error handling
player.on('enumerateError', function() {
    console.warn('enumerate error:', player.enumerateErrorCode);
});

player.on('deviceError', function() {
    console.warn('device error:', player.deviceErrorCode);
});

player.on('error', function(element, error) {
    console.error(error);
});

// user clicked the record button and started recording
player.on('startRecord', function() {
    console.log('started recording!');
});

// user completed recording and stream is available
player.on('finishRecord', function() {
    // the blob object contains the recorded data that
    // can be downloaded by the user, stored on server etc.
    console.log('finished recording: ', player.recordedData);
});
   }

}
