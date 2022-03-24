import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  ChangeDetectorRef,
  ViewChild,
  HostListener,
  ElementRef,
  ViewContainerRef,
} from "@angular/core";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonServicesService } from "@core/services/common-services.service";
import { GlobalServiceService } from "@core/services/handlers/global-service.service";
import { environment } from "../../../../environments/environment";
import { AlertServiceService } from "@core/services/handlers/alert-service.service";
import { LearnerServicesService } from "@learner/services/learner-services.service";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { MatDialog, MatSidenav, MatTabGroup } from "@angular/material";
import { ToastrService } from "ngx-toastr";
import * as moment from "moment";
import { SocketioService } from "@learner/services/socketio.service";
import { TranslateService } from "@ngx-translate/core";
import { NoopScrollStrategy } from "@angular/cdk/overlay";
import { OwlOptions } from "ngx-owl-carousel-o";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import * as _ from "lodash";
import { filter } from "underscore";
// import { debugger } from 'fusioncharts';
import * as CryptoJS from "crypto-js";
import { InteropObservable, Observable } from "rxjs";
declare var gtag;

@Component({
  selector: "app-coursedetails",
  templateUrl: "./coursedetails.component.html",
  styleUrls: ["./coursedetails.component.scss"],
  animations: [
    trigger("EnterLeave", [
      state("flyIn", style({ transform: "translateX(0)" })),
      transition(":enter", [
        style({ transform: "translateX(-100%)" }),
        animate("0.5s 300ms ease-in"),
      ]),
      transition(":leave", [
        animate("0.3s ease-out", style({ transform: "translateX(100%)" })),
      ]),
    ]),
  ],
})
export class CoursedetailsComponent implements OnInit {
  htmlContent = "";
  showSkeleton: boolean = false;
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "20rem",
    minHeight: "5rem",
    placeholder:
      "Please ask your question with concise and add any other details here",
    translate: "yes",
    defaultParagraphSeparator: "",
    defaultFontName: "Arial",
    toolbarHiddenButtons: [
      [
        "undo",
        "redo",
        "strikeThrough",
        "subscript",
        "superscript",
        "heading",
        "fontName",
      ],
      [
        "fontSize",
        "textColor",
        "backgroundColor",
        "customClasses",
        "unlink",
        "insertVideo",
        // 'insertHorizontalRule',
        "removeFormat",
        "toggleEditorMode",
      ],
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: "redText",
        class: "redText",
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ],
  };
  blobKey = environment.blobKey;
  course: any = null;
  pagenumber: any;
  selectedName: any;
  open = false;
  userDetail: any;
  showShortDesciption = true;
  // clicked: any = 'media';
  content: any;
  assignmentContent: any;
  modulength: any;
  isCollapsed: any;
  panelOpenState = false;
  showFiller = false;
  courseTime: any;
  url: string;
  urlSafe: SafeResourceUrl;
  userid: any;
  courseid: any;
  contentid: string;
  getuserid: any;
  localStoCourseid: string;
  isLeaner = true;
  scromModuleData: any;
  scromApiData: any;
  persentage: any;
  per: any;
  dataRefresher: any;
  lastpersentage: any;
  topLength: number;
  finalper: any;
  finalper2: number;
  localper: string;
  selectedIndex = 0;
  assignmentVal = false;
  docpath: any = null;
  assFile: File;
  courseStartDate: any;
  courseEndDate: any;
  assignmentStartDate: any;
  assignmentEndDate: any;
  sider = true;
  moduleLenth: number;
  topicLenght = 0;
  // urlpath = [];
  currentPage: number;
  topiccurrentPage: number;
  getTopicLengthofModule: any;
  gettopicLink: any;
  topiccurrentlink = 0;
  moduleInfo: any;
  totTopicLenght = 0;
  playerTopicLen: any;
  isNextEnable = true;
  isprevEnable = true;
  selectedTabIndex: any = 0;
  selectedQATabIndex: any = 0;
  detailData: any;
  batchDetails: any;
  disableThreads: boolean;
  drawersOpen: boolean;
  screenHeight: number;
  screenWidth: number;
  performOverLay = false;
  treeCourse = false;
  filterkey: any = "All";
  questionText: any = "";
  // initials: any;
  selectedModuleData: any;
  titleBar: boolean = false;
  user_token;
  qaFilterKey: any = "-1";
  batchId: any;
  isShowDiv = false;
  pagination = false;
  page = 0;
  noofItems = 0;
  @ViewChild("demo3Tab") demo3Tab: MatTabGroup;
  @ViewChild("rationPopup") rationPopup: TemplateRef<any>;
  @ViewChild("focuser") inputEl: ElementRef;
  @ViewChild('scromPlayer') iframe: ElementRef;
  getModuleandtopicInfo: any;
  moduleSatusCheck: any;
  tabInd: any;
  playerMenuEnable = false;
  viewScrollBar = false;
  fileRef: any[];
  playerStatus: any;
  checkDetails: any;
  allFeedbackQue: any;
  restdata: any;

  nextPrevHolder: number;
  moduleHolder: number;
  topicPageStatus: any;
  socketEmitReciver: any;
  socketConnector: any;
  oldIdx: any;
  isCancelLoad: boolean;
  fileType: any;
  URIData: any = null;
  resourceName: any;
  topicStatusCheck: any;
  currentTopicTitle: any;
  currentModuleTitle: any;
  topicInfo: any;
  bkup_Toc: any;
  filterData: any;
  myQuestionList: any = [];
  allQuestionList: any = [];
  isQALoading: boolean;
  batchEndTime: any;
  dateObj = new Date();
  currentDate = new Date(
    this.dateObj.getFullYear() +
      "-" +
      (this.dateObj.getMonth() + 1) +
      "-" +
      this.dateObj.getDate()
  ).getTime();
  userType: any;
  weekHolder: number;
  weekLength: any;
  weekHolderUI: number;
  fromCalendar: boolean = false;
  eboxUrl: any = "";
  showlab: boolean = false;
  lastLogIndex: number = 0;
  isReadMore: boolean;
  closeTemp = false;
  TopicsOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    autoplay: false,
    margin: 20,
    dots: false,
    navSpeed: 700,
    navText: [
      '<em class="lxp-Rewind_Arrow"></em>',
      '<em class="lxp-Forward_Arrow"></em>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: true,
  };
  secretKey = "(!@#Passcode!@#)";
  bookmarkedCount: any;
  longDesc: string;
  subModuleHolder: number = null;
  submoduleTitle: any;
  subModuleHolderUI: number;
  subModuleData: Observable<any>;
  topicData$: Observable<any>;
  courseType: string;
  bkmrk_week: any;
  bkmrk_topic: any;
  bkmrk_module: number;
  bkmrk_subModuleHolder: any;
  bkup_topicInfo: any;

  // FOR DRM(Restriction for right click)
  @HostListener("document:keydown", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (
      (event.key === "67" && event.ctrlKey && event.shiftKey) ||
      event.key === "123"
    ) {
      event.returnValue = false;
      event.preventDefault();
    }
  }
  // initials: any;
  constructor(
    public translate: TranslateService,
    private router: ActivatedRoute,
    public socketService: SocketioService,
    public Lservice: LearnerServicesService,
    private cdr: ChangeDetectorRef,
    public service: CommonServicesService,
    private gs: GlobalServiceService,
    private dialog: MatDialog,
    public route: Router,
    private formBuilder: FormBuilder,
    public sanitizer: DomSanitizer,
    private toastr: ToastrService
  ) {
    let lang = localStorage.getItem("language");
    this.translate.use(lang ? lang : "en");
    const loginDetails = JSON.parse(localStorage.getItem("UserDetails"));
    if (!loginDetails?.is_password_updated) {
      this.route.navigate(["/Learner/profile"]);
      return;
    }
    this.getuserid = JSON.parse(localStorage.getItem("UserDetails"));
    this.socketConnector = this.socketService
      .Connectsocket({ type: "connect" })
      .subscribe((quote) => {});

    //::: about blank is to remove 404 error message on player start:::
    // this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl("about:blank");
    this.userType = loginDetails.org_type;
    const token = loginDetails.token;

    // const cryptoInfo = CryptoJS.AES.encrypt(JSON.stringify( {token} ), '(!@#graphql%^&facade!@#)').toString();
    this.user_token = CryptoJS.AES.decrypt(
      token,
      "(!@#graphql%^&facade!@#)"
    ).toString(CryptoJS.enc.Utf8);

    const Navdetail: any =
      this.route.getCurrentNavigation() &&
      this.route.getCurrentNavigation().extras &&
      this.route.getCurrentNavigation().extras.state &&
      this.route.getCurrentNavigation().extras.state.detail;
    this.checkDetails = Navdetail;
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    if (this.screenWidth < 800) {
      this.drawersOpen = false;
      this.performOverLay = true;
    } else {
      this.drawersOpen = true;
      this.performOverLay = false;
    }

    if (this.checkDetails === undefined) {
      this.batchId = localStorage.getItem("currentBatchId");
      this.batchEndTime = localStorage.getItem("currentBatchEndDate");
      this.courseType = localStorage.getItem("CourseType");
      this.checkDetails = JSON.parse(localStorage.getItem("resumeData")); //it receives only partial data
    } else {
      if (this.checkDetails.fromCalendar) {
        this.fromCalendar = true;
      }
      this.batchId = this.checkDetails.batch_id;
      this.batchEndTime = this.checkDetails.batchEndTime;
      this.courseType = this.checkDetails?.course_type;

    }

    if (this.gs.checkLogout()) {
      this.detailData = this.checkDetails;
      // this.courseid = detail && detail.id || this.localStoCourseid;
      this.userDetail = this.gs.checkLogout();
      this.localStoCourseid = localStorage.getItem("Courseid");
      this.courseid =
        (this.checkDetails && this.checkDetails.id) || this.localStoCourseid;
      this.lastpersentage = localStorage.getItem("persentage");
      // this.lastpersentage = detail  && detail.persentage || this.localper ;
      gtag("event", "coursePlayerCID", { courseID: this.courseid });
      this.playerModuleAndTopic();

      this.service
        .viewCurseByIDForLearner(
          (this.checkDetails && this.checkDetails.id) || this.localStoCourseid
        )
        .subscribe((viewCourse: any) => {
          if (
            viewCourse.data.view_course_for_learner &&
            viewCourse.data.view_course_for_learner.success
          ) {
            this.course = viewCourse.data.view_course_for_learner.message;
            if (this.detailData !== undefined) {
              this.selectedName = this.detailData?.course_name;
            } else if (this.course !== undefined && this.course !== null) {
              this.selectedName = this.course?.course_name;
            }
            this.Lservice.getSingleBatchInfo(
              this.userDetail.user_id,
              this.courseid
            ).subscribe((resdata: any) => {
              if (resdata?.data?.getbatchdetails?.message?.batchid !== null) {
                this.batchDetails = resdata?.data?.getbatchdetails?.message;
              } else {
                this.batchDetails = null;
              }
            });
          }
        });

      // TOC handling
      if (this.checkDetails?.toc != "0") {
        if (this.screenWidth < 800) {
          this.drawersOpen = false;
        } else {
          this.drawersOpen = true;
        }
      } else {
        this.drawersOpen = false;
      }

      //play initial/resume topic
      if (
        this.checkDetails?.lastLogIndex &&
        this.checkDetails?.lastLogIndex != "undefined"
      ) {
        this.lastLogIndex = parseInt(this.checkDetails.lastLogIndex) + 1;
      }else{
        this.lastLogIndex = 1;
      }
    
    }

    this.Lservice.getModuleData(
      (this.checkDetails && this.checkDetails.id) || this.localStoCourseid,
      this.userDetail.user_id
    ).subscribe((data: any) => {
      if (data.data.getmoduleData.success) {
        this.content = data.data.getmoduleData.data[0];
        this.assignmentVal = false;
        let noresource = false;
        //this.getModuleandtopicInfo = this.content.coursedetails[0];
        this.content.coursedetails.forEach((element) => {
          let resourceFile = false;
          element.moduledetails.forEach((value) => {
            element.moduledetails.showPreview = false;
            if (
              value.resourse &&
              value.resourse.files &&
              value.resourse.files.length
            ) {
              this.fileRef = value.resourse.files.filter(
                (type) => type.fileType === "Reference"
              );
              if (this.fileRef && this.fileRef.length) {
                resourceFile = true;
                noresource = true;
              }
            }
          });
          element.resValue = resourceFile;
        });
        // this.nextPrevHolder = this.topiccurrentPage = this.content.topicIndex == null ? 0 : this.content.topicIndex;
        // this.moduleHolder = this.currentPage = this.content.moduleIndex == null ? 0 : this.content.moduleIndex;

        this.content.noresource = noresource;

        this.modulength = this.content.coursedetails.length;
        this.courseTime = this.content.coursetime;
      }
    });
    // this.getAssignmentmoduleData();
  }

  ngOnInit(): void {
    this.translate.use(localStorage.getItem("language"));

    // if (!resumeInit) {
    this.socketService.socketReceiver();

    this.socketEmitReciver = this.socketService.change.subscribe(
      (result: any) => {
        
        if(result.data.course_id===this.courseid)
        {
          if (result.data.resume) {
          if (result && this.weekHolder) {
          } else {
            // replace resume data from socket for TOC
            this.scromModuleData = [...result.data.message];
            // get current resume topic (from expanded socket data)
            var resultData;
            var getResumeTopic = function (data) {
              for (let i = 0; i < data.length; i++) {
                const e = data[i];
                if (e.childData) {
                  if (
                    _.find(e.childData, {
                      expanded: true,
                    })
                  ) {
                    getResumeTopic(e.childData);
                  }
                } else {
                  if (e.link && e.expanded == true) {
                    resultData = e;
                  }
                }
              }
              return resultData;
            };
            if(!this.topicInfo)
            {this.topicInfo = this.bkup_topicInfo =  getResumeTopic(this.scromModuleData);}
            this.currentTopicTitle = this.topicInfo.topic_name;
            this.bookmarkedCount = result.data.bookmarkCount;
            console.log(this.topicInfo,'resume')
            // to get week index
            this.scromModuleData.forEach((element,index )=> {
              if(element.expanded)
              {this.weekHolderUI = index}
            });
          }
        } else {
          this.bookmarkedCount = result.data.bookmarkCount;
          if (this.checkDetails.checklevel) {
            console.log(this.scromModuleData);
            if (
              this.scromModuleData[this.weekHolder]?.childData[this.moduleHolder]?.childData[this.subModuleHolder]?.id == result.data.message[0].parent
            ) {
              this.scromModuleData[this.weekHolder].childData[
                this.moduleHolder
              ].status = result.data.moduleStatus;
              this.scromModuleData[this.weekHolder].childData[
                this.moduleHolder
              ].childData[this.subModuleHolder].status = result.data.status;
              this.scromModuleData[this.weekHolder].childData[
                this.moduleHolder
              ].childData[this.subModuleHolder].childData = result.data.message;
              // this.topicInfo = result.data.message;
              this.moduleExpand(
                this.weekHolder,
                Number(this.subModuleHolderUI),
                this.scromApiData.checkLevel ? this.moduleHolder : null
              );
            }
          } else {
            if (
              this.scromModuleData[this.weekHolder]?.childData[
                this.moduleHolder
              ]?.id == result.data.message[0].parent
            ) {
              this.scromModuleData[this.weekHolder].childData[
                this.moduleHolder
              ].status = result.data.status;
              this.scromModuleData[this.weekHolder].childData[
                this.moduleHolder
              ].childData = result.data.message;
              // this.topicInfo = result.data.message;
              this.moduleExpand(
                this.weekHolder,
                this.moduleHolder,
                this.scromApiData.checkLevel ? this.subModuleHolder : null
              );
            }
          }
        }

        console.log(this.scromModuleData);

        if (result && !Number.isNaN(this.weekHolder)) {
          // this.scromModuleData = result.message;

          if (result.data.course_id === this.courseid) {
            // if(this.userType=="Corporate"){
            //Lab URL and btn display
            if (result?.data?.url !== "" && result.data.labActivity == true) {
              this.eboxUrl = result.data.url;
              this.showlab = result.data.labActivity;
            } else {
              this.showlab = result.data.labActivity;
            }

            // }
            // this.scromModuleData = result.data.childData;
            // this.moduleExpand(this.weekHolder, this.moduleHolder, this.scromApiData.checkLevel ? this.subModuleHolder : null);
          }

          //expanding

          //replace data
          // this.weekHolderUI
          // this.subModuleHolderUI
          // this.nextPrevHolder
          // this.moduleHolder
        } else {
          //INDEX ON COURSE START
          this.nextPrevHolder = this.topiccurrentPage = 0;
          this.moduleHolder = this.currentPage = 0;
          this.isprevEnable = true;
          this.isNextEnable = false;
        }
      }
      }
    );
    // }
    // this.getCoursePlayerStatus();
    // this.getEboxURL();
  }

  // ngAfterViewInit() {
  //   const nativeEl =  this.iframe.nativeElement;
  //   if ( (nativeEl.contentDocument || nativeEl.contentWindow.document).readyState === 'complete' ){
  //     this.iframe.nativeElement.contentWindow.location.replace("about:blank ")
  //   } else {
  //     if (nativeEl.addEventListener) {

  //           } else if (nativeEl.attachEvent) {
  //     }
  //   }
  // }
  //Trigger socket for TOC
  // triggerSocket(){
  //     //call socket playerToC
  //     let param:any = {}
  //     param.parent=null
  //     param.contentID = this.courseid
  //     let id = CryptoJS.AES.decrypt(this.getuserid.user_id, this.secretKey.trim()).toString(CryptoJS.enc.Utf8)
  //     param.user_id = id
  //     param.batchid = this.batchId

  //     this.service.getBookmarkFilter(param).subscribe((dat)=>{
  //       console.log(dat)
  //     })
  // }
  // get Scrom module and topic
  playerModuleAndTopic() {
    let param: any = {};
    param.parent = null;
    param.contentID = this.courseid;
    let id = CryptoJS.AES.decrypt(
      this.getuserid.user_id,
      this.secretKey.trim()
    ).toString(CryptoJS.enc.Utf8);
    param.user_id = id;
    param.batchid = this.batchId;

    this.service.getTOC(param).subscribe((data: any) => {
      this.scromApiData = data;
      this.checkDetails.checklevel = this.scromApiData.checkLevel;
      this.scromModuleData = this.scromApiData?.message;
      this.weekLength = this.scromApiData.message.length;

      // if (!this.checkDetails?.fromSuggestion) {
      // this.nextPrevHolder = this.topiccurrentPage =0
      // this.moduleHolder = this.currentPage = 0
      // this.weekHolder = this.weekHolderUI = 0;
      // } else {
      //   this.nextPrevHolder = this.topiccurrentPage = Number(
      //     this.checkDetails.topicIndex
      //   );
      //   this.moduleHolder = this.currentPage = Number(
      //     this.checkDetails.moduleIndex
      //   );
      //   this.weekHolder = this.weekHolderUI = this.checkDetails.week - 1;
      // }

      this.getuserid = JSON.parse(localStorage.getItem("UserDetails"));
      //single
      //start course
      if (
        this.checkDetails.course_status == "start" ||this.checkDetails.course_status == "completed"||
        this.checkDetails.course_status == null || this.checkDetails.link == ""||
        this.userType === "vocational"
      ) {
        let bodyData;
        if (this.scromApiData.checkLevel) {
          bodyData = this.scromModuleData[0].childData[0].childData[0];
        } else {
          bodyData = this.scromModuleData[0].childData[0];
        }
        this.gettopicOnModule(0, "start", bodyData.id, bodyData);
        this.moduleExpand(0, 0, 0);
        this.weekHolder = this.weekHolderUI = 0;
        this.nextPrevHolder = this.topiccurrentPage = 0;
        this.moduleHolder = this.currentPage = 0;
        this.subModuleHolder = 0;
      }

      // if (!this.scromApiData.checkLevel) {
      //   this.checkLastFirstIndexReached();
      // }

      if(this.checkDetails.course_status !== "completed"&& this.checkDetails.link !== ""){
        this.playURLConstructor(
          this.checkDetails.link,
          this.checkDetails.lastModule,
          this.checkDetails.lastTopic,
          this.checkDetails.module_id,
          this.checkDetails.topic_id,
          "entry"
        );
      }

      setTimeout(() => {
        this.checkDetails.course_status = this.checkDetails.course_status == null||this.checkDetails.course_status=="completed"
            ? "start"
            : this.checkDetails.course_status;
        if (
          this.checkDetails.course_status !== "start" &&
          this.userType !== "vocational"
        ) {
          this.inputEl
            ? this.inputEl.nativeElement.scrollIntoView({ behavior: "smooth" })
            : "";
        }
      }, 4000);
    });
  }

  gettopicOnModule(week, modul, parent, body) {
    // this.topicData$ = this.gettopicapi(week,module,parent);
    if (this.filterkey == "Bookmarked") {
      return false;
    }
    let param: any = {};
    param.parent = parent;
    param.contentID = this.courseid;
    let id = CryptoJS.AES.decrypt(
      this.getuserid.user_id,
      this.secretKey.trim()
    ).toString(CryptoJS.enc.Utf8);
    param.user_id = id;
    param.batchid = this.batchId;
    if (!body.expanded) {
      this.service.getTOC(param).subscribe((data: any) => {
        let moduletopicApiData = data.message;
        body.childData = [...moduletopicApiData];
        if (modul === "start") {
          this.topicInfo = moduletopicApiData[0];
          if(this.checkDetails.course_status == "completed"||this.checkDetails.link == ""){
            this.playURLConstructor(
              this.topicInfo.link,
              body.module_name,
              this.topicInfo.topic_name,
              this.topicInfo.parent,
              this.topicInfo.id,
              "entry"
            );
          }
        }
      });
    }
  }

  playURLConstructor(
    url,
    moduleName,
    topicName,
    moduleId,
    topicId,
    actiondat?
  ) {
    console.log(moduleName, topicName);
    this.currentModuleTitle = moduleName
    const encodedModuleName = encodeURIComponent(moduleName);
    const encodedTopicName = encodeURIComponent(topicName);
    let id = CryptoJS.AES.decrypt(
      this.getuserid.user_id,
      this.secretKey.trim()
    ).toString(CryptoJS.enc.Utf8);
    //  this.sanitizer.bypassSecurityTrustResourceUrl(
    this.urlSafe =  environment.scormUrl +
        "/scormPlayer.html?content_id=" +
        this.courseid +
        "&user_id=" +
        id +
        "&batchid=" +
        this.batchId +
        "&id=" +
        topicId +
        "&parent=" +
        moduleId +
        "&path=" +
        url +
        "&module=" +
        encodedModuleName +
        "&topic=" +
        encodedTopicName +
        "&action=" +
        (actiondat == "entry" ? "resume" : "Click") +
        // '&week=' + (this.weekHolder+1) +
        "&lastLogIndex=" +
        this.lastLogIndex +
        "&courseType=" +
        this.courseType
    // );
    if(actiondat == "entry")
    {setTimeout(() => {
      this.iframe.nativeElement.contentWindow.location.replace(this.urlSafe)
    }, 1000);
      }
    else{
      this.iframe.nativeElement.contentWindow.location.replace(this.urlSafe)
    }
  }

  playTopic(
    url,
    topicName,
    topicStatus,
    moduleName,
    moduleStatus,
    topicDetail,
    weekIndex,
    topindex,
    smi,
    moduleIdx?
  ) {
    
    if(this.filterkey == "Bookmarked"){
      this.bkmrk_week = weekIndex;
      this.bkmrk_topic = topindex;
      this.bkmrk_module = Number(smi);
      if (moduleIdx >= 0) {
        this.bkmrk_subModuleHolder = moduleIdx;
        this.submoduleTitle = moduleName;
      }
    }else
    {
      this.weekHolder = weekIndex;
    this.weekHolderUI = weekIndex;
    this.currentTopicTitle = topicName;
    this.currentModuleTitle = moduleName;
    this.topicPageStatus = topicStatus;
    this.moduleSatusCheck = moduleStatus ? moduleStatus : "process";
    if (moduleIdx >= 0) {
      this.subModuleHolder = moduleIdx;
      this.subModuleHolderUI = moduleIdx;
      this.submoduleTitle = moduleName;
    }

    this.nextPrevHolder = topindex;
    this.topiccurrentPage = this.nextPrevHolder;
    this.moduleHolder = Number(smi);
    this.currentPage = Number(smi);

    localStorage.setItem('resumeData', JSON.stringify({'link':url,'lastModule':this.currentModuleTitle,'lastTopic':this.currentTopicTitle,'module_id':topicDetail.parent,'topic_id':topicDetail.id,'checklevel':this.scromApiData.checkLevel,'course_status': this.checkDetails.course_status,}));
  }
    // this.isprevEnable = true;
    // this.isNextEnable = true;
    this.topicInfo = topicDetail;
    console.log(this.topicInfo,'PLaytopic click')
    this.playURLConstructor(
      url,
      moduleName,
      topicName,
      this.topicInfo.parent,
      this.topicInfo.id
    );
    console.log(this.urlSafe, "click link");
  }

  onResize(event) {
    this.screenWidth = window.innerWidth;
  }

  toggleDisplayDiv() {
    this.isShowDiv = !this.isShowDiv;
  }
  checkLastFirstIndexReached() {
    //check 1stweek 1stmodule 1stopic
    if (
      this.weekHolder == 0 &&
      this.moduleHolder == 0 &&
      this.nextPrevHolder == 0
    ) {
      this.isprevEnable = true;
    } else {
      this.isprevEnable = false;
    }
    // let lastweekIndex = this.scromModuleData.length - 1;
    // let lastweekmoduleIndex =
    //   this.scromModuleData[lastweekIndex].childData.length - 1;
    // let lastweekmoduletopicIndex =
    //   this.scromModuleData[lastweekIndex].childData[lastweekmoduleIndex]
    //     .childData.length - 1;
    //check last week,module,topic
    // if (
    //   this.weekHolder == lastweekIndex &&
    //   this.moduleHolder == lastweekmoduleIndex &&
    //   this.nextPrevHolder == lastweekmoduletopicIndex
    // ) {
    //   this.isNextEnable = true;
    // } else {
    //   this.isNextEnable = false;
    // }
  }

  showText() {
    this.isReadMore = !this.isReadMore;
  }
  cloneTemplate(topicName, moduleName) {
    this.content.coursedetails.forEach((course) => {
      course.moduledetails.forEach((module) => {
        if (module.topicname == topicName && course.modulename == moduleName) {
          module.showPreview = true;
        } else {
          module.showPreview = false;
        }
      });
    });
  }
  closeTemplate() {
    this.content.coursedetails.forEach((course) => {
      course.moduledetails.forEach((module) => {
        if (module.showPreview) {
          module.showPreview = false;
        }
      });
    });
  }

  filterToc() {
    //get bookmark count
    let BK_param = {
      batchid: this.batchId,

      user_id: this.getuserid.user_id,
      course_id: this.courseid,
    };
    this.Lservice.getBookmarkFilter(BK_param).subscribe((dat: any) => {
      if (dat.success) {
        this.filterData = dat.message;
      } else {
        this.filterData = [];
      }
    });
  }

  // topicNext() {
  //   // console.log(this.scromModuleData)
  //   this.isNextEnable = true;
  //   this.isprevEnable = true;
  //   this.moduleInfo =
  //     this.scromModuleData[this.weekHolder].childData[this.currentPage];
  //   //WEEK NAVIGATION
  //   if (this.weekHolder < this.weekLength) {
  //     this.moduleLenth = this.scromModuleData[this.weekHolder].childData.length;
  //     // this.getTopicLengthofModule = this.scromModuleData[this.weekHolder].childData[this.currentPage]?.topic_len;

  //     if (this.currentPage < this.moduleLenth) {
  //       this.getTopicLengthofModule =
  //         this.scromModuleData[this.weekHolder].childData[
  //           this.currentPage
  //         ]?.topic_len;
  //       // topic to module change on previous
  //       if (this.topiccurrentPage === this.getTopicLengthofModule - 1) {
  //         if (
  //           this.currentPage === this.moduleLenth - 1 &&
  //           this.topiccurrentPage === this.getTopicLengthofModule - 1
  //         ) {
  //           this.weekHolder = this.weekHolderUI = Number(this.weekHolder) + 1;
  //           this.currentPage = 0;
  //           this.moduleHolder = this.currentPage;
  //         } else {
  //           this.currentPage = Number(this.currentPage) + 1;
  //           this.moduleHolder = this.currentPage;
  //         }
  //         this.topiccurrentPage = 0;
  //         this.nextPrevHolder = 0;
  //         this.getTopicLengthofModule =
  //           this.scromModuleData[this.weekHolder].childData[
  //             this.currentPage
  //           ]?.topic_len;
  //       } else {
  //         this.topiccurrentPage = Number(this.topiccurrentPage) + 1;
  //         this.nextPrevHolder = this.topiccurrentPage;
  //       }
  //       // topic
  //       if (this.topiccurrentPage <= this.getTopicLengthofModule) {
  //         this.moduleInfo =
  //           this.scromModuleData[this.weekHolder].childData[this.currentPage];
  //         this.gettopicLink =
  //           this.scromModuleData[this.weekHolder].childData[
  //             this.currentPage
  //           ].childData[this.topiccurrentPage];
  //         this.moduleSatusCheck = this.moduleInfo.status
  //           ? this.moduleInfo.status
  //           : "process";
  //         this.currentTopicTitle = this.gettopicLink.title;
  //         this.currentModuleTitle = this.moduleInfo.title;
  //         this.topicPageStatus = this.gettopicLink.status;
  //         this.playURLConstructor(
  //           this.gettopicLink.link,
  //           this.currentModuleTitle,
  //           this.currentTopicTitle,
  //           this.topicInfo.parent_id,
  //           this.topicInfo.id
  //         );
  //       }
  //     }
  //   }
  //   // this.gettopicLink = this.scromModuleData[this.currentPage - 1]?.childData[this.topiccurrentPage];
  //   // const childData = this.scromModuleData[this.moduleLenth - 1]?.childData;
  //   // const childlength = this.scromModuleData[this.moduleLenth - 1]?.childData.length;
  //   // if (this.gettopicLink.id === childData[childlength - 1].id) {
  //   //   this.ratingPopup();
  //   // }
  // }

  // topicPrve() {
  //   this.isNextEnable = true;
  //   this.isprevEnable = true;
  //   this.moduleInfo =
  //     this.scromModuleData[this.weekHolder].childData[this.currentPage];
  //   this.moduleLenth = this.scromModuleData[this.weekHolder].childData.length;
  //   if (this.currentPage < this.moduleLenth) {
  //     this.getTopicLengthofModule =
  //       this.scromModuleData[this.weekHolder].childData[
  //         this.currentPage
  //       ]?.topic_len;
  //     // topic to module change on previous

  //     if (this.currentPage - 1 >= 0 && this.topiccurrentPage === 0) {
  //       this.currentPage = this.currentPage - 1;
  //       this.moduleHolder = this.currentPage;
  //       this.topiccurrentPage =
  //         this.scromModuleData[this.weekHolder].childData[this.currentPage]
  //           .childData.length - 1;
  //       this.nextPrevHolder = this.topiccurrentPage;
  //       this.getTopicLengthofModule =
  //         this.scromModuleData[this.weekHolder].childData[
  //           this.currentPage
  //         ]?.topic_len;
  //     } else {
  //       if (this.currentPage == 0 && this.topiccurrentPage == 0) {
  //         this.weekHolder = this.weekHolderUI = this.weekHolder - 1;
  //         this.moduleHolder =
  //           this.scromModuleData[this.weekHolder].childData.length - 1;
  //         this.currentPage = Number(this.moduleHolder);
  //         this.topiccurrentPage =
  //           this.scromModuleData[this.weekHolder].childData[this.currentPage]
  //             .childData.length - 1;
  //         this.nextPrevHolder = this.topiccurrentPage;
  //       } else {
  //         this.topiccurrentPage = this.topiccurrentPage - 1;
  //         this.nextPrevHolder = this.topiccurrentPage;
  //       }
  //     }
  //     if (this.topiccurrentPage >= 0) {
  //       this.moduleInfo =
  //         this.scromModuleData[this.weekHolder].childData[this.currentPage];
  //       this.gettopicLink =
  //         this.scromModuleData[this.weekHolder].childData[
  //           this.currentPage
  //         ].childData[this.topiccurrentPage];
  //       this.moduleSatusCheck = this.moduleInfo.status
  //         ? this.moduleInfo.status
  //         : "process";
  //       this.currentTopicTitle = this.gettopicLink.title;
  //       this.currentModuleTitle = this.moduleInfo.title;
  //       this.topicPageStatus = this.gettopicLink.status;
  //       this.playURLConstructor(
  //         this.gettopicLink.link,
  //         this.currentModuleTitle,
  //         this.currentTopicTitle,
  //         this.topicInfo.parent_id,
  //         this.topicInfo.id
  //       );
  //     }
  //   }
  // }

  makeFullScreen() {
    const element = document.querySelector("#myPlayer");
    element
      .requestFullscreen()
      .then(() => {})
      .catch((error) => {});
  }

  scroll(el: HTMLElement) {
    el.scrollTop = 0;
    el.scrollIntoView({ behavior: "smooth" });
  }
  downloadResource() {
    const a = document.createElement("a");
    a.target = "_blank";
    a.href = this.scromApiData.resourceUrl;
    a.download = this.scromApiData.resourceUrl.split("/").pop();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  urlBinder(file) {
    this.disableRightClick();
    this.resourceName = file.type_name;
    this.fileType = file.doc_type;
    if (file.doc_type.includes("image")) {
      this.fileType = "image";
    }
    if (file.doc_type.includes("video")) {
      this.fileType = "video";
    }
    if (
      file.doc_type.includes("pdf") ||
      file.doc_type.includes("vnd.openxmlformats") ||
      file.doc_type.includes("vnd.ms-excel") ||
      file.doc_type.includes("msword")
    ) {
      this.fileType = "pdf";
    }
    if (file.doc_type.includes("audio")) {
      this.fileType = "audio";
    }
    if (file.doc_type.includes("link")) {
      this.fileType = "link";
      this.URIData = this.sanitizer.bypassSecurityTrustResourceUrl(
        file.path + this.blobKey
      );
    }

    if (this.fileType === "pdf") {
      // file.gdocs = '';
      // file.gdocs = 'https://docs.google.com/gview?url=' + file.path + this.blobKey + '&embedded=true';
      // this.URIData = file;
      var url = file.path + this.blobKey;
      this.URIData = url;
    } else {
      this.URIData = this.sanitizer.bypassSecurityTrustResourceUrl(
        file.path + this.blobKey
      );
    }
  }

  closedialogbox() {
    // this.tabInd = 0;
    this.selectedTabIndex = 0;
    this.dialog.closeAll();
  }

  moduleExpand(Windex, mindex, smindex, spotval?) {
    console.log(spotval);

    if (spotval) {
      spotval.expanded = spotval.expanded ? false : true;
    } else {
      if (this.scromApiData.checkLevel) {
        this.scromModuleData[Windex].expanded = true;
        this.scromModuleData[Windex].childData[smindex].expanded = true;
        this.scromModuleData[Windex].childData[smindex].childData[
          mindex
        ].expanded = true;
      } else {
        this.scromModuleData[Windex].childData[mindex].expanded = true;
      }
    }
  }

  openResourse(templateRef) {
    this.dialog.open(templateRef, {
      panelClass: "resourseContainer",
      width: "75%",
      height: "75%",
      closeOnNavigation: true,
      disableClose: true,
    });
    const backdrop = document.getElementsByClassName("cdk-overlay-backdrop")[0];
    const containerarea = document.getElementsByClassName(
      "mat-dialog-container"
    )[0];
    rclickctrl(backdrop);
    rclickctrl(containerarea);
    function rclickctrl(element) {
      element.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        return false;
      });
    }
  }

  aboutCourse(templateRef) {
    this.dialog.open(templateRef, {
      panelClass: "aboutCourseWrapper",
      width: "99%",
      height: "90%",
      closeOnNavigation: true,
      disableClose: true,
    });
    const backdrop = document.getElementsByClassName("cdk-overlay-backdrop")[0];
    const containerarea = document.getElementsByClassName(
      "mat-dialog-container"
    )[0];
    setTimeout(() => {
      this.longDesc = document.getElementById("courseDesc").innerHTML;
      if (this.longDesc.length > 250) {
        this.isReadMore = false;
      } else {
        this.isReadMore = true;
      }
      console.log(this.longDesc.length, "desc");
    }, 500);
    rclickctrl(backdrop);
    rclickctrl(containerarea);
    function rclickctrl(element) {
      element.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        return false;
      });
    }
  }

  resourseAccord(courseResource, index) {
    if (courseResource) {
      courseResource.forEach((element, i) => {
        if (index === i) {
          if (element.isOpen) {
            element.isOpen = false;
          } else {
            element.isOpen = true;
          }
        } else {
          element.isOpen = false;
        }
      });
    }
  }

  understoodClick(ux) {
    // let current_Status = this.scromModuleData[this.weekHolder].childData[this.moduleHolder].childData[this.subModuleHolder].status
    this.topicInfo.user_experience = ux;
    this.Lservice.userexperience(
      this.getuserid.user_id,
      this.courseid,
      this.batchId,
      this.topicInfo.parent,
      ux,
      this.topicInfo?.id?.toString(),
      this.topicInfo?.status?this.topicInfo?.status:'process',
      "",
      this.topicInfo.topic_name
    ).subscribe((data: any) => {
      if (data?.data?.userexperience?.success) {
        this.topicInfo.user_experience = ux;
      } else {
        this.toastr.warning(data?.data?.userexperience?.message);
      }
    });
  }
  bookmarkClick(isbokmarked) {
    console.log(this.topicInfo);
    this.topicInfo.bookmark = isbokmarked;
    this.Lservice.bookmark(
      this.getuserid.user_id,
      this.courseid,
      this.batchId,
      this.topicInfo.parent,
      isbokmarked,
      this.lastLogIndex?.toString(),
      this.topicInfo?.id?.toString(),
      // this.checkDetails.checkLevel
      //   ? this.submoduleTitle
      //   : this.currentModuleTitle,
      "",
      this.topicInfo.topic_name
    ).subscribe((data: any) => {
      if (data?.data?.bookmark?.success) {
        this.topicInfo.bookmark = isbokmarked;
        // this.filterToc();
      } else {
        // this.toastr.warning(data?.data?.bookmark?.message)
      }
    });
  }
  contextmenu() {
    event.preventDefault();
  }
  submitMyQuestion() {
    if (this.topicInfo || this.currentTopicTitle) {
      if (this.questionText.trim().length) {
        this.Lservice.askaquestion(
          this.getuserid.user_id,
          this.courseid,
          this.topicInfo.parent,
          this.currentTopicTitle,
          this.questionText
        ).subscribe((data: any) => {
          // console.log(data)
          this.questionText = "";
          if (data?.data?.askaquestion?.success) {
            this.selectedQATabIndex = 1;
            this.toastr.success(data?.data?.askaquestion?.message);
          } else {
            // this.toastr.warning(data?.data?.bookmark?.message)
          }
        });
      } else {
        this.toastr.warning("Please enter some text");
      }
    } else {
      this.toastr.warning("Please select a topic");
    }
  }

  questionTabSelection(tab) {
    if (tab.index === 1) {
      this.isQALoading = true;
      this.myQuestionList = [];
      this.allQuestionList = [];
      this.Lservice.getMyQuestion(
        this.getuserid.user_id,
        this.courseid,
        this.topicInfo.parent,
        this.currentTopicTitle
      ).subscribe((data: any) => {
        this.isQALoading = false;
        if (data?.data.getmyque.success) {
          this.myQuestionList = data.data.getmyque.message;
        } else {
          this.myQuestionList = [];
        }
      });
    } else if (tab.index === 2) {
      this.isQALoading = true;
      this.allQuestionList = [];
      this.myQuestionList = [];
      this.Lservice.getallquestion(
        this.getuserid.user_id,
        this.courseid,
        this.topicInfo.parent,
        this.currentTopicTitle,
        -1,
        this.batchId
      ).subscribe((data: any) => {
        this.isQALoading = false;
        if (data?.data.getallquestion?.success) {
          this.allQuestionList = data.data.getallquestion?.message;
        } else {
          this.allQuestionList = [];
        }
      });
    } else {
      this.myQuestionList = [];
      this.allQuestionList = [];
    }
  }

  tabClick(tab) {
    if (tab.index == 1) {
      this.filterkey = "Bookmarked";
      this.bkmrk_week = undefined;
      this.bkmrk_topic = undefined;
      this.bkmrk_module = null
        this.bkmrk_subModuleHolder = undefined;
      this.filterToc();
    } else {
      this.filterkey = "All";
      // on all toc list
      let moduleName
      if(this.weekHolder){
       if(this.scromApiData.checkLevel)
      {
        this.topicInfo = this.scromModuleData[this.weekHolder].childData[this.moduleHolder].childData[this.subModuleHolder].childData[this.nextPrevHolder];
         moduleName = this.scromModuleData[this.weekHolder].childData[this.moduleHolder].childData[this.subModuleHolder].module_name
      }
      else{
        this.topicInfo = this.scromModuleData[this.weekHolder].childData[this.moduleHolder].childData[this.nextPrevHolder];
          moduleName = this.scromModuleData[this.weekHolder].childData[this.moduleHolder].module_name;
      }
    }else{
      this.topicInfo = this.bkup_topicInfo
    }
      console.log(this.topicInfo,'tabchange')
      this.playURLConstructor(
        this.topicInfo.link,
        moduleName,
        this.topicInfo.topic_name,
        this.topicInfo.parent,
        this.topicInfo.id
      );
    }
  }

  filterQAList() {
    this.isQALoading = true;
    this.Lservice.getallquestion(
      this.getuserid.user_id,
      this.courseid,
      this.topicInfo.parent,
      this.currentTopicTitle,
      parseInt(this.qaFilterKey),
      this.batchId
    ).subscribe((data: any) => {
      this.isQALoading = false;
      if (data?.data.getallquestion?.success) {
        this.allQuestionList = data.data.getallquestion?.message;
      }
    });
  }
  closeAskQuestion() {
    this.dialog.closeAll();
    this.myQuestionList = [];
    this.allQuestionList = [];
    this.selectedQATabIndex = 0;
  }
  openAskQuestions(templateRef: TemplateRef<any>) {
    this.questionText = "";
    this.allQuestionList = [];
    if (this.screenWidth > 560) {
      this.dialog.open(templateRef, {
        // scrollStrategy: new NoopScrollStrategy(),
        width: "60%",
        height: "80%",
        scrollStrategy: new NoopScrollStrategy(),
        closeOnNavigation: true,
        disableClose: true,
      });
    } else {
      this.dialog.open(templateRef, {
        // scrollStrategy: new NoopScrollStrategy(),
        width: "98%",
        height: "80%",
        scrollStrategy: new NoopScrollStrategy(),
        closeOnNavigation: true,
        disableClose: true,
      });
    }
  }
  disableRightClick() {
    const dialoqContainer = document.getElementsByClassName(
      "cdk-overlay-container"
    );
    dialoqContainer[0].addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  }

  // -------------------- rating function ------------------
  getFeedbackQue() {
    this.Lservice.getFeedbackQuestion().subscribe((data: any) => {
      if (data.data.getFeedbackQuestion.success === true) {
        this.allFeedbackQue = data.data.getFeedbackQuestion.data;
      }
    });
  }

  ratingPopup() {
    this.dialog.open(this.rationPopup, {
      width: "100%",
      height: "100%",
      closeOnNavigation: true,
      disableClose: true,
    });
  }

  add_topic_reference(res) {
    if (this.batchDetails?.batchid) {
      const userid = this.userDetail.user_id;
      const batchid = this.batchDetails?.batchid;
      const courseid = this.courseid;
      const moduleid = res.modulename;
      const topicid = res.moduledetails[0].topicname;
      const referenceid = res.moduledetails[0].resourse.files[0]._id;
      const referencestatus = true;
      const createdby = this.course.created_by;
      this.Lservice.add_topic_reference(
        userid,
        batchid,
        courseid,
        moduleid,
        topicid,
        referenceid,
        referencestatus,
        createdby
      ).subscribe((result: any) => {});
    }
  }
  //------------------------------------------------------------------//
  // getEboxURL(){
  //   var labactivitydetails ={
  //     username:this.userDetail.username,
  //     course_id:this.courseid
  //   }
  //   this.Lservice.labactivity(labactivitydetails).subscribe((result:any)=>{
  //     if(result.data.labactivity.success == false){
  //       this.eboxUrl = "";
  //       this.showlab = false;
  //     }
  //     else if(result.data.labactivity.success == null){
  //       if(result.data.labactivity.Status == 0){
  //         this.eboxUrl = result.data.labactivity.url;
  //         this.showlab = true;
  //       }
  //       else{
  //         this.eboxUrl = "";
  //         this.showlab = false;
  //       }
  //     }
  //   });
  // }
  navigatePractice() {
    window.open(this.eboxUrl, "Practice");
  }

  openQuestionDialog(templateRef) {
    this.dialog.open(templateRef, {
      panelClass: "QAContainer",
      width: "50%",
      height: "55%",
      closeOnNavigation: true,
      disableClose: true,
    });
    const backdrop = document.getElementsByClassName("cdk-overlay-backdrop")[0];
    const containerarea = document.getElementsByClassName(
      "mat-dialog-container"
    )[0];
    rclickctrl(backdrop);
    rclickctrl(containerarea);
    function rclickctrl(element) {
      element.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        return false;
      });
    }
  }

  dialogClose(value?) {
    this.dialog.closeAll();
    this.htmlContent = "";
  }

  createQuestion() {
    if (this.htmlContent) {
      let regexKey = /[&<>#]/gi;
      if (this.htmlContent.search(regexKey) == -1) {
        this.toastr.warning("Please dont use special characters");
        return false;
      }

      this.Lservice.createEngineersForumData(
        this.userDetail.user_id,
        this.userDetail.full_name,
        this.courseid,
        this.htmlContent,
        this.course?.course_name,
        this.batchId,
        this.userDetail.orgId
      ).subscribe((rdata: any) => {
        if (
          rdata?.errors &&
          rdata?.errors[0]?.message === "Request failed with status code 413"
        ) {
          this.toastr.warning("Content limit exceeded!!");
        } else {
          if (rdata.data.createEngineersForumData.success) {
            // this.selectedIndex = 1
            this.dialogClose("confirm");
            this.toastr.success(rdata.data.createEngineersForumData.message);
          } else {
            this.toastr.warning(rdata.data.createEngineersForumData.message);
          }
        }
        this.showSkeleton = true;
      });
    } else {
      this.toastr.warning("Question cannot be empty");
    }
  }

  ngOnDestroy() {
    const loginDetails = JSON.parse(localStorage.getItem("UserDetails"));
    if (loginDetails) {
      this.socketConnector = this.socketService
        .Connectsocket({ type: "disconnect" })
        .subscribe((quote) => {});
    }
    if (this.socketEmitReciver) {
      this.socketEmitReciver.unsubscribe();
    }

    this.socketService.closeSocket();

    if (this.socketConnector) {
      this.socketConnector.unsubscribe();
    }
  }

  goBack() {
    if (!this.drawersOpen && this.scromApiData?.toc != "0") {
      this.drawersOpen = this.drawersOpen ? false : true;
    } else {
      if (this.fromCalendar) {
        this.route.navigateByUrl("/Learner/calendaractivity");
      } else {
        this.route.navigateByUrl("/Learner/MyCourse");
      }
    }
  }
}
