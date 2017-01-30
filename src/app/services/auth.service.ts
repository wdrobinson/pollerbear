import { Injectable, Inject, NgZone }	from '@angular/core';
import { Http, Response }	from '@angular/http';
import { Observable }	from 'rxjs/Observable';
import { FirebaseApp, AngularFire, AuthProviders, AuthMethods, FirebaseAuthState }	from 'angularfire2';
import 'rxjs/add/operator/catch';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

	public user: firebase.User;	
	public userInfo: firebase.UserInfo;	

  constructor (private af: AngularFire, @Inject(FirebaseApp) private firebaseApp: firebase.app.App, @Inject(NgZone) private zone: NgZone) {
		firebaseApp.auth().getRedirectResult().catch((error: any) => {
			if (error.code !== 'auth/credential-already-in-use') {				
				console.log(error);
				return;
			}
			var prevUser = this.firebaseApp.auth().currentUser;
			this.firebaseApp.auth().currentUser.delete().then( () => {
				this.firebaseApp.auth().signInWithCredential(error.credential).then((user: firebase.User) => {
				  var newUser = user;
			   	zone.run( () => {
				  	this.user = newUser; 
				  	this.userInfo = newUser.providerData[0];
				  });
          if(prevUser.isAnonymous) {
            this.mergeAccount(prevUser, newUser);
          }  				  
				}, (error) => {
				  console.log("Sign In Error", error);
				});
			});
		});

    this.af.auth.subscribe((auth) => {
    	if (auth) {
    		this.user = auth.auth;
    		this.userInfo = auth.google;
    	} else {
    		this.user = null;
    		this.userInfo = null;
    		this.loginAnonymous();    		
    	}
    }, (error) => {
    		console.log(error);
  	});
  }

  login() {  
  	var provider = new firebase.auth.GoogleAuthProvider();
		this.firebaseApp.auth().currentUser.linkWithRedirect(provider);
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

  mergeAccount(prevUser: firebase.User, newUser: firebase.User) {
  		//TODO: map old UID to new UID anywhere it is used
      //Votes 
      console.log(newUser, prevUser);
      this.af.database.object(`/users/${prevUser.uid}/votes`).take(1).subscribe((oldVotes: any) => {
        this.af.database.object(`/users/${newUser.uid}/votes`).take(1).subscribe((newVotes: any) => {
          console.log(oldVotes, newVotes);
        });
      });
  }


}