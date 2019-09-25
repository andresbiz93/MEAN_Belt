import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurantsComponent } from './restaurants/restaurants.component';
import { CreateRestaurantComponent } from './create-restaurant/create-restaurant.component';
import { EditRestaurantComponent } from './edit-restaurant/edit-restaurant.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { CreateReviewComponent } from './create-review/create-review.component';


const routes: Routes = [
  {path : "restaurants", component : RestaurantsComponent, children : [
    {path : ":id/edit", component : EditRestaurantComponent}
  ]},
  {path : "restaurants/new", component : CreateRestaurantComponent},
  {path : "restaurants/:id", component : ReviewsComponent},
  {path : "restaurants/:id/review", component : CreateReviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


