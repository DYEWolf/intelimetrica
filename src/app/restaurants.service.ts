import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { textChangeRangeIsUnchanged } from 'typescript';

@Injectable({
  providedIn: 'root',
})
export class RestaurantsService {
  constructor(private http: HttpClient) {}

  getRestaurants() {
    return this.http.get(
      'https://recruiting-datasets.s3.us-east-2.amazonaws.com/data_melp.json'
    );
  }
}
