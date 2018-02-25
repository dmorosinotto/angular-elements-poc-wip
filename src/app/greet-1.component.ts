import {Component, EventEmitter, Input, Output} from '@angular/core';

import {BaseComponent} from './base.component';

@Component({
  selector: 'my-greet-1',
  styles: [':host { display: block; }'],
  template: `
    <span>Hello, {{ name }}! (CD on timeout: {{ timeoutWorks }})</span>
    <ng-content></ng-content>
    <button (click)="greet.emit()">Greet back</button>
    <ng-content select=".delete-btn"></ng-content>
  `,
})
export class Greet1Component extends BaseComponent {
  @Input() name = 'world';
  @Output() greet = new EventEmitter<void>();
  timeoutWorks = 'maybe';

  constructor() {
    super('Greet1Component');
    this.greet.subscribe(() => this.log('OnGreet'));

    setTimeout(() => this.timeoutWorks = 'surely', 10000);
  }
}
