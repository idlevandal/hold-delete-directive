import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Directive, HostListener, EventEmitter, Output, OnInit } from '@angular/core';
import {Observable, Subject, interval} from 'rxjs'
import {takeUntil, tap, filter} from 'rxjs/operators'

@Directive({
  selector: '[holdable]'
})
export class HoldableDirective implements OnInit {

  // TUTORIAL
  // https://www.youtube.com/watch?v=kl-UMCHpEsw

  // how long user can hold the button
  @Output() holdTime: EventEmitter<number> = new EventEmitter();
  // in DOM, <button holdable (holdTime="")></button>

  state: Subject<string> = new Subject();

  cancel: Observable<string>;
  
  ngOnInit(): void {
    // filter state value for cancel values then assign to cancel obs for takeUntil in onHold handler
    this.cancel = this.state.pipe(
      // only cancel events are emitted
      filter(val => val === 'cancel'),
      tap(v => {
        console.log('%c stopped hold', 'color: #ec6969; font-weight: bold');
        // to reset progress bar
        this.holdTime.emit(0);
      })
    )
  }

  // HOSTLISTENER: Decorator that declares a DOM event to listen for, and provides a
  // handler method to run when that event occurs.
  @HostListener('mouseup', ['$event'])
  @HostListener('mouseleave', ['$event'])
  onExit() {
    this.state.next('cancel');
  }

  @HostListener('mousedown', ['$event'])
  onHold() {
    console.log('%c started hold', 'color: #5fba7d; font-weight: bold');

    this.state.next('start');

    const n = 100; // interval in milliseconds
    // v is milliseconds
    interval(n).pipe(
      takeUntil(this.cancel),
      tap(v => {
        this.holdTime.emit(v * n);
      })
    )
    .subscribe();
    
  }
 
}
