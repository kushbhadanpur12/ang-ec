import { Component, OnInit } from '@angular/core';
import { FootercontentService } from '../../../services/footercontent.service';
import { Response } from '@angular/http/src/static_response';


@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  results :any;
  constructor(private footerservice : FootercontentService) { }

  ngOnInit() {
    let para = 'faq-s';    ///       page url 
    this.results =  this.footerservice.staticData(para);
  }

}
