import { Component, OnInit } from '@angular/core';
import { WcaService } from '../../services/wca.service';
import { Router, ActivatedRoute } from '@angular/router';

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
    public route:ActivatedRoute
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
    this.APIService.getAllTemplates().subscribe((res: any) => {
      this.templateList = res.Result;
    })
  }
  
  selectTemplate(template) {
    this.selectedTemplate = template;
  }

  templateParse(tlist) {
    console.log( this.selectedTemplate );
    this.APIService.bSubject.next(this.selectedTemplate);
        this.router.navigate(['./Wca/addtopic']);
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
    this.router.navigate(['./Wca/addtemplate'],{queryParams: { viewingModule: this.queryData.viewingModule ,courseName:this.queryData.courseName}});
  }

}
