import { Component } 		from '@angular/core';
import { ToasterConfig } 	from 'angular2-toaster';

@Component({
	moduleId: module.id,	
	selector: 'poll',
	templateUrl: 'poll.template.html'
})

export class PollComponent {
    public toasterconfig : ToasterConfig = 
	    new ToasterConfig({	    	
	        timeout: 3000
	    });
}