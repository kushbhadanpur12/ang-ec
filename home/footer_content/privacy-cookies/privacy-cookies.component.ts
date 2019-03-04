import { Component, OnInit } from '@angular/core';
import { FootercontentService } from '../../../services/footercontent.service';
import { Response } from '@angular/http/src/static_response';

@Component({
  selector: 'app-privacy-cookies',
  templateUrl: './privacy-cookies.component.html',
  styleUrls: ['./privacy-cookies.component.css']
})
export class PrivacyCookiesComponent implements OnInit {

  results :any;
  constructor(private footerservice : FootercontentService) { }

  ngOnInit() {
    let para = 'privacy-and-cookies';    ///       page url 
    this.results =  this.footerservice.staticData(para); 
  }

}
