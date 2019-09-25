import { Component, OnInit, Output } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-create-restaurant',
  templateUrl: './create-restaurant.component.html',
  styleUrls: ['./create-restaurant.component.css']
})
export class CreateRestaurantComponent implements OnInit {
  @Output() childEvent = new EventEmitter();
  new_restaurant = {name : "", cuisine : ""};
  errors = false;
  errors_to_show = [];

  constructor(private _httpService : HttpService, private _router : Router) { }

  ngOnInit() {
    console.log("ENTERED CREATE RESTAURANT")
  }

  postRestaurantToService(){
    let observable = this._httpService.postRestaurant(this.new_restaurant);
    observable.subscribe(data => {
      console.log("CREATE DATA", data);
      if("errors" in data){
        console.log("CREATE ERRORS", data);
        this.errors = true;
        if("duplicate" in data["errors"]){
          this.errors_to_show.push("A restaurant with the same name already exists");
        }
        if("name" in data["errors"]){
          this.errors_to_show.push("The restaurant name must be at least 3 characters long.");
        }
        if("cuisine" in data["errors"]){
          this.errors_to_show.push("The cuisine name must be at least 3 characters long.");
        }
      }
      else{
        console.log("CREATE SUCCESS", data);
        this.errors = false;
        this._router.navigate(['/restaurants']);
      }
    });
  }

}
