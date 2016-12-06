import { Injectable }	from '@angular/core';
import { Http, Response }	from '@angular/http';
import { Observable }	from 'rxjs/Observable';
import { AngularFire, AuthProviders, AuthMethods }	from 'angularfire2';

@Injectable()
export class AuthService {

	public user: firebase.User;	

  constructor (private af: AngularFire) {
    this.af.auth.subscribe(auth => {
    	if (auth) {
    		this.user = auth.auth;
    	} else {
    		this.user = null;
    	}    	
    });
  }

  login() {
    this.af.auth.login();
  }
   
  logout() {
    this.af.auth.logout();
  }

}