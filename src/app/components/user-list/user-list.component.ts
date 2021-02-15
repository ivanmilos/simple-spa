import { Component, Input } from '@angular/core';
import { IUserBasicDTO } from 'src/app/interfaces/user.interface';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
    @Input() users: IUserBasicDTO[];
    @Input() isLoading = false;
}
