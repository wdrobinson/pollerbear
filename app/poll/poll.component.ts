import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	moduleId: module.id,	
	selector: 'poll',
	templateUrl: 'poll.template.html'
})

export class PollComponent { 
	constructor(private router: Router) {}
}