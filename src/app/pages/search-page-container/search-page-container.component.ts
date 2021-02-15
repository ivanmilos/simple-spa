import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { merge, Observable, of } from 'rxjs';
import { catchError, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { NavRoutes } from 'src/app/app-routing.constants';
import { IUserSearchResultsDTO } from 'src/app/interfaces/search-results.interface';
import { SearchService } from 'src/app/services/search.service';
import { SearchPageContainerService } from './search-page-container.service';

@Component({
    selector: 'app-search-page-container',
    templateUrl: './search-page-container.component.html',
    styleUrls: ['./search-page-container.component.scss'],
})
export class SearchPageContainerComponent implements OnInit {
    navRoutes = NavRoutes;
    inputControl = new FormControl(null, [
        Validators.required,
        Validators.maxLength(256),
    ]);
    results$: Observable<IUserSearchResultsDTO>;
    private queryString$: Observable<string>;
    isLoadingResults$: Observable<boolean>;

    constructor(
        private pageService: SearchPageContainerService,
        private activatedRoute: ActivatedRoute,
        private searchService: SearchService
    ) {}

    ngOnInit() {
        this.queryString$ = this.activatedRoute.queryParamMap.pipe(
            map(paramMap => paramMap.get('q')),
            shareReplay()
        );

        this.results$ = this.queryString$.pipe(
            tap(q => this.inputControl.setValue(q)),
            switchMap(q => this.pageService.searchUsers(q)),
            shareReplay()
        );

        this.isLoadingResults$ = merge(this.queryString$, this.results$).pipe(
            map(value => typeof value === 'string'),
            catchError(() => of(false))
        );
    }

    onFormSubmit(queryString: string) {
        this.searchService.updateQueryParams(queryString);
    }
}
