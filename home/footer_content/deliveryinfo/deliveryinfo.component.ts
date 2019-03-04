
import { Component, OnInit } from '@angular/core';
import { FootercontentService } from '../../../services/footercontent.service';
import { Response } from '@angular/http/src/static_response';


@Component({
  selector: 'app-deliveryinfo',
  templateUrl: './deliveryinfo.component.html',
  styleUrls: ['./deliveryinfo.component.css']
})
export class DeliveryinfoComponent implements OnInit {

  results :any;
  constructor(private footerservice : FootercontentService) { }

  ngOnInit() {
    let para = 'delivery-information';    ///       page url 
    this.results =  this.footerservice.staticData(para); 
  }


}
