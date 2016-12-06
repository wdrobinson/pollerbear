import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Poll } from '../models/poll.model';
import { Option } from '../models/option.model';
import { AuthService } 		from '../services/auth.service';

@Component({
	moduleId: module.id,
	templateUrl: 'create-poll.template.html',
	providers: [AuthService]
})

export class CreatePollComponent {
	maxOptions = 20; 
	errorMessage: string;
	poll = new Poll();
	polls: FirebaseListObservable<any>;

	constructor(private af: AngularFire, private authService: AuthService) {
		this.polls = af.database.list('/polls');
	}

	addOption(): void {
		if (this.poll.options.length >= this.maxOptions) {
			return;
		}
		this.poll.options.push(new Option());
	}

	keyPress(index: number): void {
		if(index + 1 === this.poll.options.length) {
			this.addOption();
		}
	}

	createPoll(): void {
		this.errorMessage = null;
		if(!this.poll.topic || this.poll.topic.trim() === '') {
			this.errorMessage = 'please provide a poll topic';
			return;
		}
		var validOptions = this.getValidOptions();
		if (validOptions.length < 2) {
			this.errorMessage = 'please provide at least two unique options';
			return;
		}
		this.poll.options = validOptions;
		if(this.authService.user) {
			this.poll.uid = this.authService.user.uid;
		}		
		this.polls.push(this.poll).then((item) => {this.poll.id = item.key;})
	}

	private getValidOptions(): Array<Option> {
		var validOptions = new Array<Option>();
		for (var option of this.poll.options) {
			if(!option.name || option.name.trim() === '') {
				continue;
			}
			var duplicate = false;
			for (var validOption of validOptions) {
				if(option.name === validOption.name) {
					duplicate = true;
					break;
				}
			}
			if(!duplicate) {
				validOptions.push(option);
			}
		}
		return validOptions;
	}

}

