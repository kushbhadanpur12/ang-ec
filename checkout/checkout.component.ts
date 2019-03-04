import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../services/checkout.service';
import { Http, Response, Headers } from "@angular/http";
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { HomeService } from '../home.service';
import { PaypalComponent } from '../payments/paypal/paypal.component';
import { SagepayComponent } from '../payments/sagepay/sagepay.component';
import { BankComponent } from '../payments/bank/bank.component';
import { DekoComponent } from '../payments/deko/deko.component';
import { environment as env } from './../../environments/environment';
import { Subscription }   from 'rxjs/Subscription';
import { CartService } from '../services/cart.service';

import { error } from 'util';

declare var jquery:any;
declare var $ :any;
declare var clickToAddress:any;

declare var CraftyClick:any;
declare var secondCraftyClick:any;
declare var cc_debug :any;




@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public show: boolean = false;
 
  public sameaddr : Boolean = true;
  sameasbilling: any;
  public shippingAddr : Boolean = false;
  
  public accountTransfer : Boolean = false;
  public bankTransfer : Boolean = false;
  public paypal : Boolean = false;
  public sagepay : Boolean = false;
  defaultshipid : number;
  public showhideorderlist : Boolean = false;
  public payment_method : Boolean = false;
  
  public chkd_password : Boolean = false;
  public u_notexist : Boolean = false;
  public u_exist : Boolean = false;
  public u_afterlogin : Boolean = false;
  public alerdaylogin : Boolean = false;
  public userloggedin  : Boolean ;
  public closepopup  : Boolean ;
  public createpass  : Boolean ;
  
  public shipaddressbook  : Boolean ;
  public hideaddrbook : Boolean = false;
  public showaddress  : Boolean = true;
  public showshipping : Boolean = false;
  public showpayment  : Boolean = false;

  public showaddress_isTrue  : Boolean = true;
  public showshipping_isTrue : Boolean = false;
  public showpayment_isTrue  : Boolean = false;

  result
  emailid: any;
  userLoginData:any;
  billAdd_countrycode:any;
  shipAdd_countrycode:any;
  billAddr_email:any;

  billingData=[];
  shipingData=[];
  shipping_method_data=[];
  notesData=[];
  pay_methods=[];
  defaultpaymmethod:number;
  country:any;
  public oderId:any;
  ship_methods=[];
  customer_shipping_method:any;
  public shipping_method_name:any;
  public customer_shipping_method_name:any;
  shipmethod=[];
  cemail:any;
  custaddr=[];
  subscription:any;
  results :any;
  public cid:any;
  CustomerOrderId :any;
  billing_password :any;
  public displayshipping  : Boolean;
  customercurrncy:any;
  cust_currency:any;
  reqCss: boolean = false;
  couponInvalid: boolean = false;
  priceRangeInvalid: boolean = false;
  alreadyused: boolean = false;
  public couponcode:any;
  shouldShow: boolean = false;
  orderamount:any;
  signin:any;
  nopass:any;
  validemail:any;
  billing_conutryname:any;
  shiping_conutryname:any;


  constructor(private checkout: CheckoutService,private routers: Router, private homeservice: HomeService,private cartservice : CartService) { }

  ngOnInit() {

    setTimeout( ()=> { $('.cartLoader').hide(); },1500 );
	
      this.billAdd_countrycode=0;
      this.shipAdd_countrycode=0;
      this.billing_password ='';
      this.sameasbilling = 0;
      this.sagepay=true;
      this.showaddress_isTrue =true;
	  
	  this.cemail = localStorage.getItem('cemail');
		if(this.cemail){
			this.userloggedin = true;
			//this.billAddr_email = this.cemail;
			this.hideaddrbook = true;
		}else{
			this.userloggedin = false;
			this.hideaddrbook = false;
		}
    
  this.getCustomerbillandshippingAddr();
	  
	  let tokenid = localStorage.getItem('tokenid');
	  let tokenkey = localStorage.getItem('tokenkey');
	  
      let para = '?tokenid='+tokenid+'&tokenkey='+tokenkey;
      this.homeservice.getcartItems(para).subscribe( (response) => { this.results = response;  });

      this.subscription = this.cartservice.cartDetailForHeaderObservable$.subscribe(
        res => { this.results = res;  });
      let para3 = '?tokenid='+tokenid+'&tokenkey='+tokenkey;
     
      this.checkout.getCustomerOrderId(para3).subscribe(res=>{ this.CustomerOrderId = res.orderid; 
      if(!res.orderid){
        console.clear();
        this.routers.navigate(['/cart.html']);
      }else{

        let para = '?orderId='+res.orderId+'&tokenkey='+tokenkey;
        this.checkout.checkOrderNotes(para).subscribe( (response) => { this.notesData = response.notes; })
            }
      });
     
     
      this.subscription = this.homeservice.currencyObservable$.subscribe(
        res => {  this.customercurrncy = res;
        var newwe = this.customercurrncy.customer_currency;
         this.cust_currency = JSON.parse(this.customercurrncy.customer_currency);
      });

      this.country = this.checkout.countryList();
      this.isLoggedin();
	  
		  setTimeout(CraftyClick(),1000);
		  //setTimeout(secondCraftyClick(),1000);
     }

	toggle(){
		this.show = !this.show;
	}
  
	sameAddress(){
		if($("#sameasbillingcheck").is(":checked")){
			var sameasbillingcheck = 1;
		}else{
			var sameasbillingcheck = 0;
		}
		
		let tokenid = localStorage.getItem('tokenid');
		let tokenkey = localStorage.getItem('tokenkey');
		let para = '?tokenid='+tokenid+'&tokenkey='+tokenkey;
		let url = para+'&sameasbilling='+sameasbillingcheck;
	
		this.checkout.updateShippingaddrAsBillingService(url).subscribe( (response) => { response;
			if(response){
				 this.getOrderDetails();
			}
		})
	}

  display_password(){
    this.chkd_password = !this.chkd_password;
  }

  AbordonecartOrder(){
    let tokenid = localStorage.getItem('tokenid');
    let tokenkey = localStorage.getItem('tokenkey');
    let url = '?tokenid='+tokenid+'&tokenkey='+tokenkey;
    this.checkout.abandoned_carts(url).subscribe( res => {  res;  })
  }
  
  onBlurMethod(e){

   $(".errs2").remove();

  this.emailid = e.target.value; 
  let tokenid = localStorage.getItem('tokenid');
  let tokenkey = localStorage.getItem('tokenkey');
   

   let para = '?email='+this.emailid+'&tokenid='+tokenid+'&tokenkey='+tokenkey;
   function validateEmail(email) {
           
   var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

   if (filter.test(email)) {
        return true;
    }
    else {
        return false;
    }

  }​  
	if(this.emailid.length>0){
		if (validateEmail(this.emailid)) {
			this.checkout.checkExistorNot(para).
			subscribe(
				(response) => {
					this.signin = response.signin;
					this.nopass = response.nopass;
					this.validemail = response.validemail;
				}
			);
			$(".billAdd_email").css({"border": "1px solid #98999b"});
		}else{
			$(".billAdd_email").css({"border": "2px solid red"}).after("<div class='errs2' style='color: red;font-size:13px;'>Not an email address!</div>");
		}
	}
  }

  chooseShipping(){

    $('.cartLoader').show();
	
       var valid = true;
       $(".errs2").remove();
     
        $('.chkout_error').each(function(e) {
          if($.trim($(this).val())==''){
            $(this).css({"border": "2px solid red"}).after("<div class='errs2' style='color: red;font-size:13px;'>Field is required!</div>");
            valid = false;
          }else{
            $(this).css({"border": "1px solid #98999b"});
          }
        });

          $('.chkout_error').bind('keyup change', function() {
            $(this).next(".errs2").remove();
            if($.trim($(this).val()) ==''){
              valid = false;
             
              $(this).css({"border": "2px solid red"}).after("<div class='errs2' style='color: red;font-size:13px;'>Field is required!</div>");
            
            }else{
              $(this).css({"border": "1px solid #98999b"});
              }
          
          })
        	
          function validateEmail(sEmail) {
           
            var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            if (filter.test(sEmail)) {
                return true;
             }
             else {
                 return false;
             }
        }​  
        
        if(valid === true){

          let userid =          $("#current_user_id").val();
          let b_fname =         $(".billAdd_firstname").val();
          let b_lname =         $(".billAdd_lastname").val();
          let b_addr1 =         $(".billAdd_address1").val();
          let b_addr2 =         $(".billAdd_address2").val();
          let b_city =          $(".billAdd_city").val();
          let b_postcode =      $(".billAdd_postcode").val();
          let b_countrycode =   $(".billAdd_country").val();
          let b_phone =         $(".billAdd_phone").val();
          let b_email =         $(".billAdd_email").val();
          let s_fname =         $(".shipAdd_firstname").val();
          let s_lname =         $(".shipAdd_lastname").val();
          let s_addr1 =         $(".shipAdd_address1").val();
          let s_addr2 =         $(".shipAdd_address2").val();
          let s_city =          $(".shipAdd_city").val();
          let s_postcode =      $(".shipAdd_postcode").val();
          let s_countrycode =   $(".shipAdd_country").val();
          let lateraccount =    $(".lateraccount").val();
          let s_phone =         $(".shipAdd_phone").val();
          let b_password =      $(".billing_password").val();
		      let billing_addr_idh =  $("#cust_addr_book_billing_id").val();
		      let shipping_addr_idh =  $("#cust_addr_book_shipping_id").val();
		  
          var pass = '';
          if(b_password!=undefined && b_password!='' && b_password!='undefined'){
              pass = b_password;
          
          }else{
              pass = '';
          }
          let tokenid = localStorage.getItem('tokenid');
          let tokenkey = localStorage.getItem('tokenkey');
		  		  
		  let param = {
						tokenid: tokenid,
						tokenkey: tokenkey,
						billing_addr_idh: billing_addr_idh,
						bill_fname: b_fname,
						bill_lname: b_lname,
						bill_addr1: b_addr1,
						bill_addr2: b_addr2,
						bill_city: b_city,
						bill_postcode: b_postcode,
						bill_countrycode: b_countrycode,
						bill_phone: b_phone,
						bill_email: b_email,
						bill_password: pass,
						shipping_addr_idh: shipping_addr_idh,
						ship_fname: s_fname,
						ship_lname: s_lname,
						ship_addr1: s_addr1,
						ship_addr2: s_addr2,
						ship_city: s_city,
						ship_postcode: s_postcode,
						ship_countrycode: s_countrycode,
						ship_phone: s_phone,
						sameasbilling: this.sameasbilling
					}
     		
			if (validateEmail(b_email)) {
					  this.showshipping_isTrue = true;
           this.checkout.updateBillingShippingAddr(param)
           .subscribe(
						  (response) => {
							
							if(response.useremail)
								this.billAddr_email = response.useremail.email;
							
							this.billingData = response.billing;
							
							if(response.billing)
								this.billAdd_countrycode = response.billing.country_id;
							
							this.shipingData = response.shipping;
							
							this.sameasbilling = response.orderDetails.same_as_billing;
							
							
							if(response.shipping)
								this.shipAdd_countrycode= response.shipping.country_id;
							
							if(response.allAddress)
								this.custaddr = response.allAddress
							
							this.showshipping = true;
							
							this.showaddress = false;
							
              this.checkout.shippingMethods(para)
              .subscribe( (response) => { this.ship_methods = response.shipping_method; this.defaultshipid = response.defaultshipid;  });
							this.getOrderDetails();
                $('.cartLoader').hide(); },
                

						   (error: Response) => console.log(error)
					    );
					  
						let tokenid = localStorage.getItem('tokenid');
          	let tokenkey = localStorage.getItem('tokenkey');
						let para = '?tokenid='+tokenid+'&tokenkey='+tokenkey;
                  		
						
              }else{
                 $(".billAdd_email").css({"border": "2px solid red"}).after("<div class='errs2' style='color: red;font-size:13px;'>Not an email address!</div>");
                }
        }else{
         // console.log('false');
        }
   }
   
   select_addr(){ 
   		if(this.showaddress_isTrue){
			this.addressSeleted();
		}
   }
   
   select_ship(){
     if(this.showaddress_isTrue && this.showshipping_isTrue){
			this.shippingSeleted();
		}
		
   }
   
   select_pay(){
   		if(this.showaddress_isTrue && this.showshipping_isTrue && this.showpayment_isTrue){
			this.paymentSeleted();
		}
   }

   addressSeleted(){

    this.showaddress= true;
    this.showshipping = false;
    this.showpayment = false;

    setTimeout( ()=> { $('.cartLoader').hide(); },1500 );
   }

	shippingSeleted(){
	
		$('.cartLoader').show();
		
		setTimeout( ()=> { $('.cartLoader').hide(); },1500 );
		
		this.showaddress= false;
		this.showshipping = true;
		this.showshipping_isTrue = true;
		this.showpayment = false;
		this.getOrderDetails();
	
	}

  
	paymentSeleted(){
		$('.cartLoader').show();
		this.showaddress= false;
		this.showshipping = false;
		this.showpayment_isTrue = true;
		this.showpayment = true;
		
		let tokenid = localStorage.getItem('tokenid');
		let tokenkey = localStorage.getItem('tokenkey');
		let para = '?tokenid='+tokenid+'&tokenkey='+tokenkey;
		
		this.getShippingValue($('input[name="shipping_method_name"]:checked').val(),$('input[name="shipping_method_name"]:checked').attr("methonam"));
		
		this.checkout.paymentMethods(para).subscribe( (response) => {
			this.pay_methods = response.payment_method;
			this.defaultpaymmethod = response.defaultpaymmethod;
			this.paymentMethodType(this.defaultpaymmethod);
			this.getOrderDetails();
			$('.cartLoader').hide();
		});
		
	}

   customer_note(e){
     let note = e.target.value;
      let tokenkey = localStorage.getItem('tokenkey');
      let para = '?note='+note+'&tokenkey='+tokenkey;

      this.checkout.updateNotes(para).
      subscribe(
        (response) => {this.getOrderDetails(); },
        (error: Response) => console.log(error)
        )
     
    }

  show_hide_list(){
      this.showhideorderlist = !this.showhideorderlist;
  }

