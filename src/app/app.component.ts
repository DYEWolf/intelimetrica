import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';

import { RestaurantsService } from './restaurants.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  restaurants$: Observable<any>;
  total$: Observable<number>;

  constructor(public restaurantsService: RestaurantsService) {
    this.restaurants$ = restaurantsService.restaurants$;
    this.total$ = restaurantsService.total$;
    restaurantsService.getRestaurants().subscribe((res) => {
      console.log(res);
    });
  }
}
