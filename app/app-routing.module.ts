import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { CreateComponent }   from './create/create.component';
import { AboutComponent }   from './about/about.component';
import { PrivacyComponent }   from './privacy/privacy.component';
import { ManageComponent }   from './manage/manage.component';
import { VoteComponent }   from './vote/vote.component';
import { ResultsComponent }   from './results/results.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'about', component: AboutComponent },    	
      { path: 'privacy', component: PrivacyComponent },    	
      { path: 'manage', component: ManageComponent },      
      { path: 'results/:url', component: ResultsComponent },    	
      { path: ':url', component: VoteComponent },    	
      { path: '**', component: CreateComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}