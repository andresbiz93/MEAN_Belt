import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  restaurant_to_show = null;
  restaurant_id;
  reviews : any = [];

  constructor(private _httpService : HttpService, private _route : ActivatedRoute) { }

  ngOnInit() {
    this.restaurant_id = this._route.params.subscribe(params => {
      this.restaurant_id = params.id;
      console.log("Getting restaurant info", this.restaurant_id);
      this.getReviewsFromService();
    })
  }

  getReviewsFromService(){
    let observable = this._httpService.getOneRestaurant(this.restaurant_id);
    observable.subscribe(data => {
      if("errors" in data){
        console.log("ERRORS", data);
      }
      else{
        this.restaurant_to_show = data;
        let observable2 = this._httpService.getReviews(this.restaurant_to_show._id);
        observable2.subscribe(reviews => {
          if("errors" in reviews){
            console.log("ERRORS", reviews);
          }
          else{
            console.log("REVIEWS DATA", reviews);
            this.reviews = reviews;
          }
        })
      }
    });
  }

}
