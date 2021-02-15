import { Component, Input, OnChanges } from '@angular/core';
import { NavRoutes } from 'src/app/app-routing.constants';
import { IUserBasicDTO } from 'src/app/interfaces/user.interface';

@Component({
    selector: 'app-user-list-item',
    templateUrl: './user-list-item.component.html',
    styleUrls: ['./user-list-item.component.scss'],
})
export class UserListItemComponent implements OnChanges {
    @Input() user: IUserBasicDTO;
    profileRoute: string;

    constructor() {}

    ngOnChanges() {
        this.profileRoute = '/' + NavRoutes.USERS + '/' + this.user.login;
    }
}
