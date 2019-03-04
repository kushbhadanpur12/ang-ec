import { Component, OnInit } from '@angular/core';
import { FootercontentService } from '../../../services/footercontent.service';
import { Response } from '@angular/http/src/static_response';

@Component({
  selector: 'app-education-guide',
  templateUrl: './education-guide.component.html',
  styleUrls: ['./education-guide.component.css']
})
export class EducationGuideComponent implements OnInit {

  results :any;
  constructor(private footerservice : FootercontentService) { }

  ngOnInit() {
    let para = 'education-guide';    ///       page url 
    this.results =  this.footerservice.staticData(para);
  }

}
