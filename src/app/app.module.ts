import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RestaurantsTableComponent } from './restaurants-table/restaurants-table.component';
import { NgbdSortableHeader } from './sortable.directive';
import { CommonModule, DecimalPipe, CurrencyPipe } from '@angular/common';

@NgModule({
  declarations: [AppComponent, RestaurantsTableComponent, NgbdSortableHeader],
  imports: [BrowserModule, NgbModule, HttpClientModule],
  providers: [DecimalPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
