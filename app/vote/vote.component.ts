import { Component, OnInit, Directive, Inject } 		from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { AngularFire, FirebaseObjectObservable, FirebaseApp } from 'angularfire2';
import 'rxjs/add/operator/take'
import { Subscription } from 'rxjs';
import * as firebase from 'firebase';

import { Poll } 					from '../models/poll.model';
import { Option } 					from '../models/option.model';
import { MajorityVote } 			from '../models/majority-vote.model';
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
		console.log(this.poll);
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

	saveVote(): void {
		if (this.poll.type === 2) {
			this.saveMajorityVote();			
		}
	}

	saveMajorityVote(): void {
		this.firebaseApp.database().ref(`/polls/${this.poll.$key}`).transaction((poll: Poll) => {
			if (poll) {
				poll.votes++;
			}
			return poll;
		}).then( () => {
			console.log('finished');
		});
		/*var vote = new MajorityVote();
		vote.uid = this.authService.user.uid;
		vote.winner = this.winner;
		var votes = this.af.database.list(`/majorityVotes/${this.poll.$key}`);
		votes.push(vote).then((obj) => {
			console.log(obj);			
		});	*/


	}

}

