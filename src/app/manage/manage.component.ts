import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Subscription } from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/take';
import { ToasterService } from 'angular2-toaster';

import { Poll } from '../models/poll.model';
import { PollVotes } from '../models/poll-votes.model';
import { Option } from '../models/option.model';
import { AuthService } 		from '../services/auth.service';

@Component({
	moduleId: module.id,
	templateUrl: 'manage.template.html'
})

export class ManageComponent {

	polls: Poll[];

	constructor(private af: AngularFire, private authService: AuthService, private toasterService: ToasterService) {
		af.auth.subscribe(auth =>{
			if (auth) {
				this.loadPolls();	
			}
		});
	}

	loadPolls(): void {
		const queryObservable = this.af.database.list('/polls', {
		  query: {
		    orderByChild: 'uid',
		    equalTo: this.authService.user.uid
		  }
		}).take(1).subscribe((polls: Poll[]) => {
			this.polls = polls;
			for (let poll of polls) {
				this.af.database.object(`/poll-votes/${poll.$key}`).take(1).subscribe((pollVotes: PollVotes) => this.loadPollVotes(poll, pollVotes));
			}
		});		
	}

	loadPollVotes(poll: Poll, pollVotes: PollVotes): void {
		poll.votes = pollVotes.votes;
	}

}

