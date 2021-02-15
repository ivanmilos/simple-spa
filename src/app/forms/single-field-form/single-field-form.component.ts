import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TitleElement } from 'src/app/types/title-element.type';

@Component({
    selector: 'app-single-field-form',
    templateUrl: './single-field-form.component.html',
    styleUrls: ['./single-field-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleFieldFormComponent implements OnInit {
    @Input() public title: string;
    @Input() public titleElementType: TitleElement = 'h2';
    @Input() public placeholder: string;
    @Input() public buttonLabel: string;
    @Input() public errorHint: string;

    @Input() public inProgress = false;
    @Input() public inputControl: FormControl;
    @Output() formSubmit = new EventEmitter<string>();
    @Output() formValidityChecked = new EventEmitter<boolean>();
    theForm: FormGroup;

    constructor() {}

    ngOnInit() {
        this.buildForm();
    }

    private buildForm() {
        this.theForm = new FormGroup({ inputControl: this.inputControl });
    }

    public onSubmit() {
        if (!this.isSubmitDisabled()) {
            this.formSubmit.emit(this.inputControl.value);
        }
    }

    public isSubmitDisabled(): boolean {
        return (
            this.theForm.invalid || this.theForm.disabled || this.inProgress
        );
    }

    public isFormInvalid(): boolean {
        const isInvalid =
            this.theForm.invalid &&
            this.theForm.touched &&
            !this.inputIsEmpty();

        this.formValidityChecked.emit(!isInvalid);

        return isInvalid;
    }

    public resetUntouchedState() {
        if (this.inputIsEmpty()) {
            this.inputControl.markAsUntouched();
            this.inputControl.markAsPristine();
        }
    }

    private inputIsEmpty(): boolean {
        return (
            this.inputControl.value === undefined ||
            this.inputControl.value === null ||
            this.inputControl.value === ''
        );
    }
}
