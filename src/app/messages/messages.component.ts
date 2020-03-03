import { Component, OnInit } from '@angular/core';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  // Angular only binds to public component properties - need in the html in this case
  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
  }

}
