import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Input,
} from '@angular/core';

@Component({
    selector: 'app-block-loader',
    templateUrl: './block-loader.component.html',
    styleUrls: ['./block-loader.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockLoaderComponent {
    @Input() overlayMode = true;
    @Input() size: 'small' | 'regular' = 'regular';

    @HostBinding('class.loader-overlay') get overlayModeClass() {
        return this.overlayMode;
    }
}
