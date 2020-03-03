import { Injectable } from '@angular/core';
import {HEROES} from './mock-heroes';
import {Hero} from './hero';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  // getHeros(): Hero[]{
  //   return HEROES;
  // }

  getHeros(): Observable<Hero[]>{
    return of(HEROES);
  }

  constructor() { }
}
