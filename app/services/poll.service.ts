import { Injectable }     from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { AngularFire, FirebaseListObservable  }	from 'angularfire2';

import { Poll } from '../models/poll.model';
import { Option } from '../models/option.model';

@Injectable()
export class PollService {

	private polls: FirebaseListObservable<Poll[]>;

  constructor (private af: AngularFire) {  	
  	this.polls = af.database.list('/polls');
  }



  /*getPoll (url: string): Observable<Poll> {
    return this.http.get(this.apiUrl + '/?url=' + url)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }*/

}