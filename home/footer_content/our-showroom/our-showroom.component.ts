import { Component, OnInit } from '@angular/core';
import { FootercontentService } from '../../../services/footercontent.service';
import { Response } from '@angular/http/src/static_response';
import { collectExternalReferences } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-our-showroom',
  templateUrl: './our-showroom.component.html',
  styleUrls: ['./our-showroom.component.css']
})
export class OurShowroomComponent implements OnInit {

  results :any;
  constructor(private footerservice : FootercontentService) { }

  ngOnInit() {
    let para = 'our-showroom';    ///       page url 
    this.results =  this.footerservice.staticData(para);
  }

}
