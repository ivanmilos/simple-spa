import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class EventsService {
    public windowScroll$: Observable<Event>;
    public windowResize$: Observable<Event>;
    public documentClick$: Observable<Event>;
    public escKey$: Observable<Event>;

    constructor(@Inject(PLATFORM_ID) private platformID: object) {
        if (isPlatformBrowser(this.platformID)) {
            this.windowScroll$ = fromEvent(window, 'scroll');

            this.windowResize$ = fromEvent(window, 'resize').pipe(
                debounceTime(200),
                distinctUntilChanged()
            );

            this.documentClick$ = fromEvent(document, 'click');

            this.escKey$ = fromEvent(window, 'keydown').pipe(
                filter(
                    (ev: KeyboardEvent) =>
                        ev.key === 'Escape' || ev.keyCode === 27
                )
            );
        }
    }
}
