import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { HeaderSearchModule } from 'src/app/forms/header-search/header-search.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [HeaderComponent],
    imports: [CommonModule, RouterModule, HeaderSearchModule],
    exports: [HeaderComponent],
})
export class HeaderModule {}
