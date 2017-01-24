import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero/hero';

// serivces
import { HeroService } from '../hero/hero.service';

@Component({
  // moduleId property to module.id for module-relative loading of the templateUrl
  // moduleId: module.id, // not working???
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard/dashboard.component.html',
  styleUrls: [ 'app/dashboard/dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1, 5));
  }
}
