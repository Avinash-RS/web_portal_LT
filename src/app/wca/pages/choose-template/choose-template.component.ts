import { Component, OnInit } from '@angular/core';
import { WcaService } from '../../services/wca.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-choose-template',
  templateUrl: './choose-template.component.html',
  styleUrls: ['./choose-template.component.scss']
})
export class ChooseTemplateComponent implements OnInit {


  templateList: any;
  selectedTemplate: any;

  constructor(
    private APIService: WcaService,
    public router: Router,
    ) { }

  ngOnInit() {
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
}
