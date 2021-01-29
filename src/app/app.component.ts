import { Component, QueryList, ViewChildren } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';

import { RestaurantsService } from './restaurants.service';
import { NgbdSortableHeader, SortEvent } from './sortable.directive';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  restaurants$: Observable<any>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public restaurantsService: RestaurantsService) {
    this.restaurants$ = restaurantsService.restaurants$;
    this.total$ = restaurantsService.total$;
    restaurantsService.getRestaurants().subscribe((res) => {
      console.log(res);
    });
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.restaurantsService.sortColumn = column;
    this.restaurantsService.sortDirection = direction;
  }
}
