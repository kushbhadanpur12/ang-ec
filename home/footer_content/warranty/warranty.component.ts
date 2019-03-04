import { Component, OnInit } from '@angular/core';
import { FootercontentService } from '../../../services/footercontent.service';
import { Response } from '@angular/http/src/static_response';


@Component({
  selector: 'app-warranty',
  templateUrl: './warranty.component.html',
  styleUrls: ['./warranty.component.css']
})
export class WarrantyComponent implements OnInit {

  results :any;
  constructor(private footerservice : FootercontentService) { }

  ngOnInit() {
    let para = 'warranty';    ///       page url 
    this.results =  this.footerservice.staticData(para);
  }

}
