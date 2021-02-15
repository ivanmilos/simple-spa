import { Component, Input } from '@angular/core';
import { IUserFullDTO } from 'src/app/interfaces/user.interface';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
    @Input() user: IUserFullDTO;
}