paymentMethodType(type){
	switch (type) {
		case 1:
			this.bankTransfer=false;
			this.paypal=false;
			this.accountTransfer=false;
			this.sagepay=true;
			break;
		
		case 2:
			this.bankTransfer=false;
			this.paypal=true;
			this.accountTransfer=false;
			this.sagepay=false;
			break;
		
		case 3:
			this.accountTransfer=false;
			this.paypal=false;
			this.bankTransfer=true;
			this.sagepay=false;
			break;
		
		case 4:
			this.accountTransfer=true;
			this.paypal=false;
			this.bankTransfer=false;
			this.sagepay=false;
			break;
	}
	
	let tokenid = localStorage.getItem('tokenid');
	let tokenkey = localStorage.getItem('tokenkey');
	let para = '?tokenid='+tokenid+'&tokenkey='+tokenkey+'&payment_id='+type;
	this.checkout.updatePaymentMethods(para).subscribe( (response) => { this.getOrderDetails();} )
}

getShippingValue(ship_id,shipp_name){

	this.customer_shipping_method_name = shipp_name;
	
	let tokenkey = localStorage.getItem('tokenkey');
	let para3 = '?shipping_id='+ship_id+'&shipping_method_name='+shipp_name+'&tokenkey='+tokenkey;
	this.checkout.updateShippingMethod(para3).subscribe( (response) => { this.shipmethod = response; this.getOrderDetails();} )

}
  
