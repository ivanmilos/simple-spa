import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, merge, of } from 'rxjs';
import {
    catchError,
    map,
    shareReplay,
    switchMap,
    tap,
    withLatestFrom,
} from 'rxjs/operators';
import { IUserBasicDTO, IUserFullDTO } from 'src/app/interfaces/user.interface';
import { SingleUserPageContainerService } from './single-user-page-container.service';

@Component({
    selector: 'app-single-user-page-container',
    templateUrl: './single-user-page-container.component.html',
    styleUrls: ['./single-user-page-container.component.scss'],
})
export class SingleUserPageContainerComponent implements OnInit {
    alias$: Observable<string>;
    user$: Observable<IUserFullDTO>;
    followers$: Observable<IUserBasicDTO[]>;
    followersPageNumber$ = new BehaviorSubject<number>(1);
    isLoadingUser$: Observable<boolean>;
    isLoadingFollowers$: Observable<boolean>;

    constructor(
        private pageService: SingleUserPageContainerService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.alias$ = this.activatedRoute.paramMap.pipe(
            map(params => params.get('alias')),
            shareReplay()
        );

        this.user$ = this.alias$.pipe(
            switchMap(alias => this.pageService.getUser(alias)),
            tap(() => this.followersPageNumber$.next(1)),
            shareReplay()
        );

        this.followers$ = this.followersPageNumber$.pipe(
            withLatestFrom(this.alias$),
            switchMap(([pageIndex, alias]) =>
                this.pageService.getFollowers(alias, pageIndex)
            ),
            shareReplay()
        );

        this.isLoadingUser$ = merge(this.alias$, this.user$).pipe(
            map(value => typeof value === 'string'),
            catchError(() => of(false))
        );

        this.isLoadingFollowers$ = merge(
            this.followersPageNumber$,
            this.followers$
        ).pipe(
            map(value => Number.isInteger(value)),
            catchError(() => of(false))
        );
    }

    onPaginationClick({ pageIndex }) {
        this.followersPageNumber$.next(pageIndex);
    }
}
