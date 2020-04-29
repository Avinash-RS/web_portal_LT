import { Component, OnInit } from '@angular/core';
import { WcaService } from '../../services/wca.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-choose-template',
  templateUrl: './choose-template.component.html',
  styleUrls: ['./choose-template.component.scss']
})
export class ChooseTemplateComponent implements OnInit {

  queryData:any;
  templateList: any;
  selectedTemplate: any;
  hoverId: any;
  isHover: boolean;

  constructor(
    private APIService: WcaService,
    public router: Router,
    public route:ActivatedRoute,
    public spinner: NgxSpinnerService
    ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let flag = 0;
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          flag = 1;
        }
      }
      if (flag) {
      this.queryData = params;
      console.log(this.queryData)
      }
    });
    this.selectedTemplate={
      template_id:""
    }
    this.getTemplates();
  }

  getTemplates() {
    this.spinner.show();
    this.APIService.getAllTemplates().subscribe((res: any) => {
      this.templateList = res.Result;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    })
  }
  
  selectTemplate(template) {
    this.selectedTemplate = template;
  }

  templateParse(tlist) {
    console.log( this.selectedTemplate );
        this.router.navigate(['./Wca/addtopic'],{queryParams:{courseName:this.queryData.courseName,viewingModule: this.queryData.viewingModule,template:this.selectedTemplate.template_id,image: this.queryData.image}});
  }

  onHover(id) {
    this.hoverId = id;
    this.isHover = true;
  }
  onhoverLeave(){
    this.isHover = false;
    this.hoverId = '';
  }

  navCreateTemp() {
    this.router.navigate(['./Wca/addtemplate'],{queryParams: { viewingModule: this.queryData.viewingModule ,courseName:this.queryData.courseName,image: this.queryData.image}});
  }

}
