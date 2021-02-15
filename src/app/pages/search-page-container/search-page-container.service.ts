import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IUserSearchResultsDTO } from 'src/app/interfaces/search-results.interface';

@Injectable()
export class SearchPageContainerService {
    constructor(private http: HttpClient) {}

    searchUsers(queryString: string) {
        if (!queryString) {
            return of(null);
        }

        return this.http.get(
            `search/users?q="${queryString}"&per_page=10`
        ) as Observable<IUserSearchResultsDTO>;
    }
}
