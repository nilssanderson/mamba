import { NgModule } from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

// components
import { HeroesComponent }  from './hero/heroes.component';
import { HeroDetailComponent }  from './hero/hero-detail.component';
import { DashboardComponent }  from './dashboard/dashboard.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    {
        // path: the router matches this route's path to the URL in the browser address bar (heroes).
        // component: the component that the router should create when navigating to this route (HeroesComponent).
        path: 'heroes',
        component: HeroesComponent
    },
    { path: 'detail/:id', component: HeroDetailComponent },
    { path: 'dashboard', component: DashboardComponent }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRouterModule { }
