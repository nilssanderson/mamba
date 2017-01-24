import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from '../hero/hero';

// serivces
import { HeroService } from '../hero/hero.service';

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/hero/heroes.component.html',
  styleUrls: [ 'app/hero/heroes.component.css' ]
})
export class HeroesComponent implements OnInit {
  // set a value using =
  // defining a type using :
  heroes: Hero[];
  selectedHero: Hero;

  constructor(
    private heroService: HeroService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  // get list of heroes
  getHeroes(): void {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes);
  }

  // select a hero
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  // go to heros detail
  goToDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  // add a new hero
  add(name: string): void {

    name = name.trim();

    // if given name is non-blank
    if (!name) { return; }

    // handler delegates creation of the named hero to the hero service,
    // and then adds the new hero to our array.
    this.heroService.create(name)
        .then(hero => {
          this.heroes.push(hero);
          this.selectedHero = null;
        })
  }

  // delete a hero
  delete(hero: Hero): void {
    
    this.heroService
        .delete(hero.id)
        .then(() => {
          this.heroes = this.heroes.filter(h => h !== hero);
          if (this.selectedHero === hero) {
            this.selectedHero = null;
          }
        })
  }
}
