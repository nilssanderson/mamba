import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';
import './rxjs-extensions';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

// components
import { AppComponent }  from './app.component';
import { OtherComponent }  from './other/other.component';
import { HeroesComponent }  from './hero/heroes.component';
import { HeroDetailComponent }  from './hero/hero-detail.component';
import { DashboardComponent }  from './dashboard/dashboard.component';

// routing
import { AppRouterModule }  from './app-routing.module';

// services
import { HeroService }  from './hero/hero.service';
import { HeroSearchComponent }  from './hero/hero-search.component';

@NgModule({
  declarations: [
    AppComponent,
    OtherComponent,
    HeroesComponent,
    HeroDetailComponent,
    DashboardComponent,
    HeroSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRouterModule
  ],
  // we have to teach the injector how to make a HeroService by registering a HeroService provider.
  // the providers array tells Angular to create a fresh instance of the HeroService when it creates a new AppComponent.
  // the AppComponent can use that service to get heroes and so can every child component of its component tree.
  providers: [ HeroService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
