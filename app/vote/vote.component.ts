import { Component, OnInit } 		from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import 'rxjs/add/operator/switchMap';
import { Subscription } from 'rxjs';

import { Poll } 					from '../models/poll.model';
import { Option } 					from '../models/option.model';

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
	  private router: Router
	) {}

	ngOnInit(): void {
		this.route.params.switchMap((params: Params) => this.af.database.object(`/polls/${params['url']}`))
	    .subscribe((poll: Poll) => this.loadPoll(poll));
	}

	loadPoll(poll: Poll): void {		
		this.poll = poll;
		this.poll.options = this.shuffleArray(this.poll.options);
	}

	onDragStart(event: any): void {
		var img = document.createElement('img'); 
		img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
		event.dataTransfer.setDragImage(img, 0, 0);
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

}

