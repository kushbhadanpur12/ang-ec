import { Component, OnInit } from '@angular/core';
import { FootercontentService } from '../../../services/footercontent.service';
import { Response } from '@angular/http/src/static_response';

@Component({
  selector: 'app-ring-sizeguide',
  templateUrl: './ring-sizeguide.component.html',
  styleUrls: ['./ring-sizeguide.component.css']
})
export class RingSizeguideComponent implements OnInit {

  results :any;
  constructor(private footerservice : FootercontentService) { }

  ngOnInit() {
    let para = 'ring-size-guide';    ///       page url 
    this.results =  this.footerservice.staticData(para);
  }
}
