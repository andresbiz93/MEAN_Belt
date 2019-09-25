import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.css']
})
export class EditRestaurantComponent implements OnInit {
  //@Output() childEvent = new EventEmitter();
  errors = false;
  errors_to_show = [];
  restaurant_to_show = null;
  restaurant_id;

  constructor(private _httpService : HttpService, private _route : ActivatedRoute, private _router : Router) { }

  ngOnInit() {
    this.restaurant_id = this._route.params.subscribe(params => {
      this.restaurant_id = params.id;
      console.log("Getting restaurant info", this.restaurant_id);
      this.getRestaurantFromService();
    })
  }

  getRestaurantFromService(){
    let observable = this._httpService.getOneRestaurant(this.restaurant_id);
    observable.subscribe(data => {
      if("errors" in data){
        console.log("ERRORS", data);
      }
      else{
        this.restaurant_to_show = data;
      }
    });
  }

  updateRestaurantToService(){
    console.log("UPDATING RESTAURANT", this.restaurant_to_show._id);
    let observable = this._httpService.updateRestaurant(this.restaurant_to_show._id, this.restaurant_to_show);
    observable.subscribe(data => {
      if("errors" in data){
        console.log("EDIT ERRORS", data);
        this.errors = true;
        if("name" in data["errors"]){
          this.errors_to_show.push("The restaurant name must be at least 3 characters long.");
        }
        if("cuisine" in data["errors"]){
          this.errors_to_show.push("The cuisine name must be at least 3 characters long.");
        }
      }
      else{
        console.log("EDIT SUCCESS", data);
        this.errors = false;
        this._router.navigate(['/restaurants']);
      }
    })
  }
}
