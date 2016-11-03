import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { CreatePollComponent }   from './create-poll/create-poll.component';

@NgModule({
  imports: [ 
  	BrowserModule, 
  	FormsModule 
  ],
  declarations: [ CreatePollComponent ],
  bootstrap:    [ CreatePollComponent ]
})

export class AppModule { }
