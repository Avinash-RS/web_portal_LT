import { Component, OnInit } from '@angular/core';
import { LearnerServicesService } from '../../services/learner-services.service';
@Component({
  selector: 'app-scormplayer',
  templateUrl: './scormplayer.component.html',
  styleUrls: ['./scormplayer.component.scss']
})
export class ScormplayerComponent implements OnInit {

  constructor(   public service : LearnerServicesService) { }

  ngOnInit() {
  }
  getcontent(){
    this.service.list_content().subscribe(data => {
      

    })
  }
}
