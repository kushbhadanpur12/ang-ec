import { Component, OnInit } from '@angular/core';
import { HomeService } from "../home.service";
import { Employee } from "./Employee.model";
import { Category } from "./Category.model";
import { RegistrationService } from '../services/registration.service';
import {RouterModule, Routes, Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  postsArray: Employee[];
  catArray: Category[];
  operate_as_id : any;
  cid : any;
  
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private homeService: HomeService, private register: RegistrationService) { }

ngOnInit() {
	
	let paramsString = window.location.search;
	let searchParams = new URLSearchParams(paramsString);
	if(searchParams.has("operate_as_id")){
		this.operate_as_id = searchParams.get("operate_as_id");
		this.cid = searchParams.get("cid");
		this.homeService.operateCustomer(this.operate_as_id,this.cid)
		  .subscribe(
			  resultArray => {
			  	console.log(resultArray);
				let senddata = {
				  	token:resultArray.access_token
				  }
			  	localStorage.setItem('token',resultArray.access_token);
				this.register.customerLoginWithToken(senddata).subscribe( (final_response) => { final_response; 
			 
					   let fnaew = final_response;
					   let c_id  = fnaew.id;
					   let c_email =  fnaew.email;
					   let cfname =  fnaew.fname;
					 
					   localStorage.setItem('cname',cfname);
					   localStorage.setItem('cid',c_id);
					   localStorage.setItem('cemail',c_email);
					   
		
					   let tokenid = localStorage.getItem('tokenid');
					   let tokenkey = localStorage.getItem('tokenkey');
					  
						if((tokenid!=null && tokenid!=undefined) && (tokenkey!=null && tokenkey!=undefined))
						 {
							  let req = {
								  userId:c_id,
								  tokenid:tokenid,
								  tokenkey:tokenkey
								}
							  this.register.updateUserIdSessiontbl(req).subscribe( (res) => { res; });
						 }
						
				  });
			}
		  );
		  
	}

  this.homeService.fetchData()
  .subscribe(
      resultArray => this.postsArray = resultArray,
      error => console.log("Error :: " + error)
  );

  /*this.homeService.allCategoryData()
  .subscribe(
      resultArray => this.catArray = resultArray,
      error => console.log("Error :: " + error)
  );*/
  
}

}