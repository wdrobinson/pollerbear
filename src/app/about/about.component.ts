import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({	
	moduleId: module.id,
	templateUrl: 'about.template.html'
})

export class AboutComponent { 
	constructor(private router: Router) {}
}
