import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavRoutes } from '../app-routing.constants';

@Injectable({
    providedIn: 'root',
})
export class SearchService {
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}

    navigateToSearch(queryString: string) {
        if (!this.hasValue(queryString)) {
            return;
        }

        this.router.navigate(['/' + NavRoutes.SEARCH_USERS], {
            queryParams: { q: queryString },
            queryParamsHandling: 'merge',
        });
    }

    updateQueryParams(queryString: string) {
        this.router.navigate([], {
            queryParams: { q: queryString },
            relativeTo: this.activatedRoute,
            queryParamsHandling: 'merge',
            replaceUrl: true,
        });
    }

    private hasValue(queryString: string): boolean {
        return queryString && queryString !== '';
    }
}
