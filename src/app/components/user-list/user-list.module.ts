import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list.component';
import { UserListItemModule } from '../user-list-item/user-list-item.module';
import { BlockLoaderModule } from '../block-loader/block-loader.module';

@NgModule({
    declarations: [UserListComponent],
    imports: [CommonModule, UserListItemModule, BlockLoaderModule],
    exports: [UserListComponent],
})
export class UserListModule {}
