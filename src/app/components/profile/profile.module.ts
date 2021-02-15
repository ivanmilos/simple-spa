import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { TitleModule } from '../title/title.module';

@NgModule({
    declarations: [ProfileComponent],
    imports: [CommonModule, TitleModule],
    exports: [ProfileComponent],
})
export class ProfileModule {}
