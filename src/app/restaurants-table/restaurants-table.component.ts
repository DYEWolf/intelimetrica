import {
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { NgbdSortableHeader, SortEvent } from '../sortable.directive';
import { RestaurantsService } from '../restaurants.service';

@Component({
  selector: 'app-restaurants-table',
  templateUrl: './restaurants-table.component.html',
  styleUrls: ['./restaurants-table.component.css'],
})
export class RestaurantsTableComponent implements OnInit {
  @Input() restaurantsData;
  @Input() total;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public restaurantsService: RestaurantsService) {}

  ngOnInit(): void {}

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