call_shipping_method_data(){

  let tokenkey = localStorage.getItem('tokenkey');
  var attr_val = $(".shipping_method_name:checked").val();
 
  var attr_name = $(".shipping_method_name:checked").attr('methonam');
  if(attr_val === 'on'){ attr_val = this.shipping_method_name;}
  let para3 = '?shipping_id='+attr_val+'&shipping_method_name='+attr_name+'&tokenkey='+tokenkey;
  if(attr_val!=undefined && attr_name!=undefined ){
  		
    this.checkout.updateShippingMethod(para3).subscribe( (response) => { this.shipmethod = response; } )
  }
  $('#method'+attr_val).prop('checked', true); // Unchecks it
 }

isLoggedin() {
    if(localStorage.getItem("cemail")){
      var myObj = localStorage.getItem("cemail");
    if(myObj!='' && myObj!=undefined && myObj!=null) {
        this.cemail = myObj;
     return true;
    }else{
      return false;
    }
    }else{
    return false;
    }

  } 
  
   logout() {

     localStorage.removeItem('cemail');
     localStorage.removeItem('cname');
     localStorage.removeItem('cid');
     localStorage.removeItem('token');
    
     this.closepopup = true;
     this.isLoggedin();
     this.routers.navigate(['/']);
  }
  
  selectedCustbilladdr(addrid){
    
    $('.loader').css('display','block');
	
    setTimeout(()=>{    
      $(".dialog__close-btn").trigger('click');
      $('.loader').css('display','none');
     },1500);
    
	let tokenid = localStorage.getItem('tokenid');
	let tokenkey = localStorage.getItem('tokenkey');
	let para = '?tokenid='+tokenid+'&tokenkey='+tokenkey;
	  
    this.routers.navigate(['checkout.html']);
    let url = para+'&addrid='+addrid;
    this.checkout.updatebillingaddr(url).subscribe( (response) => { response;
    if(response){
         this.getOrderDetails();
    }
    
    })
  }

  selectedCustshipaddr(addrid){
    $('.loader').css('display','block');
    setTimeout(()=>{    
     $(".dialog__close-btn").trigger('click');
      $('.loader').css('display','none');
     },1500);
    
    this.routers.navigate(['checkout.html']);
	
	let tokenid = localStorage.getItem('tokenid');
	let tokenkey = localStorage.getItem('tokenkey');
	let para = '?tokenid='+tokenid+'&tokenkey='+tokenkey;
	
    let url = para+'&addrid='+addrid;

    this.checkout.updateshippingaddr(url).subscribe( (response) => { response; 
     if(response){
         this.getOrderDetails();
    }
    } )
  }

