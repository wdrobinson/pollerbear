import { Component, OnInit, Directive, Inject } 		from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { AngularFire, FirebaseObjectObservable, FirebaseApp } from 'angularfire2';
import 'rxjs/add/operator/take'
import { Subscription } from 'rxjs';
import * as firebase from 'firebase';

import { Poll } 					from '../models/poll.model';
import { Option } 					from '../models/option.model';
import { AuthService } 				from '../services/auth.service';

@Component({
	moduleId: module.id,
	templateUrl: 'vote.template.html'
})

export class VoteComponent implements OnInit {
	poll = new Poll();
	winner: number;

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
		this.af.database.object(`/polls/${params['url']}`).take(1).subscribe((poll: Poll) => this.loadPoll(poll));
	}

	loadPoll(poll: Poll): void {		
		this.poll = poll;
		this.poll.options = this.shuffleArray(this.poll.options);
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
		if (this.poll.type === 1) {
			for (var i = 0; i < this.poll.options.length; i++) {
				var option = this.poll.options[i];
				option.majorityPoints = (i === 0) ? 1 : 0
				option.rankPoints = this.poll.options.length - i;
			}
		}		
		if (this.poll.type === 2) {
			for (var option of this.poll.options) {
				if (option.id === this.winner) {
					option.majorityPoints = 1;
					option.rankPoints = 0;
				} else {
					option.majorityPoints = 0;
					option.rankPoints = 0;
				}
			}
		}
		this.saveVote();
	}

	saveVote(): void {
		this.firebaseApp.database().ref(`/polls/${this.poll.$key}`).transaction((poll: Poll) => {
			if (poll) {
				poll.votes++;
				for (var option of poll.options) {
					for (var localOption of this.poll.options) {
						if (localOption.id === option.id) {
							option.majorityPoints += localOption.majorityPoints;
							option.rankPoints += localOption.rankPoints;
							break;
						}
					}
				}
			}
			return poll;
		}).then( () => {
			this.updateVoteTable();
		});
	}

	updateVoteTable(): void {
		var votes = this.af.database.object(`/users/${this.authService.user.uid}/votes/${this.poll.$key}`).set(this.poll.options);
	}

}

