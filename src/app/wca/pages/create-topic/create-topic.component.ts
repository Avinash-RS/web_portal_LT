import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WcaService } from '../../services/wca.service';

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.scss']
})
export class CreateTopicComponent implements OnInit {
  queryData:any;
  active:any;

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private APIService: WcaService,

    ) { }

  ngOnInit() {
    this.APIService.bSubject.subscribe(value => {
    this.queryData = value;
     })

  }
 
 
  activate(item){
    this.active=item
  }
 

}
