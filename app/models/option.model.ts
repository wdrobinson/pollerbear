export class Option {
  id: number;
  name: string;  
  majorityPoints = 0;
  rankPoints = 0;  

  //Local only
  points: number;
  percentVotes: number;
  winner: boolean;
}