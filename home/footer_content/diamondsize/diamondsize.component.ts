import { Component, OnInit } from '@angular/core';
import { FootercontentService } from '../../../services/footercontent.service';
import { Response } from '@angular/http/src/static_response';


@Component({
  selector: 'app-diamondsize',
  templateUrl: './diamondsize.component.html',
  styleUrls: ['./diamondsize.component.css']
})
export class DiamondsizeComponent implements OnInit {

  results :any;
  constructor(private footerservice : FootercontentService) { }

  ngOnInit() {
    let para = 'diamond-size-guide';    ///       page url 
    this.results =  this.footerservice.staticData(para);
  }

}
