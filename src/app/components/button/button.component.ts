import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { ButtonColorType } from 'src/app/types/button.type';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit {
    @Input()
    public size: 'regular' | 'small' = 'regular';
    @Input()
    public colorType: ButtonColorType;
    @Input()
    public route: string = null;
    @Input()
    public queryParams: object = null;
    @Input()
    public title: string = null;
    @Input()
    public isSubmitButton = false;
    @Input()
    public isDisabled = false;
    @Input()
    public isLoading = false;
    @Input()
    public externalUrl: string = null;

    cssClasses: string;

    constructor() {}

    ngOnInit() {
        switch (this.colorType) {
            case 'blank':
                this.cssClasses = 'button-blank';
                break;
            case 'transparent':
                this.cssClasses = 'button-transparent';
                break;
            case 'primary':
                this.cssClasses = 'button-primary';
                break;
            case 'primaryDark':
                this.cssClasses = 'button-primary-dark';
                break;
            case 'primaryLight':
                this.cssClasses = 'button-primary-light';
                break;
            case 'white':
            default:
                this.cssClasses = 'button-white';
                break;
        }

        if (this.size === 'small') {
            this.cssClasses += ' button-small';
        }
    }
}
