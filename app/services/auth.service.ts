import { Injectable }	from '@angular/core';
import { Http, Response }	from '@angular/http';
import { Observable }	from 'rxjs/Observable';
import { AngularFire, AuthProviders, AuthMethods, FirebaseAuthState }	from 'angularfire2';

@Injectable()
export class AuthService {

	public auth: FirebaseAuthState;	

  constructor (private af: AngularFire) {
    this.af.auth.subscribe(auth => {
    	if (auth) {
    		this.auth = auth;
    	} else {
    		this.auth = null;
    		this.loginAnonymous();    		
    	}    	
    });
  }

  login() {  	
  	/*if (this.auth && this.auth.anonymous) {
  		var test = new firebase.auth.GoogleAuthProvider();
  		console.log(test);
  		this.auth.auth.linkWithRedirect(test);
  		return;
  	} */
    this.af.auth.login();
  }
   
  logout() {
    this.af.auth.logout();
  }

  loginAnonymous() {
    this.af.auth.login({
      provider: AuthProviders.Anonymous,
      method: AuthMethods.Anonymous,
    });    
  }

}