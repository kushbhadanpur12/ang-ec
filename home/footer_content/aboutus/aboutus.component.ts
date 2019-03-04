import { Component, OnInit } from '@angular/core';
import { FootercontentService } from '../../../services/footercontent.service';
import { Response } from '@angular/http/src/static_response';
import { collectExternalReferences } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  results :any;
  constructor(private footerservice : FootercontentService) { 
  }
  
  ngOnInit() {
       let para = 'about-us';
       this.results =  this.footerservice.staticData(para); 
  }

}
