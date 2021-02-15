import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'src/app/components/button/button.module';
import { TitleModule } from 'src/app/components/title/title.module';
import { SingleFieldFormComponent } from './single-field-form.component';

@NgModule({
    declarations: [SingleFieldFormComponent],
    imports: [CommonModule, ReactiveFormsModule, ButtonModule, TitleModule],
    exports: [SingleFieldFormComponent],
})
export class SingleFieldFormModule {}
