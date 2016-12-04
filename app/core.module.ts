import { BrowserModule } from     '@angular/platform-browser';
import { HttpModule } from        '@angular/http';
import { NgModule } from          '@angular/core';
import { FormsModule } from       '@angular/forms';
import { 
  AngularFireModule, 
  AuthMethods, 
  AuthProviders 
} from "angularfire2";

const myFirebaseConfig = {
    apiKey: "AIzaSyD3ICKhwueWZc5dIyns-hLK4ZpLE2aUPHs",
    authDomain: "pollerbear-689bd.firebaseapp.com",
    databaseURL: "https://pollerbear-689bd.firebaseio.com",
    storageBucket: "pollerbear-689bd.appspot.com",
    messagingSenderId: "389126892288"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(myFirebaseConfig, myFirebaseAuthConfig)
  ],
  exports: [
    BrowserModule
  ]
})
export class CoreModule {}