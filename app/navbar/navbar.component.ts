import { Component } 		from '@angular/core';
import { Router } 			from '@angular/router';
import { AuthService } 		from '../services/auth.service';

@Component({
	moduleId: module.id,
	selector: 'navbar',
	templateUrl: 'navbar.template.html',
	providers: [AuthService]
})

export class NavBarComponent {
	
	private isCollapsed = true;

	constructor (private router: Router, private authService: AuthService) {}

	login() {
	  this.authService.login();
	}
	 
	logout() {
	  this.authService.logout();
	}

}
