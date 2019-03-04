import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import {ReactiveFormsModule ,Form, FormGroup, Validators ,FormControl,Validator } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { empty } from 'rxjs/observable/empty';
import { HomeService } from '../home.service';
import { HeaderComponent } from '../home/header/header.component';

import { Subscription }   from 'rxjs/Subscription';


declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

 public count = [];
 results:any;
 orderId:any;
 form: FormGroup;
 orderitemid:any;
 showDialog: boolean = false;
 reqCss: boolean = false;
 couponInvalid: boolean = false;
 checkabdcart: boolean = false;
 shouldShow: boolean = false;
 priceRangeInvalid: boolean = false;
 orderamount:any;
 statusCode:any;
 
 public couponcode:any;
 
 eng_font:any;
 eng_text:any;
 item_id :any;
 order_id:any;
 abdcart:any;
 
 subscription:any;
  customercurrncy:any;
  cust_currency:any;

  constructor(private cartservice : CartService, private homeservice :HomeService, private route: Router) { }

  ngOnInit() {
    for(let i=1; i< 51; i++){
      this.count.push(i);
    }

    let tid =  localStorage.getItem('tokenid');
    let tokenkey =  localStorage.getItem('tokenkey');
    let para = '?tokenid='+tid+'&tokenkey='+tokenkey;

    //this.results = this.cartservice.getcartItems(para);
	
	this.cartservice.getcartItems(para).subscribe( (response) => { this.results = response; } );
	
	
    console.log(this.results);
    this.form = new FormGroup({
     
      eng_font: new FormControl(''),
      eng_text: new FormControl(''),
      orderitem_id: new FormControl('')

    });
  	
	this.subscription = this.homeservice.currencyObservable$.subscribe(
        res => {
         this.customercurrncy = res;
        var newwe = this.customercurrncy.customer_currency;
     
         this.cust_currency = JSON.parse(this.customercurrncy.customer_currency);
         console.log(this.cust_currency);
      });
	  
  }

  removeOrderItem(id,orderid){
		$('.cartLoader').show();

        let tid =  localStorage.getItem('tokenid');
        let tokenkey =  localStorage.getItem('tokenkey');
        let para = '?tokenid='+tid+'&tokenkey='+tokenkey+'&itemId='+id+'&orderid='+orderid;
        this.cartservice.removeOrderItems(para);
		
		let para2 = '?tokenid='+tid+'&tokenkey='+tokenkey;
		this.cartservice.getcartItems(para2).subscribe( (response) => { this.results = response; $('.cartLoader').hide();} );
  }
  
  submitOrderId(id,oid){
    this.orderitemid = id;
    this.orderId = oid;
  }


  getEngraving(itemsid,orderid){

   this.showDialog = true;
   this.item_id = itemsid;
   this.order_id = orderid;

   let tokenid = localStorage.getItem('tokenid');
   let tokenkey = localStorage.getItem('tokenkey');

   let para = '?tokenid='+tokenid+'&tokenkey='+tokenkey+'&itemId='+this.item_id+'&orderId='+this.order_id;

  this.cartservice.updateengraving(para)
  .subscribe(
   (response) => {
     this.eng_font = response[0].engrav_font
     this.eng_text = response[0].engrav_text
    //console.log(response);
   },
   (error: Response) => console.log(error)
 );

  }

	updateengrave(form){
		
		let engfont =  form.value.eng_font;
		let eng_text = form.value.eng_text;
		this.item_id ;
		this.order_id;
		
		//$("#eng_text_len").maxlength({ MaxLength:25 });
		
		let tokenid = localStorage.getItem('tokenid');
		let tokenkey = localStorage.getItem('tokenkey');
		
		let para = '?tokenid='+tokenid+'&tokenkey='+tokenkey+'&itemId='+this.item_id+'&eng_text='+eng_text+'&engfont='+engfont+'&orderId='+this.order_id;
		this.cartservice.updateEngData(para);
		
		$(".dialog__close-btn").trigger("click");
		$('.cartLoader').show();
		let tid2 =  tokenid;
		let tokenkey2 =  tokenkey;
		let para2 = '?tokenid='+tid2+'&tokenkey='+tokenkey2;
		this.cartservice.getcartItems(para2).subscribe( (response) => { this.results = response; $('.cartLoader').hide();} );
	}

	changeQuantity($e,item,order){
	
		$('.cartLoader').show();
		
		let tokenid = localStorage.getItem('tokenid');
		let tokenkey = localStorage.getItem('tokenkey');
		
		let para = '?tokenid='+tokenid+'&tokenkey='+tokenkey+'&itemId='+item+'&quantity='+$e.target.value+'&orderId='+order;
		this.cartservice.updateQuantity(para);
		
		let tid2 =  tokenid;
		let tokenkey2 =  tokenkey;
		let para2 = '?tokenid='+tid2+'&tokenkey='+tokenkey2;
		this.cartservice.getcartItems(para2).subscribe( (response) => { this.results = response; $('.cartLoader').hide();} );
		
	}


    saveAbandonedcartData(orderid){
		let para = '?orderid='+orderid;
		this.abdcart =   this.cartservice.insertAdandonCart(para);
		this.checkabdcart = true;
		this.abdcart.splice(empty);
		console.log(this.abdcart);
    }
	
	couponCode(){
		$('.add-coupon').toggle();
	}
	
	submitCouponCode(){
	
		var couponcode = $('#couponcode').val();

		if(couponcode!=''){

			this.reqCss = false;
			$('.cartLoader').show();
			this.couponcode = couponcode;
			let tokenid = localStorage.getItem('tokenid');
			let tokenkey = localStorage.getItem('tokenkey');
			let para = '?tokenid='+tokenid+'&tokenkey='+tokenkey+'&couponcode='+couponcode;
			
			this.cartservice.submitCouponCode(para).map(res => res.json()).subscribe( (response) => {
				console.log(response);
				
				if(response.statusCode == 403){
					this.couponInvalid = true;
					this.shouldShow = true;
					this.priceRangeInvalid = false;
				}else if(response.statusCode==200){
					this.couponInvalid = false;
					this.shouldShow = false;
					this.reqCss = false;
					this.priceRangeInvalid = false;
				}else if(response.statusCode==411){
					this.couponInvalid = false;
					this.priceRangeInvalid = true;
					this.shouldShow = true;
					
					this.orderamount = response.maxprice;
					this.reqCss = false;
				}
				$('.cartLoader').hide();
			 });


			this.cartservice.getcartItems(para).subscribe( (response) => { this.results = response;});

		}else{
			console.log('empty copon');
				this.reqCss = true;
				this.shouldShow = true;
				this.couponInvalid = false;
				this.priceRangeInvalid = false;
		}
	
		
		
	}
	
	removeCouponCode(id){
		$('.cartLoader').show();
		
		var couponid = id;
		
		let tokenid = localStorage.getItem('tokenid');
		let tokenkey = localStorage.getItem('tokenkey');
		let para = '?tokenid='+tokenid+'&tokenkey='+tokenkey+'&couponid='+couponid;
		
		this.cartservice.removeCouponCode(para).subscribe( (response) => { console.log(response); $('.cartLoader').hide();} );
		
		let para2 = '?tokenid='+tokenid+'&tokenkey='+tokenkey;
		this.cartservice.getcartItems(para2).subscribe( (response) => { this.results = response; } );
	}
    
}
