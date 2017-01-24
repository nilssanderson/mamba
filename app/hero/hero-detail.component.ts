import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { Hero } from '../hero/hero';
import { HeroService } from '../hero/hero.service';

@Component({
  selector: 'my-hero-detail',
  templateUrl: 'app/hero/hero-detail.component.html',
  styleUrls: [ 'app/hero/hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {

  hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {

  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.heroService.getHero(+params['id']))
      .subscribe(hero => this.hero = hero);
  }

  // go back on step in the browser
  goBack(): void {
    this.location.back();
  }

  // save changes to the hero using the update method
  // navigate back one level on save
  save(): void {
    this.heroService.update(this.hero)
      .then(() => this.goBack());
  }

}