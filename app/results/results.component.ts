import { Component, OnInit, Directive, Inject } 		from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { AngularFire, FirebaseObjectObservable, FirebaseApp } from 'angularfire2';
import 'rxjs/add/operator/take'
import { Subscription } from 'rxjs';
import * as firebase from 'firebase';

import { Poll } 					from '../models/poll.model';
import { Option } 					from '../models/option.model';

@Component({
	moduleId: module.id,
	templateUrl: 'results.template.html'
})

export class ResultsComponent implements OnInit {
	poll = new Poll();

	constructor(
	  private af: AngularFire,
	  private route: ActivatedRoute,
	  private router: Router,
	  @Inject(FirebaseApp) private firebaseApp: firebase.app.App
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((params: Params) => this.urlChange(params));
	}

	urlChange(params: Params): void {
		this.af.database.object(`/polls/${params['url']}`).subscribe((poll: Poll) => this.loadPoll(poll));
	}

	loadPoll(poll: Poll): void {		
		this.poll = poll;
		var maxPoints = 0;
		var totalPoints = 0;
		for (var option of this.poll.options) {
			if (this.poll.type === 1) {
				option.points = option.rankPoints;
			} else {
				option.points = option.majorityPoints;
			}
			if (option.points > maxPoints) {
				maxPoints = option.points;
			}
			totalPoints += option.points;
		}
		for (var option of this.poll.options) {
			if (option.points === maxPoints) {
				option.winner = true;
			}
			option.percentVotes = option.points/totalPoints*100;
		}
		this.poll.options.sort((a: Option, b: Option) => {
			return b.points - a.points ||  a.name.localeCompare(b.name);
		});

	}

}