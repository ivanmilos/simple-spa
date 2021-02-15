import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserBasicDTO, IUserFullDTO } from 'src/app/interfaces/user.interface';

@Injectable()
export class SingleUserPageContainerService {
    constructor(private http: HttpClient) {}

    getUser(username: string) {
        return this.http.get(`users/${username}`) as Observable<IUserFullDTO>;
    }

    getFollowers(username: string, page: number = 1) {
        return this.http.get(
            `users/${username}/followers?per_page=10&page=${page}`
        ) as Observable<IUserBasicDTO[]>;
    }
}
