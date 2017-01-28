import { NgModule }      			from '@angular/core';
import { BrowserModule } 			from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }   			from '@angular/router';
import { HttpModule, JsonpModule } 	from '@angular/http';
import { NgbModule } 				from '@ng-bootstrap/ng-bootstrap';
import { ToasterModule } 			from 'angular2-toaster';
import { ChartsModule } 			from 'ng2-charts';

import { CoreModule}				from './core.module'
import { AppRoutingModule } 		from './app-routing.module';
import { NavBarComponent }   		from './navbar/navbar.component';
import { PollComponent }   			from './poll/poll.component';
import { CreateComponent }   	from './create/create.component';
import { AboutComponent }   		from './about/about.component';
import { PrivacyComponent }   		from './privacy/privacy.component';
import { VoteComponent }   			from './vote/vote.component';
import { ResultsComponent }   		from './results/results.component';
import { ManageComponent }   		from './manage/manage.component';

import { AuthService } 				from './services/auth.service';

import { SortableDirective } 		from './directives/sortable.directive';
import { ClipboardDirective } 		from './directives/clipboard.directive';

@NgModule({
  imports: [ 
  	BrowserModule, 
  	FormsModule,
  	ReactiveFormsModule,
  	AppRoutingModule,
  	HttpModule,
  	JsonpModule,
  	NgbModule.forRoot(),
  	ToasterModule,
  	CoreModule,
  	ChartsModule
  ],  
  declarations: [ PollComponent, CreateComponent, AboutComponent, PrivacyComponent, VoteComponent, NavBarComponent, SortableDirective, ResultsComponent, ClipboardDirective, ManageComponent ],
  providers: [ AuthService ],
  bootstrap:    [ PollComponent, NavBarComponent ]
})

export class AppModule { }
