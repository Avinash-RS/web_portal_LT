import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.scss']
})
export class CreateTopicComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  done = [
    {
      name:"PDF",
      image:"../../../../assets/images/image_upload.svg"
    },
    {
      name:"Excel",
      image:"../../../../assets/images/image_upload.svg"
    },
    {
      name:"Word",
      image:"../../../../assets/images/image_upload.svg"
    },
    {
      name:"PPT",
      image:"../../../../assets/images/image_upload.svg"
    },
    {
      name:"Image",
      image:"../../../../assets/images/image_upload.svg"
    }
    
 

  ];

}
