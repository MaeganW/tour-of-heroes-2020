import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;

  // https://angular.io/tutorial/toh-pt6#the-searchterms-rxjs-subject
  // A Subject is both a source of observable values and an Observable itself.
  // You can subscribe to a Subject as you would any Observable.
  // You can also push values into that Observable by calling its next(value) method as the search() method does.
  // Every time the user types in the textbox, the binding calls search() with the textbox value, a "search term".
  // The searchTerms becomes an Observable emitting a steady stream of search terms.
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );

    // MORE INFO - https://angular.io/tutorial/toh-pt6#chaining-rxjs-operators
    // debounceTime(300) waits until the flow of new string events pauses for 300 milliseconds before passing
    // along the latest string. You'll never make requests more frequently than 300ms.
    // distinctUntilChanged() ensures that a request is sent only if the filter text changed.
    // switchMap() calls the search service for each search term that makes it through debounce() and
    // distinctUntilChanged(). It cancels and discards previous search observables, returning only the latest search service observable.
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

}
