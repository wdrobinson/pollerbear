import { Component, OnInit, Directive, Inject } 		from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { AngularFire, FirebaseObjectObservable, FirebaseApp } from 'angularfire2';
import 'rxjs/add/operator/take';
import { Subscription } from 'rxjs';
import * as firebase from 'firebase';

import { Poll } 					from '../models/poll.model';
import { Option } 					from '../models/option.model';
import { Vote } 					from '../models/vote.model';
import { AuthService } 				from '../services/auth.service';

@Component({
	moduleId: module.id,
	templateUrl: 'vote.template.html'
})

export class VoteComponent implements OnInit {
	poll = new Poll();
	winner: number;
	votes = new Array<Vote>();
	loading = true;
	invalid = false;
	voted = false;

	constructor(
	  private af: AngularFire,
	  private route: ActivatedRoute,
	  private router: Router,
	  private authService: AuthService,
	  @Inject(FirebaseApp) private firebaseApp: firebase.app.App
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((params: Params) => this.urlChange(params));
	}

	urlChange(params: Params): void {
		//hack to fix typescript compilation error: Property 'take' does not exist on type 'FirebaseListObservable'
		var fbObservable: any = this.af.database.object(`/polls/${params['url']}`);
		fbObservable.take(1).subscribe((poll: Poll) => this.loadPoll(poll));
	}

	loadPoll(poll: Poll): void {
		if (!poll.$exists()) {
			this.loading = false;
			this.invalid = true;
			return;
		}
		this.poll = poll;
		this.poll.options = this.shuffleArray(this.poll.options);
		this.checkVoted();
	}

	shuffleArray(array: Array<any>): Array<any> {
        for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
        }		
		return array;
	}

	prepareSaveVote(): void {
		this.loading = true;
		if (this.poll.type === 1) {
			for (var i = 0; i < this.poll.options.length; i++) {
				var option = this.poll.options[i];
				var vote = new Vote();
				vote.id = option.id;
				vote.majorityPoints = (i === 0) ? 1 : 0
				vote.rankPoints = this.poll.options.length - i;
				this.votes.push(vote);
			}
		}		
		if (this.poll.type === 2) {
			for (var option of this.poll.options) {
				var vote = new Vote();
				vote.id = option.id;
				if (vote.id === this.winner) {
					vote.majorityPoints = 1;
					vote.rankPoints = 0;
				} else {
					vote.majorityPoints = 0;
					vote.rankPoints = 0;
				}
				this.votes.push(vote);
			}
		}
		this.saveVote();
	}

	saveVote(): void {
		this.firebaseApp.database().ref(`/polls/${this.poll.$key}`).transaction((poll: Poll) => {
			if (poll) {
				poll.votes++;
				for (var option of poll.options) {
					for (var vote of this.votes) {
						if (vote.id === option.id) {
							option.majorityPoints += vote.majorityPoints;
							option.rankPoints += vote.rankPoints;
							break;
						}
					}
				}
			}
			return poll;
		}).then( () => {
			this.updateVoteTable();
		}).catch((error: Error) => {
			this.loading = false;
			if (error.message === 'permission_denied') {
				this.voted = true;
			} else {
				console.log(error);
			}
		});
	}

	updateVoteTable(): void {
		this.af.database.object(`/users/${this.authService.user.uid}/votes/${this.poll.$key}`).set(this.votes).then(() => {
			this.loading = false;
			this.router.navigate([`/results/${this.poll.$key}`]);
		});
	}

	checkVoted(): void {
		//hack to fix typescript compilation error: Property 'take' does not exist on type 'FirebaseListObservable'
		var fbObservable: any = this.af.database.object(`/users/${this.authService.user.uid}/votes/${this.poll.$key}`);
		fbObservable.take(1).subscribe((obj: any) => {			
			if (obj.$exists()) {
				this.voted = true;	
			}
		}, null, () => {
			this.loading = false;
		});
	}
}