import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  restaurants : any = [];


  constructor(private _httpService : HttpService) { }

  ngOnInit() {
    console.log("ENTERED ALL RESTAURANTS");
    this.getAllRestaurantsFromService();
  }

  getAllRestaurantsFromService(){
    console.log("ENTERED GET RESTAURANTS");
    let observable = this._httpService.getRestaurants();
    observable.subscribe(data => {
      console.log("RESTAURANTS DATA", data);
      var placeholder : any[] = [];
      var date = new Date(Date.now());

      console.log("CURRENT DATE", date);
      placeholder = data;

      for(var i = 0; i < placeholder.length; i++){
        var dateStr = placeholder[i].createdAt;
        var restDate = new Date(dateStr);
        console.log(date, "minus", restDate, "=", (date.getTime() - restDate.getTime())/1000);
        if((date.getTime() - restDate.getTime())/1000 >= 30.000){
          placeholder[i].deletable = false;
        }
        else{
          placeholder[i].deletable = true;
        }
      }
      console.log("POST TIME", placeholder);
      this.restaurants = placeholder;
    })
  }

  deleteRestaurantFromService(id){
    console.log("DELETING RESTAURANT");
    let observable = this._httpService.deleteRestaurant(id);
    observable.subscribe(data => {
      console.log("DELETE RESULT", data);
      this.getAllRestaurantsFromService();
    })
  }

}
