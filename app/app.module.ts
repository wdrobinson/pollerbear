import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { PollComponent }   from './poll/poll.component';
import { CreatePollComponent }   from './create-poll/create-poll.component';
import { AboutComponent }   from './about/about.component';
import { PrivacyComponent }   from './privacy/privacy.component';

@NgModule({
  imports: [ 
  	BrowserModule, 
  	FormsModule,
  	AppRoutingModule
  ],  
  declarations: [ PollComponent, CreatePollComponent, AboutComponent, PrivacyComponent ],
  bootstrap:    [ PollComponent ]
})

export class AppModule { }
