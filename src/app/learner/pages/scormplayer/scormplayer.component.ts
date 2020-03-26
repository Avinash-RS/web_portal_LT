import { Component, OnInit } from '@angular/core';
import { LearnerServicesService } from '../../services/learner-services.service';
@Component({
  selector: 'app-scormplayer',
  templateUrl: './scormplayer.component.html',
  styleUrls: ['./scormplayer.component.scss']
})
export class ScormplayerComponent implements OnInit {
  contentid:any;
  content:any;
  syllabus:any;
  constructor(   public service : LearnerServicesService) { }

  ngOnInit() {
    this.getcontent()
    this.getcoursedetail()
  }
  getcontent(){
    this.service.list_content().subscribe(data => {
      console.log(data)

    })
  }
  getcoursedetail(){
    this.contentid='FSL'
    this.service.syllabus_of_particular_scorm(this.contentid).subscribe(data => {
    
      this.content=data.data
      this.syllabus=this.content.syllabus_of_particular_scorm.data
      console.log(this.syllabus)
    })
  }
}
