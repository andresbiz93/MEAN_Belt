import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.css']
})
export class CreateReviewComponent implements OnInit {
  restaurant_id;
  restaurant_to_show = null;
  errors = false;
  errors_to_show = [];
  new_review = {author : "", content : "", stars : "", restaurant_id : ""};


  constructor(private _httpService : HttpService, private _route : ActivatedRoute, private _router : Router) { }

  ngOnInit() {
    this.restaurant_id = this._route.params.subscribe(params => {
      this.restaurant_id = params.id;
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
    })
  }

  postReviewToService(){
    this.new_review.restaurant_id = this.restaurant_to_show._id;
    console.log("SUBMITTING REVIEW", this.new_review);
    let observable = this._httpService.postReview(this.restaurant_to_show._id, this.new_review);
    observable.subscribe(data => {
      if("errors" in data){
        console.log("EDIT ERRORS", data);
        this.errors = true;
        if("author" in data["errors"]){
          this.errors_to_show.push("Your name must be at least 3 characters long.");
        }
        if("content" in data["errors"]){
          this.errors_to_show.push("The description must be at least 3 characters long.");
        }
        if("stars" in data["errors"]){
          this.errors_to_show.push("The star value must be between 1 and 5");
        }
      }
      else{
        console.log("REVIEW SUCCESS", data);
        this.errors = false;
        this._router.navigate(['/restaurants', this.restaurant_to_show._id]);
      }
    });
  }
}
