import { Component, OnInit } from '@angular/core';
import { FootercontentService } from '../../../services/footercontent.service';
import { Response } from '@angular/http/src/static_response';

@Component({
  selector: 'app-insurance-valuation',
  templateUrl: './insurance-valuation.component.html',
  styleUrls: ['./insurance-valuation.component.css']
})
export class InsuranceValuationComponent implements OnInit {

  results :any;
  constructor(private footerservice : FootercontentService) { }

  ngOnInit() {
    let para = 'insurance-valuation';    ///       page url 
    this.results =  this.footerservice.staticData(para);
  }
}
