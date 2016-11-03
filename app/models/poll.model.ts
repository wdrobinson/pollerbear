import { Option } from './option.model';

export class Poll {
  id: number;
  url: string;
  topic: string;
  votes: number;
  type: number;
  options: Array<Option>;

  constructor() {
  	this.options = [];
  	for (var i = 0; i < 3; i++) {
	  	this.options.push(new Option()); 
  	}
  }

}