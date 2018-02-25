import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {BaseComponent} from './base.component';

const PHRASES = [
  'yes',
  'absolutely',
  'you bet',
  'most definitely',
  'oh yeah',
];

@Component({
  selector: 'my-greet-2',
  styles: [':host { display: block; }'],
  template: `
    <span>Hey, {{ name }}! (CD on interval: {{ itWorks }})</span>
    <ng-content></ng-content>
    <button (click)="greet.emit()">Greet back</button>
    <ng-content select=".delete-btn"></ng-content>
  `,
})
export class Greet2Component extends BaseComponent implements OnInit {
  @Input() name = 'world';
  @Output() greet = new EventEmitter<void>();
  itWorks = 'let\'s see';
  intervalCount = 0;
  intervalId: number;

  constructor() {
    super('Greet2Component');
    this.greet.subscribe(() => this.log('OnGreet'));
  }

  ngOnInit() {
    super.ngOnInit();
    this.intervalId = setInterval(() => this.updateItWorks(), 3333);
  }

  updateItWorks() {
    const nextIdx = (PHRASES.indexOf(this.itWorks) + 1) % PHRASES.length;
    this.itWorks = PHRASES[nextIdx];

    if (++this.intervalCount > 10) {
      clearInterval(this.intervalId);
    }
  }
}
