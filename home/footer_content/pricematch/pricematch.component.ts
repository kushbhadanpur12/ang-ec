import { Component, OnInit } from '@angular/core';
import { FootercontentService } from '../../../services/footercontent.service';
import { Response } from '@angular/http/src/static_response';

@Component({
  selector: 'app-pricematch',
  templateUrl: './pricematch.component.html',
  styleUrls: ['./pricematch.component.css']
})
export class PricematchComponent implements OnInit {

  results :any;
  constructor(private footerservice : FootercontentService) { }

  ngOnInit() {
    let para = 'price-match-promise';    ///       page url 
    this.results =  this.footerservice.staticData(para);
  }
}
