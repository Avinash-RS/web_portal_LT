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

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private APIService: WcaService,

    ) { }

  ngOnInit() {
    this.APIService.location1.subscribe((data1: any) => {
     this.queryData = data1;

  console.log("fhghgfhgfhgfhg",this.queryData);

    });
  }


 

}
