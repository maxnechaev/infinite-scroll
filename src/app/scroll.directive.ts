import {
  Directive,
  AfterViewInit,
  OnDestroy,
  HostListener,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil, filter, map } from 'rxjs/operators';

interface Scroll {
  y: number;
  height: number;
}

@Directive({
  selector: '[snScroll]',
})


export class ScrollDirective implements AfterViewInit, OnDestroy {

  @Output() public scrollEnd = new EventEmitter<void>();

  @Input() public debounce = 300;

  public scroll$: Subject<Scroll> = new Subject<Scroll>();

  private ngUnsubscribe$ = new Subject<void>();

  public ngAfterViewInit(): void {
    this.scroll$
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        debounceTime(this.debounce),
        map(scroll => {
          const y = scroll.y;
          return { y, height: scroll.height };
        }),
        filter(scroll => scroll.y >= scroll.height),
      )
      .subscribe(() => this.scrollEnd.emit());
  }

  @HostListener('scroll', [
    '$event.target.scrollTop',
    '$event.target.scrollHeight',
    '$event.target.offsetHeight',
  ])

  public onScroll(
    scrollY: number,
    scrollheight: number,
    offsetHeight: number,
  ): void {
    const height = scrollheight;
    const y = scrollY + offsetHeight;
    this.scroll$.next({ y, height });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
