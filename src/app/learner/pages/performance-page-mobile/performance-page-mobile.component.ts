import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { GlobalServiceService } from "@core/services/handlers/global-service.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonServicesService } from "@core/services/common-services.service";
import { MatDialog } from "@angular/material";
import { MatAccordion } from "@angular/material/expansion";
import { LearnerServicesService } from "@learner/services/learner-services.service";
import { WcaService } from "@wca/services/wca.service";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { DatePipe } from "@angular/common";
import { appendFile } from "fs";
import videojs from "video.js";
import * as adapter from "webrtc-adapter/out/adapter_no_global.js";
import * as RecordRTC from "recordrtc";
// Required imports when recording audio-only using the videojs-wavesurfer plugin
import * as WaveSurfer from "wavesurfer.js";
import * as MicrophonePlugin from "wavesurfer.js/dist/plugin/wavesurfer.microphone.js";
WaveSurfer.microphone = MicrophonePlugin;

// Register videojs-wavesurfer plugin
import Wavesurfer from "videojs-wavesurfer/dist/videojs.wavesurfer.js";
//import Wavesurfer from 'videojs-wavesurfer/dist/videojs.wavesurfer.js';

// register videojs-record plugin with this import
import * as Record from "videojs-record/dist/videojs.record.js";

@Component({
  selector: "app-performance-page-mobile",
  templateUrl: "./performance-page-mobile.component.html",
  styleUrls: ["./performance-page-mobile.component.scss"],
})
export class PerformancePageMobileComponent implements OnInit {
  // reference to the element itself: used to access events and methods
  private _elementRef: ElementRef;

  // index to create unique ID for component
  idx = "clip1";

  private config: any;
  private player: any;
  private plugin: any;
  @ViewChild("videoInput") videoInput;
  selectedName = "Perform";
  selectedTabIndex: number;
  checkDetails: any;
  performdetailPage = false;
  arrowUP = false;
  videoPerview = false;
  @Input() detailDataToPerform;
  @Input() courceDetails;
  @Output() menuSelected = new EventEmitter<any>();
  userDetail: any;
  courseName: any;
  courseid: any;
  performDetails: any;
  itrationStarted: boolean;
  itrationEnded: boolean;
  submitStatus: string;
  performActivityData: any;
  indexNumber: number;
  openIndex: number;
  performsData: any;
  itrationData: any;
  selectPerformfile: any[] = [];
  submitType: string;

