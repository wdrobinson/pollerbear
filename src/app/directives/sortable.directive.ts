import { Component, Directive, ElementRef, Input, Output, EventEmitter, Inject, NgZone } from '@angular/core';

import * as $ from 'jquery';
import 'jquery-ui/ui/widgets/sortable';

(window as any).jQuery = $;
require('jquery-ui-touch-punch');

import { Option } 					from '../models/option.model';

@Directive({
  selector: "[sortable]"
})

export class SortableDirective {

	startIndex: number;

	constructor(private el: ElementRef, @Inject(NgZone) private zone: NgZone) {}

  @Input() pollOptions: Array<Option>;
  @Output() optionsChange = new EventEmitter();

  ngAfterViewInit() {
      $(this.el.nativeElement).sortable( { 
        start: (event, ui) => {
          this.startIndex = ui.item.index();
        },
        stop: (event, ui) => {
        	var option = this.pollOptions[this.startIndex];
        	this.pollOptions.splice(this.startIndex, 1);
        	this.pollOptions.splice(ui.item.index(), 0, option);
        	this.zone.run( () => {
	        	this.optionsChange.emit(this.pollOptions);
				  });
        }
      });
  }
}

