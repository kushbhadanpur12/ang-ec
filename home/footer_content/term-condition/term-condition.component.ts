import { Component, OnInit } from '@angular/core';
import { FootercontentService } from '../../../services/footercontent.service';
import { Response } from '@angular/http/src/static_response';

@Component({
  selector: 'app-term-condition',
  templateUrl: './term-condition.component.html',
  styleUrls: ['./term-condition.component.css']
})
export class TermConditionComponent implements OnInit {

  results :any;
  constructor(private footerservice : FootercontentService) { }

  ngOnInit() {
    let para = 'terms-and-conditions';    ///       page url 
    this.results =  this.footerservice.staticData(para);
  }
}
