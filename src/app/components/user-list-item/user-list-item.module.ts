import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListItemComponent } from './user-list-item.component';
import { RouterModule } from '@angular/router';
import { ButtonModule } from '../button/button.module';

@NgModule({
    declarations: [UserListItemComponent],
    imports: [CommonModule, RouterModule, ButtonModule],
    exports: [UserListItemComponent],
})
export class UserListItemModule {}
