import { Injectable } from '@angular/core';
import {HEROES} from './mock-heroes';
import {Hero} from './hero';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  // getHeros(): Hero[]{
  //   return HEROES;
  // }

  getHeros(): Observable<Hero[]>{
    this.messageService.addMessage('Hero Service: Fetched heroes');
    return of(HEROES);
  }

  constructor(private messageService: MessageService) { }
}
