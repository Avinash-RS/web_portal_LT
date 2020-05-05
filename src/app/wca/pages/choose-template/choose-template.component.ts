import { Component, OnInit } from "@angular/core";
import { WcaService } from "../../services/wca.service";
import { Router, ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-choose-template",
  templateUrl: "./choose-template.component.html",
  styleUrls: ["./choose-template.component.scss"],
})
export class ChooseTemplateComponent implements OnInit {
  queryData: any;
  templateList: any;
  selectedTemplate: any;
  hoverId: any;
  isHover: boolean;

  constructor(
    private APIService: WcaService,
    public router: Router,
    public route: ActivatedRoute,
    public spinner: NgxSpinnerService,
    public toast: ToastrService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      let flag = 0;
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          flag = 1;
        }
      }
      if (flag) {
        this.queryData = params;
        console.log(this.queryData);
      }
    });
    this.selectedTemplate = {
      template_id: "",
    };
    this.getTemplates();
  }

  getTemplates() {
    this.spinner.show();
    this.APIService.getAllTemplates().subscribe(
      (res: any) => {
        this.templateList = res.Result;
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  selectTemplate(template) {
    this.selectedTemplate = template;
  }

  templateParse(tlist) {
    console.log(this.selectedTemplate);
    if (this.selectedTemplate && this.selectedTemplate.template_id) {
      if (this.queryData && this.queryData.addModule) {
        this.router.navigate(["/Admin/auth/Wca/addtopic"], {
          queryParams: {
            addModule: true,
            courseName: this.queryData.courseName,
            viewingModule: this.queryData.viewingModule,
            template: this.selectedTemplate.template_id,
          },
        });
      } else {
        this.router.navigate(["/Admin/auth/Wca/addtopic"], {
          queryParams: {
            courseName: this.queryData.courseName,
            viewingModule: this.queryData.viewingModule,
            template: this.selectedTemplate.template_id,
          },
        });
      }
    } else {
      this.toast.warning('Aleast One Template is Required !!!');
    }
  }

  onHover(id) {
    this.hoverId = id;
    this.isHover = true;
  }
  onhoverLeave() {
    this.isHover = false;
    this.hoverId = "";
  }

  navCreateTemp() {
    if(this.queryData && this.queryData.addModule)
    {
      this.router.navigate(['/Admin/auth/Wca/addtemplate'],{queryParams: { addModule:true,viewingModule: this.queryData.viewingModule ,image: this.queryData.image,courseName:this.queryData.courseName}});
    }else {
      this.router.navigate(['/Admin/auth/Wca/addtemplate'],{queryParams: { viewingModule: this.queryData.viewingModule ,image: this.queryData.image,courseName:this.queryData.courseName}});
    }
  }
}
