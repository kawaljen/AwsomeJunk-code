import { NgModule, ApplicationRef }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule }    from '@angular/http';

import './rxjs.extensions';

import { AppComponent }        from './app.component';
import { PinDetailComponent } from './pin-detail/pin-detail.component';
import { PinsComponent }     from './pins/pins.component';
import { PinFormComponent }   from './pin-form/pin-form.component';
import { PinCommentsComponent }   from './pin-detail/pin-comments/pin-comments.component';

import { PinService }         from './pin.service';
import { CommentService }     from './comment.service';
//import { PinSearchService } from './pin-search.service';
//import { UserService }         from './pin-power.service';

import { AppRoutingModule }     from './app-routing.module';

import { AgmCoreModule } from 'angular2-google-maps/core';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA_sFkAeQHvKWZT4HGkumKO4tpg0hzg1e0'
    })
  ],
  declarations: [
    AppComponent,
    PinDetailComponent,
    PinsComponent,
    PinFormComponent,
    PinCommentsComponent
  ],
  providers: [ PinService, CommentService ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
