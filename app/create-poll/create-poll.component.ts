import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';
import {FormControl} from '@angular/forms';

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
	urlControl = new FormControl();
	pollSubscription: Subscription;
	customUrlValid = false;
	customUrlLoading = true;
	saving = false;

	constructor(private af: AngularFire, private authService: AuthService) {
		this.polls = af.database.list('/polls');
	}

	ngOnInit() {
		// debounce keystroke events
		this.urlControl.valueChanges
		  .debounceTime(1000)
		  .subscribe(newValue => {
		  	this.poll.url = newValue;
		  	this.checkUrl();
		  });
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
			this.errorMessage = 'provide a poll topic';
			return;
		}
		var validOptions = this.getValidOptions();
		if (validOptions.length < 2) {
			this.errorMessage = 'provide at least two unique options';
			return;
		}
		this.poll.options = validOptions;
		if(this.authService.user) {
			this.poll.uid = this.authService.user.uid;
		}		
		this.saving = true;
		this.polls.push(this.poll).then((item) => {
			this.poll.id = item.key;
			this.saving = false;
		})
	}

	checkUrl(): void {
		this.customUrlLoading = true;
		this.pollSubscription = 
		this.af.database.object(`/polls/${this.poll.url}`)
	    .subscribe((poll: Poll) => {
	    	this.pollSubscription.unsubscribe();
    		console.log(poll);
	    	console.log(poll.$value == null);
	    	this.customUrlValid = !poll.$exists();
	    	this.customUrlLoading = false;
	    });
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

