import { Component, OnInit, Directive, Inject } 		from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { AngularFire, FirebaseObjectObservable, FirebaseApp } from 'angularfire2';
import 'rxjs/add/operator/take'
import { Subscription } from 'rxjs';
import * as firebase from 'firebase';
import 'chart.js';

import { Poll } 					from '../models/poll.model';
import { Option } 					from '../models/option.model';

@Component({
	moduleId: module.id,
	templateUrl: 'results.template.html'
})

export class ResultsComponent implements OnInit {
	poll = new Poll();
	loading = true;
	chartType: string;
	chartLabels = new Array<string>();
	chartData = new Array<any>(); 
	chartColors: Array<any> = [{}];
	chartLegend = false;
	colors = ['#7293CB', '#E1974C', '#84BA5B', '#D35E60', '#808585', '#9067A7', '#AB6857', '#CCC210'];	

	constructor(
	  private af: AngularFire,
	  private route: ActivatedRoute,
	  private router: Router,
	  @Inject(FirebaseApp) private firebaseApp: firebase.app.App
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((params: Params) => this.urlChange(params));
	}

	urlChange(params: Params): void {
		this.af.database.object(`/polls/${params['url']}`).subscribe((poll: Poll) => this.loadPoll(poll));
	}

	loadPoll(poll: Poll): void {		
		this.poll = poll;
		var maxPoints = 0;
		var totalPoints = 0;
		for (var option of this.poll.options) {
			if (this.poll.type === 1) {
				option.points = option.rankPoints;
			} else {
				option.points = option.majorityPoints;
			}
			if (option.points > maxPoints) {
				maxPoints = option.points;
			}
			totalPoints += option.points;
		}
		for (var option of this.poll.options) {
			if (option.points === maxPoints) {
				option.winner = true;
			}
			option.percentVotes = option.points/totalPoints*100;
		}
		this.poll.options.sort((a: Option, b: Option) => {
			return b.points - a.points ||  a.name.localeCompare(b.name);
		});		
		this.loading = false;
		this.loadChart();
	}

	loadChart(): void {
		this.chartLabels.length = 0;
		this.chartData.length = 0;
		if (this.poll.type === 1) {
			this.chartType = 'bar';
		} else {
			this.chartType = 'pie';
		}
		this.chartData.push({
			data: new Array<number>(),
			backgroundColor: new Array<string>(),
			hoverBackgroundColor: new Array<string>()
		});
		var colorCounter = 0;
		for (var option of this.poll.options) {
			this.chartLabels.push(option.name);
			this.chartData[0].data.push(option.points);
			this.chartData[0].backgroundColor.push(this.colors[colorCounter]);
			this.chartData[0].hoverBackgroundColor.push(this.colors[colorCounter]);
			colorCounter = colorCounter < this.colors.length ? colorCounter+1 : 0;
		}			
	}

}