import { OptionVotes } from './option-votes.model';

export class PollVotes {
  $key: string;
  votes = 0;
  options: Array<OptionVotes>;

  $exists: () => {};

}