getOrderDetails(){
	let tokenid = localStorage.getItem('tokenid');
	let tokenkey = localStorage.getItem('tokenkey');
	let param = '?tokenid='+tokenid+'&tokenkey='+tokenkey;
	
	this.checkout.getOrderDetailsService(param).subscribe( (response) => {

		this.billingData = response.billing;
		if(response.useremail)
			this.billAddr_email = response.useremail.email;
			
		if(response.billing)
			this.billAdd_countrycode = response.billing.country_id;
		
		this.shipingData = response.shipping;
		
		this.sameasbilling = response.orderDetails.same_as_billing;
		
		
		if(response.shipping)
      this.shipAdd_countrycode= response.shipping.country_id;
    
			
		if(response.useremail)
			this.emailid = response.useremail.email;
		
		if(response.allAddress)
			this.custaddr = response.allAddress
			
     this.notesData = response.orderDetails.notes;
   // this.billing_conutryname = response.billing_country;
   
   //  this.shiping_conutryname= response.shiping_country;
		
    })
}

getCustomerbillandshippingAddr(){

	let tokenid = localStorage.getItem('tokenid');
	let tokenkey = localStorage.getItem('tokenkey');
	let param = '?tokenid='+tokenid+'&tokenkey='+tokenkey;
	
	//this.checkout.gettingCustomeraddr(param).subscribe( (response) => { this.custaddr = response.data; console.log(this.custaddr); });
	
	this.checkout.getCustBillingandShippingaddr(param).subscribe( (response) => {

    this.billingData = response.billing;
    console.log(response);
		if(response.useremail)
			this.billAddr_email = response.useremail.email;
			
		if(response.billing)
			this.billAdd_countrycode = response.billing.country_id;
		
    this.shipingData = response.shipping;
    
		
		this.sameasbilling = response.orderDetails.same_as_billing;
		
		if(response.shipping)
			this.shipAdd_countrycode= response.shipping.country_id;
			
		if(response.useremail)
			this.emailid = response.useremail.email;
		
		if(response.allAddress)
			this.custaddr = response.allAddress
		
		let tokenid = localStorage.getItem('tokenid');
		let tokenkey = localStorage.getItem('tokenkey');
		let parae = '?email='+this.emailid+'&tokenid='+tokenid+'&tokenkey='+tokenkey;
		this.checkout.checkExistorNot(parae).
		subscribe(
			(response) => {
				this.signin = response.signin;
				this.nopass = response.nopass;
				this.validemail = response.validemail;
			}
		);
    })
    
}


