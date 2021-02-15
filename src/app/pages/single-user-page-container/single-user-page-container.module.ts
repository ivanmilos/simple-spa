import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SingleUserPageContainerComponent } from './single-user-page-container.component';
import { SingleUserPageContainerService } from './single-user-page-container.service';
import { PaginationModule } from 'src/app/components/pagination/pagination.module';
import { ProfileModule } from 'src/app/components/profile/profile.module';
import { TitleModule } from 'src/app/components/title/title.module';
import { UserListModule } from 'src/app/components/user-list/user-list.module';
import { BlockLoaderModule } from 'src/app/components/block-loader/block-loader.module';

const routes: Routes = [
    { path: '', component: SingleUserPageContainerComponent },
];

@NgModule({
    declarations: [SingleUserPageContainerComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        PaginationModule,
        ProfileModule,
        TitleModule,
        UserListModule,
        BlockLoaderModule,
    ],
    providers: [SingleUserPageContainerService],
})
export class SingleUserPageContainerModule {}
