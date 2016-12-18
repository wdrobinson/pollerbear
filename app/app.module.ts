import { NgModule }      			from '@angular/core';
import { BrowserModule } 			from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }   			from '@angular/router';
import { HttpModule, JsonpModule } 	from '@angular/http';
import { NgbModule } 				from '@ng-bootstrap/ng-bootstrap';
import { ClipboardModule }  		from 'angular2-clipboard';
import { ToasterModule } 			from 'angular2-toaster/angular2-toaster';
import { ChartsModule } 			from 'ng2-charts';

import { CoreModule}				from './core.module'
import { AppRoutingModule } 		from './app-routing.module';
import { NavBarComponent }   		from './navbar/navbar.component';
import { PollComponent }   			from './poll/poll.component';
import { CreatePollComponent }   	from './create-poll/create-poll.component';
import { AboutComponent }   		from './about/about.component';
import { PrivacyComponent }   		from './privacy/privacy.component';
import { VoteComponent }   			from './vote/vote.component';
import { ResultsComponent }   		from './results/results.component';
import { AuthService } 				from './services/auth.service';
import { SortableDirective } 		from './vote/sortable.directive';

@NgModule({
  imports: [ 
  	BrowserModule, 
  	FormsModule,
  	ReactiveFormsModule,
  	AppRoutingModule,
  	HttpModule,
  	JsonpModule,
  	NgbModule.forRoot(),
  	ClipboardModule,
  	ToasterModule,
  	CoreModule,
  	ChartsModule
  ],  
  declarations: [ PollComponent, CreatePollComponent, AboutComponent, PrivacyComponent, VoteComponent, NavBarComponent, SortableDirective, ResultsComponent ],
  providers: [ AuthService ],
  bootstrap:    [ PollComponent, NavBarComponent ]
})

export class AppModule { }
