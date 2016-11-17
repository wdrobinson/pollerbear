import { Component, OnInit } 		from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Poll } 					from '../models/poll.model';
import { Option } 					from '../models/option.model';
import { PollService } 				from '../services/poll.service';

@Component({
	moduleId: module.id,
	templateUrl: 'vote.template.html',
	providers: [PollService]
})

export class VoteComponent implements OnInit {
	poll = new Poll();

	constructor(
	  private pollService: PollService,
	  private route: ActivatedRoute,
	  private router: Router
	) {}

	ngOnInit(): void {
	  	this.route.params
	    .switchMap((params: Params) => this.pollService.getPoll(params['url']))
	    .subscribe((poll: Poll) => this.loadPoll(poll));
	}

	loadPoll(poll: Poll): void {
		this.poll = poll;
	}

}

