import { Component, OnInit } from '@angular/core';
import { FootercontentService } from '../../../services/footercontent.service';
import { Response } from '@angular/http/src/static_response';

@Component({
  selector: 'app-ring-resizing',
  templateUrl: './ring-resizing.component.html',
  styleUrls: ['./ring-resizing.component.css']
})
export class RingResizingComponent implements OnInit {

  results :any;
  constructor(private footerservice : FootercontentService) { }

  ngOnInit() {
    let para = 'ring-resizing';    ///       page url 
    this.results =  this.footerservice.staticData(para);
  }
}
