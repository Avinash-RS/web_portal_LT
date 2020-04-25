import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WcaService } from '../../services/wca.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.scss']
})
export class CreateTopicComponent implements OnInit {
  queryData:any;
  active:any;

  constructor(
    public spinner: NgxSpinnerService,
    public toast: ToastrService,
    public router: Router,    public route: ActivatedRoute,
    private APIService: WcaService,

    ) { }

  ngOnInit() {
    this.APIService.bSubject.subscribe(value => {
      const temp = value;
      localStorage.setItem('templates',JSON.stringify(temp));
       const temp2 = localStorage.getItem('templates');
       this.queryData = JSON.parse(temp2);
       console.log(this.queryData);
     })

  }
 
 
  activate(item){
    this.active=item
  }
 
  onSelectFile(fileInput:any,item) {
    console.log(item);
    var imagepath;
    var filePath = fileInput.target.files[0].name;
    // var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    // if(!allowedExtensions.exec(filePath)){
    //     this.toast.warning('Please upload file having extensions .jpeg/.jpg/.png only.');
    //     fileInput.value = '';
    //     return false;
    // }else{
    //   if (fileInput && fileInput.target && fileInput.target.files[0]) { 
    //   }
    // }
  }






  

}