getcustomerNotes(orderid){
  
  let tokenkey = localStorage.getItem('tokenkey');
  let para = '?orderId='+orderid+'&tokenkey='+tokenkey;
  this.checkout.checkOrderNotes(para).subscribe( (response) => { this.notesData = response.notes; 
     } )
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


couponCode() {
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
          this.alreadyused = false;
				}else if(response.statusCode==200){
					this.couponInvalid = false;
					this.shouldShow = false;
					this.reqCss = false;
          this.priceRangeInvalid = false;
          this.alreadyused = false;
				}else if(response.statusCode==411){
					this.couponInvalid = false;
					this.priceRangeInvalid = true;
					this.shouldShow = true
					this.orderamount = response.maxprice;
          this.reqCss = false;
          this.alreadyused = false;
        }else if(response.statusCode== 406){
					this.couponInvalid = false;
					this.priceRangeInvalid = false;
          this.shouldShow = true;
          this.alreadyused = true;
					this.reqCss = false;
        }
        
				$('.cartLoader').hide();
			 });


			this.cartservice.getcartItems(para).subscribe( (response) => { this.results = response;});

		}else{
      
				this.reqCss = true;
				this.shouldShow = true;
				this.couponInvalid = false;
				this.priceRangeInvalid = false;
		}	
}

	subscribeNewsLetter(){
	  var status: number;
	  var isChecked = $(".subscribe_newsletter").is(":checked");
	  if (isChecked) {
		  status = 1;
	  } else {
		  status = 0;
	  }
	  
		let tokenid = localStorage.getItem('tokenid');
		let tokenkey = localStorage.getItem('tokenkey');

		let para = '?tokenid='+tokenid+'&tokenkey='+tokenkey+'&status='+status;
		this.checkout.newsletterSubscribe(para).subscribe((response) => { response;});
	
  }
	
}