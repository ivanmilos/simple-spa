import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderSearchComponent } from './header-search.component';
import { ButtonModule } from 'src/app/components/button/button.module';
import { IconsModule } from 'src/app/icons/icons.module';

@NgModule({
    declarations: [HeaderSearchComponent],
    imports: [CommonModule, ReactiveFormsModule, IconsModule, ButtonModule],
    exports: [HeaderSearchComponent],
})
export class HeaderSearchModule {}
