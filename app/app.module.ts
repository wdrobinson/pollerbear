import { NgModule }      			from '@angular/core';
import { BrowserModule } 			from '@angular/platform-browser';
import { FormsModule }   			from '@angular/forms';
import { RouterModule }   			from '@angular/router';
import { HttpModule, JsonpModule } 	from '@angular/http';
import { DndModule } 				from 'ng2-dnd';
import { NgbModule } 				from '@ng-bootstrap/ng-bootstrap';

import { CoreModule}				from './core.module'
import { AppRoutingModule } 		from './app-routing.module';
import { NavBarComponent }   		from './navbar/navbar.component';
import { PollComponent }   			from './poll/poll.component';
import { CreatePollComponent }   	from './create-poll/create-poll.component';
import { AboutComponent }   		from './about/about.component';
import { PrivacyComponent }   		from './privacy/privacy.component';
import { VoteComponent }   			from './vote/vote.component';

@NgModule({
  imports: [ 
  	BrowserModule, 
  	FormsModule,
  	AppRoutingModule,
  	HttpModule,
  	JsonpModule,
  	DndModule.forRoot(),
  	NgbModule.forRoot(),
  	CoreModule
  ],  
  declarations: [ PollComponent, CreatePollComponent, AboutComponent, PrivacyComponent, VoteComponent, NavBarComponent ],
  bootstrap:    [ PollComponent, NavBarComponent ]
})

export class AppModule { }
