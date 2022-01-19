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
import { containsElement } from "@angular/animations/browser/src/render/shared";
import { interceptingHandler } from "@angular/common/http/src/module";
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
  selectedIndex1 = 0;
  selectedIndex2 = 0;
  selectedIndex3 = 0;
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
  subModuleData:  Observable<any>;
  topicData$: Observable<any>;

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
  constructor(public translate: TranslateService, private router: ActivatedRoute, public socketService: SocketioService,
    public Lservice: LearnerServicesService, private cdr: ChangeDetectorRef,
    public service: CommonServicesService, private gs: GlobalServiceService, private dialog: MatDialog,
    public route: Router, private formBuilder: FormBuilder,
    public sanitizer: DomSanitizer, private toastr: ToastrService) {
    let lang = localStorage.getItem('language')
    this.translate.use(lang ? lang : 'en')
    const loginDetails = JSON.parse(localStorage.getItem('UserDetails'));
    if (!loginDetails?.is_password_updated) {
      this.route.navigate(["/Learner/profile"]);
      return;
    }
    this.getuserid = JSON.parse(localStorage.getItem("UserDetails"));
    this.socketConnector = this.socketService
      .Connectsocket({ type: "connect" })
      .subscribe((quote) => {});

    //::: about blank is to remove 404 error message on player start:::
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl("about:blank");
    this.userType = loginDetails.org_type;
    const token = loginDetails.token;

    // const cryptoInfo = CryptoJS.AES.encrypt(JSON.stringify( {token} ), '(!@#graphql%^&facade!@#)').toString();
    this.user_token = CryptoJS.AES.decrypt(
      token,
      "(!@#graphql%^&facade!@#)"
    ).toString(CryptoJS.enc.Utf8);

    const Feedbackdetail: any =
      this.route.getCurrentNavigation() &&
      this.route.getCurrentNavigation().extras &&
      this.route.getCurrentNavigation().extras.state &&
      this.route.getCurrentNavigation().extras.state.detail;
    this.checkDetails = Feedbackdetail;
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
    } else {
      if (this.checkDetails.fromCalendar) {
        this.fromCalendar = true;
      }
      this.batchId = this.checkDetails.batch_id;
      this.batchEndTime = this.checkDetails.batchEndTime;
    }

    if (this.gs.checkLogout()) {
      this.detailData = this.checkDetails;
      // this.courseid = detail && detail.id || this.localStoCourseid;
      this.userDetail = this.gs.checkLogout();
      this.localStoCourseid = localStorage.getItem("Courseid");
      this.courseid = (this.checkDetails && this.checkDetails.id) || this.localStoCourseid;
      this.lastpersentage = localStorage.getItem("persentage");
      // this.lastpersentage = detail  && detail.persentage || this.localper ;
      gtag("event", "coursePlayerCID", { courseID: this.courseid });
      this.playerModuleAndTopic();

      this.service
        .viewCurseByIDForLearner((this.checkDetails && this.checkDetails.id) || this.localStoCourseid)
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
    }
    this.Lservice.getModuleData(
      (this.checkDetails && this.checkDetails.id) || this.localStoCourseid,
      this.userDetail.user_id
    ).subscribe((data: any) => {
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
    });
    // this.getAssignmentmoduleData();
  }
  
  ngOnInit(): void {
    this.translate.use(localStorage.getItem("language"));
    // this.add_topic_reference(res);
    // if (this.detailData.course_status === 'completed') {
    //   this.ratingPopup();
    // }
    this.service.menuSelectedPerform.subscribe((emitedData: any) => {
      this.selectedName = emitedData.selectedName;
      this.selectedTabIndex = emitedData.selectedTabIndex;
      this.performOverLay = false;
    });
    let resumeInit = true;
    if (!resumeInit) {
      this.socketService.socketReceiver();
      this.socketEmitReciver = this.socketService.change.subscribe(
        (result: any) => {
          console.log(result.data);
          if (
            result &&
            result.eventId &&
            result.eventId.length &&
            result.data.childData.length > 0
          ) {
            console.log(result.data, "asdfasdjfaklsjdfkl");
            if (result.data.course_id === this.courseid) {
              // if(this.userType=="Corporate"){
              console.log("before if");
              if (result?.data?.url !== "" && result.data.labActivity == true) {
                this.eboxUrl = result.data.url;
                this.showlab = result.data.labActivity;
              } else {
                this.showlab = result.data.labActivity;
              }

              // }

              if (
                this.topiccurrentPage !== result.data.resumeSubContent ||
                result.data.childData[result.data.week - 1].childData[
                  result.data.resumeContent
                ].childData[result.data.resumeSubContent]?.status !==
                  this.topicPageStatus
              ) {
                console.log(result.data, "helllllllllllllo");
                this.scromModuleData = result.data.childData;
                // this.moduleExpand(this.weekHolder, this.moduleHolder, this.scromApiData.checkLevel ? this.subModuleHolder : null);
                if (
                  (this.scromApiData.topicIndex == null ||
                    this.scromApiData.topicIndex == "0") &&
                  (this.scromApiData.moduleIndex == null ||
                    this.scromApiData.moduleIndex == "0") &&
                  this.scromModuleData[0].childData[0].status == null &&
                  this.scromModuleData[0].childData[0].childData[0].status ==
                    null
                ) {
                  this.scromModuleData[0].childData[0].status = "process";
                  this.scromModuleData[0].childData[0].childData[0].status =
                    "process";
                }
                this.currentPage = Number(result.data.resumeContent);
                this.topiccurrentPage = Number(result.data.resumeSubContent);
                this.weekHolder = result.data.week - 1;
                if (this.scromApiData.checkLevel) {
                  this.currentPage = Number(result.data.module);
                  this.subModuleHolder = Number(result.data.resumeContent);
                  this.submoduleTitle =
                    this.scromApiData.childData[this.weekHolder].childData[
                      this.currentPage
                    ].childData[this.subModuleHolder].title;
                  this.moduleExpand(
                    this.weekHolderUI,
                    Number(this.subModuleHolderUI),
                    this.scromApiData.checkLevel ? this.currentPage : null
                  );
                } else {
                  this.moduleExpand(
                    this.weekHolder,
                    this.moduleHolder,
                    this.scromApiData.checkLevel ? this.subModuleHolder : null
                  );
                }
                this.topicPageStatus = this.scromApiData.checkLevel
                  ? result.data.childData[this.weekHolder].childData[
                      this.currentPage
                    ].childData[this.subModuleHolder].childData[
                      this.topiccurrentPage
                    ]?.status
                  : result.data.childData[this.weekHolder].childData[
                      this.currentPage
                    ].childData[this.topiccurrentPage]?.status;
                this.topicPageStatus = this.topicPageStatus
                  ? this.topicPageStatus
                  : "process";
                this.moduleInfo =
                  this.scromModuleData[this.weekHolder].childData[
                    this.currentPage
                  ];
                this.topicInfo = this.scromApiData.checkLevel
                  ? this.scromModuleData[this.weekHolder].childData[
                      this.currentPage
                    ].childData[this.subModuleHolder].childData[
                      this.topiccurrentPage
                    ]
                  : this.scromModuleData[this.weekHolder].childData[
                      this.currentPage
                    ].childData[this.topiccurrentPage];

                // if (resumeInit) {

                //   this.nextPrevHolder = this.topiccurrentPage;
                //   this.moduleHolder = this.currentPage;
                //   this.weekHolderUI = this.weekHolder;
                //   resumeInit = false;
                //   this.isprevEnable = true;
                //   this.isNextEnable = true;
                // }
              }
              // this.moduleExpand(this.weekHolderUI, Number(this.subModuleHolder),this.scromApiData.checkLevel?this.currentPage:null);
              // if ((this.weekHolder !==0 && this.moduleHolder !== 0) || (this.nextPrevHolder !== 0)) {
              //   this.isprevEnable = false;
              // }
              // if ((((this.weekHolder) !== this.scromModuleData.length - 1)||(this.moduleHolder) !== this.scromModuleData[this.weekHolder-1].childData.length - 1)
              //   || ((this.nextPrevHolder) !== this.scromModuleData[this.weekHolder-1].childData[this.scromModuleData[this.weekHolder-1].length - 1].childData.length - 1)) {
              //   this.isNextEnable = false;
              // }

              this.checkLastFirstIndexReached();

              this.scromModuleData.forEach((childData) => {
                if (childData && childData.childData) {
                  childData.childData.forEach((subChild) => {
                    if (
                      subChild &&
                      subChild.childData &&
                      subChild.childData.length > 0
                    ) {
                      this.treeCourse = true;
                    } else {
                      this.treeCourse = false;
                    }
                  });
                }
              });
            }
          } else {
            //INDEX ON COURSE START
            this.nextPrevHolder = this.topiccurrentPage = 0;
            this.moduleHolder = this.currentPage = 0;

            this.isprevEnable = true;
            this.isNextEnable = false;
          }
        }
      );
    }
    // this.getCoursePlayerStatus();
    // this.getEboxURL();
  }

  // get Scrom module and topic
  playerModuleAndTopic() {
    this.Lservice.playerModuleAndTopic(
      this.courseid,
      this.userDetail.user_id
    ).subscribe((data: any) => {
      this.scromApiData = data.data?.playerModuleAndTopic;
      if (
        this.scromApiData?.lastLogIndex &&
        this.scromApiData?.lastLogIndex != "undefined"
      ) {
        this.lastLogIndex = parseInt(this.scromApiData.lastLogIndex) + 1;
      }
      if (this.scromApiData?.toc != "0") {
        if (this.screenWidth < 800) {
          this.drawersOpen = false;
        } else {
          this.drawersOpen = true;
        }
      } else {
        this.drawersOpen = false;
      }
      this.scromModuleData = this.scromApiData?.message;
      this.weekLength = this.scromApiData.message.length;
      // this.moduleLenth = this.scromApiData?.childData.length;
      if (!this.checkDetails?.fromSuggestion) {
        this.nextPrevHolder = this.topiccurrentPage =
          this.scromApiData.topicIndex == null
            ? 0
            : Number(this.scromApiData.topicIndex);
        this.moduleHolder = this.currentPage = this.scromApiData.checkLevel
          ? this.scromApiData.module == null
            ? 0
            : Number(this.scromApiData.module)
          : this.scromApiData.moduleIndex == null
          ? 0
          : Number(this.scromApiData.moduleIndex);
        this.weekHolder = this.weekHolderUI = this.scromApiData.week - 1;
        // if (this.scromApiData.checkLevel) {

        //   this.subModuleHolder = this.scromApiData.moduleIndex == null ? 0 : Number(this.scromApiData.moduleIndex);
        //   this.subModuleHolderUI = this.scromApiData.moduleIndex == null ? 0 : Number(this.scromApiData.moduleIndex);

        //   this.submoduleTitle = this.scromApiData.childData[this.weekHolder].childData[this.currentPage].childData[this.subModuleHolder].title
        // }
      } else {
        this.nextPrevHolder = this.topiccurrentPage = Number(
          this.checkDetails.topicIndex
        );
        this.moduleHolder = this.currentPage = Number(
          this.checkDetails.moduleIndex
        );
        this.weekHolder = this.weekHolderUI = this.checkDetails.week - 1;

        // if (this.scromApiData.checkLevel) {
        //   this.moduleHolder = this.currentPage = Number(this.checkDetails.newmodule);
        //   this.subModuleHolder = this.checkDetails.moduleIndex == null ? 0 : Number(this.checkDetails.moduleIndex);
        //   this.subModuleHolderUI = this.checkDetails.moduleIndex == null ? 0 : Number(this.checkDetails.moduleIndex);

        //  this.submoduleTitle = this.scromApiData.childData[this.weekHolder].childData[this.currentPage].childData[this.subModuleHolder].title
        // }
      }
      // this.scromModuleData[this.moduleHolder].expanded = true;
      // this.oldIdx = this.moduleHolder;
      // this.topicInfo = this.scromApiData.checkLevel ? this.scromApiData.childData[this.weekHolder].childData[this.moduleHolder].childData[this.subModuleHolder].childData[this.nextPrevHolder] : this.scromApiData.childData[this.weekHolder].childData[this.moduleHolder].childData[this.nextPrevHolder]
      // this.topicPageStatus = this.topicInfo.status
      // if (this.scromApiData.checkLevel) {
      //   this.moduleExpand(
      //     this.weekHolder,
      //     this.subModuleHolder,
      //     this.moduleHolder
      //   );
      // } else {
      //   this.moduleExpand(this.weekHolder, this.moduleHolder, null);
      // }

      setTimeout(() => {
        if (this.weekHolder > 0)
          this.inputEl
            ? this.inputEl.nativeElement.scrollIntoView({ behavior: "smooth" })
            : "";
      }, 4000);
      // const moduleTitle = this.scromApiData.checkLevel ? encodeURIComponent(this.scromApiData.childData[this.weekHolder].childData[this.currentPage].childData[this.subModuleHolder].title) : encodeURIComponent(this.scromApiData.childData[this.weekHolder].childData[this.currentPage].title);
      // const topicTitle = encodeURIComponent(this.scromApiData.checkLevel ? this.scromApiData.childData[this.weekHolder].childData[this.currentPage].childData[this.subModuleHolder].childData[this.topiccurrentPage].title : this.scromApiData.childData[this.weekHolder].childData[this.currentPage].childData[this.topiccurrentPage].title);
      this.getuserid = JSON.parse(localStorage.getItem("UserDetails"));
      // this.currentModuleTitle = this.scromApiData.childData[this.weekHolder].childData[this.currentPage].title;
      // this.currentTopicTitle = this.topicInfo.title//this.scromApiData.childData[this.weekHolder].childData[this.currentPage].childData[this.topiccurrentPage].title;

      // if((this.scromApiData.topicIndex == null||this.scromApiData.topicIndex == "0") && (this.scromApiData.moduleIndex == null||this.scromApiData.moduleIndex == "0") && this.scromApiData.childData[0].childData[0].status == null && this.scromApiData.childData[0].childData[0].childData[0].status == null){
      //   this.scromModuleData[0].childData[0].status = 'process'
      //   this.scromModuleData[0].childData[0].childData[0].status = 'process'
      // }
      // let id = CryptoJS.AES.decrypt(this.getuserid.user_id, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
      // if (this.checkDetails?.fromSuggestion) {
      //   this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl
      //     (environment.scormUrl + '/scormPlayer.html?content_id=' +
      //       this.courseid + '&user_id=' + id + '&user_obj_id=' +
      //       this.getuserid._id + '&path=' + this.checkDetails.url +
      //       '&module_status=' + 'process&week=' + (Number(this.checkDetails.week)).toString()
      //       + '&module=' + this.checkDetails.moduleName + '&topic=' + this.checkDetails.topicName + '&ModuleIndex=' + this.moduleHolder + '&submoduleIndex=' + (this.scromApiData.checkLevel ? this.subModuleHolder?.toString() : 'null') + '&topicIndex=' + this.nextPrevHolder + '&lastLogIndex=' + this.lastLogIndex);
      // }
      // else {
      //   this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl
      //     (environment.scormUrl + '/scormPlayer.html?content_id=' +
      //       this.courseid + '&user_id=' + id + '&user_obj_id=' +
      //       this.getuserid._id + '&path=' + this.scromApiData.url +
      //       '&module_status=' + 'process&week=' + (Number(this.weekHolder) + 1).toString()
      //       + '&module=' + moduleTitle + '&topic=' + topicTitle + '&ModuleIndex=' + this.moduleHolder + (this.scromApiData.checkLevel ?'&submoduleIndex=' +  this.subModuleHolder?.toString() : '&submoduleIndex=null') + '&topicIndex=' + this.nextPrevHolder + '&lastLogIndex=' + this.lastLogIndex);
      // }
      // this.playerTopicLen = this.scromApiData.total_topic_len;
      // console.log(this.urlSafe,"playermoduletopicAPI")
      // tree level
      this.scromModuleData.forEach((childData) => {
        if (childData && childData.childData) {
          childData.childData.forEach((subChild) => {
            if (
              subChild &&
              subChild.childData &&
              subChild.childData.length > 0
            ) {
              // Check TOC Weekwise or module topic wise
              this.treeCourse = true;
            } else {
              this.treeCourse = false;
            }
          });
        }
      });
      if (!this.scromApiData.checkLevel) {
        this.checkLastFirstIndexReached();
      }
      // this.filterToc();
    });
  }
  gettopicOnModule(week, modul, parent, body) {
    // this.topicData$ = this.gettopicapi(week,module,parent);
    if (!body.expanded) {
      this.Lservice.playerstatus(
        this.courseid,
        this.userDetail.user_id,
        this.batchId,
        week,
        modul,
        parent
      ).subscribe((data: any) => {
        let moduletopicApiData = data.data.playerstatus.message
        if (moduletopicApiData[0].link == null && this.scromApiData.checkLevel) {

          this.subModuleData = moduletopicApiData
        } else {
          this.topicData$ = moduletopicApiData
        }
        body.childData = [...moduletopicApiData]
      })
    }
  }

  playURLConstructor(url,moduleName,topicName){
    const encodedModuleName = encodeURIComponent(moduleName);
    const encodedTopicName = this.scromApiData.checkLevel ? encodeURIComponent(topicName):null;
    let id = CryptoJS.AES.decrypt(this.getuserid.user_id, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl
      (environment.scormUrl + '/scormPlayer.html?content_id=' +this.courseid + 
      '&user_id=' + id + 
      '&batchid=' + this.batchId + 
      '&id=' + this.topicInfo.id + 
      '&parent=' + this.topicInfo.parent + 
      '&path=' + url+ 
      '&module=' + encodedModuleName + 
      '&topic=' + encodedTopicName +
      '&action=Click&week=' + (Number(this.weekHolder) + 1) + 
      '&lastLogIndex=' + this.lastLogIndex);
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
    this.weekHolder = weekIndex;
    this.weekHolderUI = weekIndex;
    this.currentTopicTitle = topicName;
    this.currentModuleTitle = moduleName
    this.topicPageStatus = topicStatus;
    this.moduleSatusCheck = moduleStatus ? moduleStatus : 'process';
    if (moduleIdx >= 0) {
      this.subModuleHolder = moduleIdx
      this.subModuleHolderUI = moduleIdx
      this.submoduleTitle = moduleName
    }
    
    this.nextPrevHolder = topindex;
    this.topiccurrentPage = this.nextPrevHolder
    this.moduleHolder = Number(smi);
    this.currentPage = Number(smi);
    // this.isprevEnable = true;
    // this.isNextEnable = true;
    this.topicInfo = topicDetail
    this.playURLConstructor(url,moduleName,topicName)
    console.log(this.urlSafe,"click link")
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
    // if(this.scromApiData.checkLevel){return false}
    this.bookmarkedCount = 0;
    this.bkup_Toc = JSON.parse(JSON.stringify(this.scromModuleData));
    this.filterData = [];
    // if (this.filterkey === 'Bookmarked') {
    if (this.scromApiData.checkLevel) {
      this.bkup_Toc.forEach((week, wi) => {
        let smifilter = [];
        week.childData.forEach((sm, smi) => {
          let modulefilter = [];
          sm.childData.forEach((module, mi) => {
            if (module.childData.length > 0) {
              let markedTopcs;
              markedTopcs = module.childData.filter((topic) => {
                return topic?.bookmark === true;
              });
              if (markedTopcs.length > 0) {
                this.bookmarkedCount += markedTopcs.length;
                module.childData = [];
                module.childData = markedTopcs;
                modulefilter.push(module);
              }
            }
          });
          if (modulefilter.length) {
            sm.childData = modulefilter;
            smifilter.push(sm);
          }
        });

        if (smifilter.length) {
          week.childData = smifilter;
          this.filterData.push(week);
        }
      });
    } else {
      this.bkup_Toc.forEach((week, wi) => {
        let modulefilter = [];
        week.childData.forEach((module, mi) => {
          if (module.childData.length > 0) {
            let markedTopcs;
            markedTopcs = module.childData.filter((topic) => {
              return topic?.bookmark === true;
            });
            if (markedTopcs.length > 0) {
              this.bookmarkedCount += markedTopcs.length;
              module.childData = [];
              module.childData = markedTopcs;
              modulefilter.push(module);
            }
          }
        });
        if (modulefilter.length) {
          week.childData = modulefilter;
          this.filterData.push(week);
        }
      });
    }
    // }
    // else {
    //   this.filterData = []

    // }
  }

  topicNext() {
    // console.log(this.scromModuleData)
    this.isNextEnable = true;
    this.isprevEnable = true;
    this.moduleInfo =
      this.scromModuleData[this.weekHolder].childData[this.currentPage];
    //WEEK NAVIGATION
    if (this.weekHolder < this.weekLength) {
      this.moduleLenth = this.scromModuleData[this.weekHolder].childData.length;
      // this.getTopicLengthofModule = this.scromModuleData[this.weekHolder].childData[this.currentPage]?.topic_len;

      if (this.currentPage < this.moduleLenth) {
        this.getTopicLengthofModule =
          this.scromModuleData[this.weekHolder].childData[
            this.currentPage
          ]?.topic_len;
        // topic to module change on previous
        if (this.topiccurrentPage === this.getTopicLengthofModule - 1) {
          if (
            this.currentPage === this.moduleLenth - 1 &&
            this.topiccurrentPage === this.getTopicLengthofModule - 1
          ) {
            this.weekHolder = this.weekHolderUI = Number(this.weekHolder) + 1;
            this.currentPage = 0;
            this.moduleHolder = this.currentPage;
          } else {
            this.currentPage = Number(this.currentPage) + 1;
            this.moduleHolder = this.currentPage;
          }
          this.topiccurrentPage = 0;
          this.nextPrevHolder = 0;
          this.getTopicLengthofModule =
            this.scromModuleData[this.weekHolder].childData[
              this.currentPage
            ]?.topic_len;
        } else {
          this.topiccurrentPage = Number(this.topiccurrentPage) + 1;
          this.nextPrevHolder = this.topiccurrentPage;
        }
        // topic
        if (this.topiccurrentPage <= this.getTopicLengthofModule) {
          this.moduleInfo =
            this.scromModuleData[this.weekHolder].childData[this.currentPage];
          this.gettopicLink =
            this.scromModuleData[this.weekHolder].childData[
              this.currentPage
            ].childData[this.topiccurrentPage];
          this.moduleSatusCheck = this.moduleInfo.status
            ? this.moduleInfo.status
            : "process";
          this.currentTopicTitle = this.gettopicLink.title;
          this.currentModuleTitle = this.moduleInfo.title;
          this.topicPageStatus = this.gettopicLink.status;
          this.playURLConstructor( this.gettopicLink.link,this.currentModuleTitle,this.currentTopicTitle)
          
        }
      }
    }
    // this.gettopicLink = this.scromModuleData[this.currentPage - 1]?.childData[this.topiccurrentPage];
    // const childData = this.scromModuleData[this.moduleLenth - 1]?.childData;
    // const childlength = this.scromModuleData[this.moduleLenth - 1]?.childData.length;
    // if (this.gettopicLink.id === childData[childlength - 1].id) {
    //   this.ratingPopup();
    // }
  }

  topicPrve() {
    this.isNextEnable = true;
    this.isprevEnable = true;
    this.moduleInfo =
      this.scromModuleData[this.weekHolder].childData[this.currentPage];
    this.moduleLenth = this.scromModuleData[this.weekHolder].childData.length;
    if (this.currentPage < this.moduleLenth) {
      this.getTopicLengthofModule =
        this.scromModuleData[this.weekHolder].childData[
          this.currentPage
        ]?.topic_len;
      // topic to module change on previous

      if (this.currentPage - 1 >= 0 && this.topiccurrentPage === 0) {
        this.currentPage = this.currentPage - 1;
        this.moduleHolder = this.currentPage;
        this.topiccurrentPage =
          this.scromModuleData[this.weekHolder].childData[this.currentPage]
            .childData.length - 1;
        this.nextPrevHolder = this.topiccurrentPage;
        this.getTopicLengthofModule =
          this.scromModuleData[this.weekHolder].childData[
            this.currentPage
          ]?.topic_len;
      } else {
        if (this.currentPage == 0 && this.topiccurrentPage == 0) {
          this.weekHolder = this.weekHolderUI = this.weekHolder - 1;
          this.moduleHolder =
            this.scromModuleData[this.weekHolder].childData.length - 1;
          this.currentPage = Number(this.moduleHolder);
          this.topiccurrentPage =
            this.scromModuleData[this.weekHolder].childData[this.currentPage]
              .childData.length - 1;
          this.nextPrevHolder = this.topiccurrentPage;
        } else {
          this.topiccurrentPage = this.topiccurrentPage - 1;
          this.nextPrevHolder = this.topiccurrentPage;
        }
      }
      if (this.topiccurrentPage >= 0) {
        this.moduleInfo =
          this.scromModuleData[this.weekHolder].childData[this.currentPage];
        this.gettopicLink =
          this.scromModuleData[this.weekHolder].childData[
            this.currentPage
          ].childData[this.topiccurrentPage];
        this.moduleSatusCheck = this.moduleInfo.status
          ? this.moduleInfo.status
          : "process";
        this.currentTopicTitle = this.gettopicLink.title;
        this.currentModuleTitle = this.moduleInfo.title;
        this.topicPageStatus = this.gettopicLink.status;
        this.playURLConstructor( this.gettopicLink.link,this.currentModuleTitle,this.currentTopicTitle)
      }
    }
  }

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
    this.topicInfo.user_experience = ux;
    this.Lservice.userexperience(
      this.getuserid.user_id,
      this.courseid,
      this.batchId,
      this.topicInfo.id,
      this.topicInfo.parent_id,
      ux,
      this.topicInfo.status
    ).subscribe((data: any) => {
      if (data?.data?.userexperience?.success) {
        this.topicInfo.user_experience = ux;
      } else {
        this.toastr.warning(data?.data?.userexperience?.message);
      }
    });
  }

  bookmarkClick(isbokmarked) {
    this.topicInfo.bookmark = isbokmarked;
    this.Lservice.bookmark(
      this.getuserid.user_id,
      this.courseid,
      this.scromApiData.checkLevel
        ? this.submoduleTitle
        : this.currentModuleTitle,
      this.currentTopicTitle,
      isbokmarked,
      Number(this.weekHolderUI) + 1,
      this.lastLogIndex,
      this.moduleHolder,
      this.subModuleHolder,
      this.nextPrevHolder
    ).subscribe((data: any) => {
      if (data?.data?.bookmark?.success) {
        this.topicInfo.bookmark = isbokmarked;
        this.filterToc();
      } else {
        // this.toastr.warning(data?.data?.bookmark?.message)
      }
    });
  }
  contextmenu() {
    event.preventDefault();
  }
  submitMyQuestion() {
    if (this.currentModuleTitle || this.currentTopicTitle) {
      if (this.questionText.trim().length) {
        this.Lservice.askaquestion(
          this.getuserid.user_id,
          this.courseid,
          this.scromApiData.checkLevel
            ? this.submoduleTitle
            : this.currentModuleTitle,
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
      this.toastr.warning("Please select a module");
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
        this.scromApiData.checkLevel
          ? this.submoduleTitle
          : this.currentModuleTitle,
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
        this.scromApiData.checkLevel
          ? this.submoduleTitle
          : this.currentModuleTitle,
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
    console.log(tab, "tabs");
    if (tab.index == 1) {
      this.filterkey = "Bookmarked";
      this.filterToc();
    } else {
      this.filterkey = "All";
    }
  }
 
  filterQAList() {
    this.isQALoading = true;
    this.Lservice.getallquestion(
      this.getuserid.user_id,
      this.courseid,
      this.currentModuleTitle,
      this.currentTopicTitle,
      this.qaFilterKey,
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
        this.toastr.warning("spl key");
        return false;
      }

      this.Lservice.createEngineersForumData(
        this.userDetail.user_id,
        this.userDetail.full_name,
        this.courseid,
        this.htmlContent,
        this.course?.course_name,
        this.batchId
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
}
