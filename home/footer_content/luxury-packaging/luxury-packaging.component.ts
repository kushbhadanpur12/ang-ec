import { Component, OnInit } from '@angular/core';
import { FootercontentService } from '../../../services/footercontent.service';
import { Response } from '@angular/http/src/static_response';

@Component({
  selector: 'app-luxury-packaging',
  templateUrl: './luxury-packaging.component.html',
  styleUrls: ['./luxury-packaging.component.css']
})
export class LuxuryPackagingComponent implements OnInit {

  results :any;
  constructor(private footerservice : FootercontentService) { }

  ngOnInit() {
    let para = 'luxury-packaging';    ///       page url 
    this.results =  this.footerservice.staticData(para);
  }


}
