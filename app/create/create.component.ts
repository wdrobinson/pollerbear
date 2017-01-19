import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Subscription } from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/take';
import { ToasterService } from 'angular2-toaster';

import { Poll } from '../models/poll.model';
import { Option } from '../models/option.model';
import { AuthService } 		from '../services/auth.service';

@Component({
	moduleId: module.id,
	templateUrl: 'create.template.html'
})

export class CreateComponent {
	appUrl = 'pollerbear.net';
	maxOptions = 20; 
	errorMessage: string;
	poll = new Poll();
	polls: FirebaseListObservable<any>;
	urlControl = new FormControl();
	customUrl: string;
	customUrlClean: string;
	customUrlValid: boolean;
	customUrlLoading = false;
	settingsCollapsed = true;
	saving = false;
	finalUrl: string;

	constructor(private af: AngularFire, private authService: AuthService, private toasterService: ToasterService) {
		this.polls = af.database.list('/polls');
	}

	resetData() {
		this.errorMessage = null;
		this.poll = new Poll();
		this.customUrl = null;
		this.customUrlClean = null;
		this.customUrlValid = null;
		this.customUrlLoading = false;
		this.settingsCollapsed = true;
		this.saving = false;
		this.finalUrl = null;
	}

	ngOnInit() {
		// debounce keystroke events
		this.urlControl.valueChanges
		  .debounceTime(1000)
		  .subscribe(newValue => {
		  	this.customUrl = newValue;
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
		if(this.authService.user && this.authService.user.uid) {
			this.poll.uid = this.authService.user.uid;
		}		
		for (var i = this.poll.options.length - 1; i >= 0; i--) {
			this.poll.options[i].id = i;
		}		
		this.saving = true;
		if (this.customUrlValid && this.customUrlClean) {
			var newPoll = this.af.database.object(`/polls/${this.customUrlClean}`);
			newPoll.set(this.poll).then(() => {
				this.poll.$key = this.customUrlClean;
				this.saving = false;			
			});
		} else {
			this.polls.push(this.poll).then((item) => {
				this.poll.$key = item.key;
				this.finalUrl = `${this.appUrl}/${this.poll.$key}`;
				this.saving = false;
			})
		}
	}

	urlChange(value: string): void {
		this.customUrlLoading = true;
	}

	checkUrl(): void {	
		this.customUrlClean = this.customUrl.replace(/[^a-zA-Z0-9-_]/g, '')
		if(this.customUrl == null || this.customUrl === '') {
			this.resetCustomUrl();
			return;	
		}	
		this.af.database.object(`/polls/${this.customUrlClean}`).take(1).subscribe((result: any) => {
	    	this.customUrlValid = !result.$exists();
	    	this.customUrlLoading = false;
	    	if (!this.customUrlValid) {
	    		this.customUrlClean = null;
	    	}
	    });
	}

	resetCustomUrl(): void {
		this.customUrlLoading = false;
		this.customUrlValid = null;
		this.urlControl.markAsPristine();
		this.customUrl = null;	
		this.customUrlClean = null;	
	}

	urlCopy(): void {
		this.toasterService.pop('success', null, 'URL copied to clipboard!');
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

