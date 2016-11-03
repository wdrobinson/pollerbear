import { Component } from '@angular/core';
import { Poll } from '../models/poll.model';
import { Option } from '../models/option.model';

@Component({
	moduleId: module.id,
	selector: 'create-poll',
	templateUrl: 'create-poll.template.html'
})

export class CreatePollComponent {
	maxOptions = 20; 
	errorMessage: string;
	poll = new Poll();

	addOption(): void {
		if(this.poll.options.length >= this.maxOptions) {
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
		this.errorMessage = '';
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

