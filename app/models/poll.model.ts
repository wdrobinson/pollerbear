import { Option } from './option.model';

export class Poll {
  id: string;
  topic: string;
  votes: number;
  type = 1;
  uid: string;
  options: Array<Option>;

  constructor() {
  	this.options = [];
  	for (var i = 0; i < 3; i++) {
	  	this.options.push(new Option()); 
  	}
  }

}