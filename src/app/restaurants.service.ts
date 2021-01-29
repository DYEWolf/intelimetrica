import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from './sortable.directive';

interface SearchResult {
  restaurants;
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) =>
  v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(restaurants, column: SortColumn, direction: string) {
  if (direction === '' || column === '') {
    return restaurants;
  } else {
    return [...restaurants].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(restaurant, term: string) {
  return restaurant.name.toLowerCase().includes(term.toLowerCase());
}

@Injectable({
  providedIn: 'root',
})
export class RestaurantsService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _restaurants$ = new BehaviorSubject<any>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 15,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
  };

  RESTAURANTS;

  constructor(private http: HttpClient, private pipe: DecimalPipe) {
    this.getRestaurants().subscribe((res) => {
      this.RESTAURANTS = res;

      this._search$
        .pipe(
          tap(() => this._loading$.next(true)),
          debounceTime(200),
          switchMap(() => this._search()),
          delay(200),
          tap(() => this._loading$.next(false))
        )
        .subscribe((result) => {
          this._restaurants$.next(result.restaurants);
          this._total$.next(result.total);
        });

      this._search$.next();
    });
  }

  get restaurants$() {
    return this._restaurants$.asObservable();
  }
  get total$() {
    return this._total$.asObservable();
  }
  get loading$() {
    return this._loading$.asObservable();
  }
  get page() {
    return this._state.page;
  }
  get pageSize() {
    return this._state.pageSize;
  }
  get searchTerm() {
    return this._state.searchTerm;
  }

  set page(page: number) {
    this._set({ page });
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }
  set sortColumn(sortColumn: SortColumn) {
    this._set({ sortColumn });
  }
  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {
      sortColumn,
      sortDirection,
      pageSize,
      page,
      searchTerm,
    } = this._state;

    let restaurants = sort(this.RESTAURANTS, sortColumn, sortDirection);

    restaurants = restaurants.filter((restaurant) =>
      matches(restaurant, searchTerm)
    );
    const total = restaurants.length;

    restaurants = restaurants.slice(
      (page - 1) * pageSize,
      (page - 1) * pageSize + pageSize
    );
    return of({ restaurants, total });
  }

  getRestaurants() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      }),
    };

    return this.http.get(
      'https://recruiting-datasets.s3.us-east-2.amazonaws.com/data_melp.json',
      httpOptions
    );
  }
}
