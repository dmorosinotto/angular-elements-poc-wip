import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({})
export abstract class BaseComponent implements AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, DoCheck, OnChanges, OnDestroy, OnInit {
  constructor(protected readonly componentName: string) {}

  ngAfterContentChecked() {
    this.log('AfterContentChecked');
  }

  ngAfterContentInit() {
    this.log('AfterContentInit');
  }

  ngAfterViewChecked() {
    this.log('AfterViewChecked');
  }

  ngAfterViewInit() {
    this.log('AfterViewInit');
  }

  ngDoCheck() {
    this.log('DoCheck');
  }

  ngOnChanges(changes: SimpleChanges) {
    this.log('OnChanges', changes);
  }

  ngOnDestroy() {
    this.log('OnDestroy');
  }

  ngOnInit() {
    this.log('OnInit');
  }

  protected log(...args) {
    console.log(`[${this.componentName}]`, ...args);
  }
}
