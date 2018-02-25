import {Component, EventEmitter, Input, Output} from '@angular/core';

import {BaseComponent} from './base.component';

@Component({
  selector: 'my-greet-3',
  styles: [':host { display: block; }'],
  template: `
    <span>Hi, {{ name }}! (CD on DOM events: {{ itWorks }}%)</span>
    <ng-content></ng-content>
    <button (click)="updateItWorks()">Event</button>
    <button (click)="greet.emit()">Greet back</button>
    <ng-content select=".delete-btn"></ng-content>
  `,
})
export class Greet3Component extends BaseComponent {
  @Input() name = 'world';
  @Output() greet = new EventEmitter<void>();
  itWorks = 50;

  constructor() {
    super('Greet3Component');
    this.greet.subscribe(() => this.log('OnGreet'));
  }

  updateItWorks() {
    this.itWorks += 100;
  }
}
