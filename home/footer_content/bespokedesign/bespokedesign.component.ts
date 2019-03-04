import { Component, OnInit } from '@angular/core';
import { FootercontentService } from '../../../services/footercontent.service';
import { Response } from '@angular/http/src/static_response';

@Component({
  selector: 'app-bespokedesign',
  templateUrl: './bespokedesign.component.html',
  styleUrls: ['./bespokedesign.component.css']
})
export class BespokedesignComponent implements OnInit {

  results :any;
  constructor(private footerservice : FootercontentService) { 
     }

  ngOnInit() {
    let para = 'bespoke-design';    ///       page url 
    this.results =  this.footerservice.staticData(para);

  }


}
