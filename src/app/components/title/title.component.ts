import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { TitleElement } from 'src/app/types/title-element.type';

@Component({
    selector: 'app-title',
    templateUrl: './title.component.html',
    styleUrls: ['./title.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleComponent implements OnInit {
    @Input() elementType: TitleElement = 'h1';
    @Input() overrideStyle: TitleElement;
    @Input() align: 'left' | 'center' | 'right';

    cssClasses: string;

    constructor() {}

    ngOnInit() {
        this.cssClasses = this.overrideStyle || this.elementType;

        if (this.align) {
            this.cssClasses += ' align-' + this.align;
        }
    }
}
