import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http : HttpClient) { }

  getRestaurants(){
    return this._http.get("/get_restaurants");
  }

  postRestaurant(res){
    return this._http.post("/create_restaurant", res);
  }

  getOneRestaurant(id){
    return this._http.get("/get_restaurant/" + id);
  }

  updateRestaurant(id, restaurant){
    return this._http.put("/update_restaurant/" + id, restaurant);
  }

  getReviews(id){
    return this._http.get("/get_reviews/" + id);
  }

  postReview(id, review){
    return this._http.post("/post_review/" + id, review);
  }

  deleteRestaurant(id){
    return this._http.delete("/delete_restaurant/" + id);
  }

}
