import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { CreatePollComponent }   from './create-poll/create-poll.component';
import { AboutComponent }   from './about/about.component';
import { PrivacyComponent }   from './privacy/privacy.component';
import { VoteComponent }   from './vote/vote.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'about', component: AboutComponent },    	
      { path: 'privacy', component: PrivacyComponent },    	
      { path: ':url', component: VoteComponent },    	
      { path: '**', component: CreatePollComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}