import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RestaurantsTableComponent } from './restaurants-table/restaurants-table.component';
import { NgbdSortableHeader } from './sortable.directive';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [AppComponent, RestaurantsTableComponent, NgbdSortableHeader, ModalComponent],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  providers: [DecimalPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