  constructor(
    private commonServices: CommonServicesService,
    public Lservice: LearnerServicesService,
    private gs: GlobalServiceService,
    private dialog: MatDialog,
    public wcaservice: WcaService,
    private toastr: ToastrService,
    public route: Router,
    public datePipe: DatePipe,
    elementRef: ElementRef
  ) {
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
        : localStorage.getItem("Courseid");
      this.courseName = this.checkDetails
        ? this.checkDetails.courseName
        : localStorage.getItem("CourseName");
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
      width: '100%',
      height: '100%',
      bigPlayButton: false,
      controlBar: {
        volumePanel: false,
      },
      plugins: {
        // configure videojs-record plugin
        record: {
          audio: true,
          video: true,
          debug: true,
        },
      },
    };
  }

  ngOnInit() {
    console.log("this.performDetails 1");
    this.getperformActivityData();
  }

  ngAfterViewInit() {
    // ID with which to access the template's video element
    let el = 'video_' + this.idx;

    // setup the player via the unique element ID
    this.player = videojs(document.getElementById(el), this.config, () => {
      console.log('player ready! id:', el);

      // print version information at startup
      var msg = 'Using video.js ' + videojs.VERSION +
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
      console.log('finished recording: ', this.player.recordedData);
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
    ngOnDestroy() {
      if (this.player) {
        this.player.dispose();
        this.player = false;
      }
    }

    submitDeleteVideo(videoName, itrdata, perform) {
      let videoFile = [];
      videoFile.push(videoName);
      let data = {
        course_id: perform.course_id,
        module_id: perform.module_id,
        topic_id: perform.topic_id,
        user_id: this.userDetail.user_id,
        submit_status: this.submitStatus,
        total_mark: itrdata.total_mark,
        submitType: 'perform',
        submitAction: this.submitType,
        iterationid: itrdata.iterationid,
        object_id: perform.perform_id,
        videodetails: this.submitType === 'delete' ? videoFile : []
    };
      this.Lservice.learnerSumbitdeleteVideo(data).subscribe((response: any) => {
         if (response.success === true) {
          this.toastr.success(response.message);
          this.getperformActivityData();
          videoFile = [];
        } else {
          this.toastr.warning(response.message);
        }
      });
    }

  getperformActivityData() {
    // console.log("this.performDetails 1234");
    this.Lservice.getperformActivityData(
      this.userDetail.user_id,
      this.courseid
      // this.courseid
    ).subscribe((data: any) => {
      if (
        data &&
        data.data &&
        data.data.getperformActivityData &&
        data.data.getperformActivityData.data
      ) {
        this.performDetails = data.data.getperformActivityData.data;
        console.log("this.performDetails", this.performDetails);
        this.performDetails.forEach((element) => {
          const startDate = new Date(element.performActivity.activitystartdate);
          element.activityStartDate = moment(startDate).format("ll");
          element.startDate = moment(startDate).format("DD-MM-YYYY HH:MM");
          const endDate = new Date(element.performActivity.activityenddate);
          element.activityEndDate = moment(endDate).format("ll");
          if (moment(new Date()).format("ll") < element.activityStartDate) {
            this.itrationStarted = true;
          } else {
            this.itrationStarted = false;
          }
          if (moment(new Date()).format("ll") > element.activityEndDate) {
            this.itrationEnded = true;
            this.submitStatus = "ontime";
          } else {
            this.itrationEnded = false;
            this.submitStatus = "late";
          }
        });
      }
    });
  }

  emiteData() {
    const data = {
      selectedName: this.selectedName,
      selectedTabIndex: this.selectedTabIndex,
    };
    console.log("data", data);
    this.commonServices.menuSelectedPerform$.next(data);
  }

  openItration(index) {
    this.openIndex = index;
  }

  getPerformActivity(number, performActivity) {
    console.log("performActivity", number, performActivity);
    this.indexNumber = number;
    this.performActivityData = performActivity;
  }

  performlearnerUploadVideo() {
    const currentDate = new Date();
    const performVideo = new FormData();
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.selectPerformfile.length; i++) {
      performVideo.append("uploadvideo", this.selectPerformfile[i]);
    }
    performVideo.append(
      "course_id",
      this.performsData.performActivity.course_id
    );
    performVideo.append(
      "module_id",
      this.performsData.performActivity.module_id
    );
    performVideo.append("topic_id", this.performsData.performActivity.topic_id);
    performVideo.append("user_id", this.userDetail.user_id);
    performVideo.append("submit_status", this.submitStatus);
    performVideo.append("total_mark", this.itrationData.total_mark);
    performVideo.append("submitType", "perform");
    performVideo.append("submitAction", this.submitType);
    performVideo.append("iterationid", this.itrationData.iterationid);
    performVideo.append(
      "object_id",
      this.performsData.performActivity.perform_id
    );
    this.Lservice.learnerUploadVideo(performVideo).subscribe((data: any) => {
      if (data.success === true) {
        this.toastr.success(data.message);
        this.getperformActivityData();
        this.selectPerformfile = [];
      } else {
        this.toastr.warning(data.message);
      }
    });
  }

  uploadDocument(event) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < event.target.files.length; i++) {
      this.selectPerformfile.push(event.target.files[i]);
    }
    this.performlearnerUploadVideo();
  }

  uploadDocuments(itration, perform) {
    this.performsData = perform;
    this.itrationData = itration;
    this.videoInput.nativeElement.click();
  }
}
