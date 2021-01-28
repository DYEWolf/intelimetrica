import { Component } from '@angular/core';
import { RestaurantsService } from './restaurants.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private restaurantsService: RestaurantsService) {
    this.restaurantsService.getRestaurants().subscribe((res) => {
      console.log(res);
    });
  }
}
