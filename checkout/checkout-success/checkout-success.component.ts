import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Printd } from 'printd';
import  * as global  from './../../global.component';
import { Router ,ActivatedRoute } from '@angular/router';
import { CheckoutService } from '../../services/checkout.service';



@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.css']
})
export class CheckoutSuccessComponent implements OnInit {
  
        orderItems :any;
        shippingAddr :any;
        billingAddr:any;
        allOrders :any;
        profileData :any;
        public orderId:any;
		multicurr:any;
		today :any;

  constructor(private router: Router,private route: ActivatedRoute, private orderList: CheckoutService) { }

  ngOnInit() {
    
        this.route.queryParams.subscribe(params => {
        this.orderId = params['order_number'];
		 this.today = Date.now();
		 

        let tokenid = localStorage.getItem('tokenid');
        let tokenkey = localStorage.getItem('tokenkey');
        let para = '?orderId='+this.orderId+'&tokenid='+tokenid+'&tokenkey='+tokenkey;

        this.orderList.getOrderItems(para).subscribe( (response) => { 
		console.log(response);
		
        this.orderItems = response.order.order_invoice_item_details; 
        this.allOrders = response.order; 
		this.multicurr  = response.order.order_multi_currency;
        this.profileData = response.order.order_profile_data;

        this.shippingAddr = response.order.order_shipping_details; 
        this.billingAddr = response.order.order_billing_details; 
      
      })
      
  });

  }

  
 myfunction(){

    const d: Printd = new Printd();
    d.print( document.getElementById('myelement'), global.invoice )
}

}
