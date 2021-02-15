import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SearchPageContainerComponent } from './search-page-container.component';
import { SingleFieldFormModule } from 'src/app/forms/single-field-form/single-field-form.module';
import { SearchPageContainerService } from './search-page-container.service';
import { TitleModule } from 'src/app/components/title/title.module';
import { UserListModule } from 'src/app/components/user-list/user-list.module';

const routes: Routes = [{ path: '', component: SearchPageContainerComponent }];

@NgModule({
    declarations: [SearchPageContainerComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SingleFieldFormModule,
        TitleModule,
        UserListModule,
    ],
    providers: [SearchPageContainerService],
})
export class SearchPageContainerModule {}
