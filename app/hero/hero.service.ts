import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Hero } from '../hero/hero';

@Injectable()
export class HeroService  {

    private heroesUrl = 'api/heroes'; // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'}); // identify the body content type (application/json)

    constructor(private http: Http) {}

    getHeroes(): Promise<Hero[]> {

        return this.http.get(this.heroesUrl)
                .toPromise()
                // call the json method of the HTTP Response to extract the data within the response.
                .then(response => response.json().data as Hero[]) // hero array response
                // critical step! We must anticipate HTTP failures
                // as they happen frequently for reasons beyond our control.
                .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only, we should do better for a real app
        // return a user friendly form of the error to the caller in a rejected promise
        // so that the caller can display a proper error message to the user.
        return Promise.reject(error.message || error);
    }

    getHero(id: number): Promise<Hero> {
        
        // URL identifies which hero the server should update by encoding the hero id
        // into the URL to match the api/hero/:id pattern.
        const url = `${this.heroesUrl}/${id}`;

        return this.http.get(url)
                .toPromise()
                .then(response => response.json().data as Hero) // single hero response
                .catch(this.handleError);
    }

    update(hero: Hero): Promise<Hero> {

        // identify which hero the server should update by encoding the hero id in the URL
        const url = `${this.heroesUrl}/${hero.id}`;

        return this.http
                // put body is the JSON string encoding of the hero, obtained by calling JSON.stringify
                .put(url, JSON.stringify(hero), {headers: this.headers})
                .toPromise()
                .then(() => hero)
                .catch(this.handleError);

    }

    create(name: string): Promise<Hero> {

        return this.http
                .post(this.heroesUrl, JSON.stringify({ name: name }), { headers: this.headers})
                .toPromise()
                .then(res => res.json().data)
                .catch(this.handleError);
    }

    delete(id: number): Promise<void> {

        const url = `${this.heroesUrl}/${id}`;

        return this.http
                .delete(url, {headers: this.headers})
                .toPromise()
                .then(() => null)
                .catch(this.handleError);
    }
}
