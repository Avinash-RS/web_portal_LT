import { Component, OnInit } from '@angular/core';
import { WcaService } from '../../services/wca.service';

@Component({
  selector: 'app-choose-template',
  templateUrl: './choose-template.component.html',
  styleUrls: ['./choose-template.component.scss']
})
export class ChooseTemplateComponent implements OnInit {


  templateList: any;
  selectedTemplateId: any;

  constructor(private APIService: WcaService) { }

  ngOnInit() {
    this.getTemplates();
  }

  getTemplates() {
    this.APIService.getAllTemplates().subscribe((res: any) => {
      this.templateList = res.Result;
    })
  }
  selectTemplate(templateId) {
    this.selectedTemplateId = templateId;
  }
}
