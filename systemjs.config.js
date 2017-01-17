/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',
      // angular bundles
      '@angular/core':                      'npm:@angular/core/bundles/core.umd.js',
      '@angular/common':                    'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler':                  'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser':          'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic':  'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http':                      'npm:@angular/http/bundles/http.umd.js',
      '@angular/router':                    'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms':                     'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/upgrade':                   'npm:@angular/upgrade/bundles/upgrade.umd.js',
      // other libraries
      'rxjs':                               'npm:rxjs',
      'angular-in-memory-web-api':          'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
      'firebase':                           'npm:firebase',
      'angularfire2':                       'npm:angularfire2',
      '@ng-bootstrap/ng-bootstrap':         'npm:@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.js', 
      'clipboard':                          'npm:clipboard/dist/clipboard.js',
      'angular2-toaster':                   'npm:angular2-toaster',
      'jquery':                             'npm:jquery',
      'jquery-ui':                          'npm:jquery-ui',
      'ng2-charts':                         'npm:ng2-charts',
      'chart.js':                           'npm:chart.js/dist'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      angularfire2:  { 
        main: 'bundles/angularFire2.umd.js',  
        defaultExtension: 'js' 
      },
      'firebase': {
        main: './firebase-browser.js',
        defaultExtension: 'js'
      },
      'angular2-toaster': {
        main: 'bundles/angular2-toaster.umd.min.js',
        defaultExtension: 'js'
      },
      'jquery': {
        main: 'dist/jquery.min.js',  
        defaultExtension: 'js'
      },
      'jquery-ui': {
        main: 'ui/core.js',
        defaultExtension: 'js'
      },
      'ng2-charts': {
        main: 'ng2-charts.js',
        defaultExtension: 'js' 
      },
      'chart.js': {
        main: 'Chart.js',
        defaultExtension: 'js' 
      }      
    }
  });
})(this);
