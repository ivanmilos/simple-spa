import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NavRoutes } from 'src/app/app-routing.constants';
import { EventsService } from 'src/app/services/events.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
    selector: 'app-header-search',
    templateUrl: './header-search.component.html',
    styleUrls: ['./header-search.component.scss'],
})
export class HeaderSearchComponent implements OnInit {
    theForm: FormGroup;
    searchInput: FormControl = new FormControl('', [Validators.required]);
    isExpanded = false;
    clickSub: Subscription;
    escSub: Subscription;
    @ViewChild('inputFieldRef') inputFieldRef: ElementRef;
    navBreakpoint: number;

    constructor(
        private evService: EventsService,
        private elRef: ElementRef,
        private searchService: SearchService,
        private location: Location
    ) {}

    ngOnInit() {
        this.buildForm();
    }

    private buildForm() {
        this.theForm = new FormGroup({ searchInput: this.searchInput });
    }

    public onSubmit() {
        if (this.theForm.valid) {
            const path = this.location.path().split('?')[0];
            const queryString = this.searchInput.value;

            if (path === '/' + NavRoutes.SEARCH_USERS) {
                this.searchService.updateQueryParams(queryString);
            } else {
                this.searchService.navigateToSearch(queryString);
            }

            this.collapseForm();
            this.theForm.reset();
        }
    }

    public onExpandButtonClick() {
        this.expandForm();
    }

    private expandForm() {
        this.clickSub = this.evService.documentClick$.subscribe(event => {
            if (!this.elRef.nativeElement.contains(event.target)) {
                // clicked outside of the component
                this.collapseForm();
            }
        });

        this.escSub = this.evService.escKey$.subscribe(() => {
            // ESC key pressed
            this.collapseForm();
        });

        this.isExpanded = true;
        this.inputFieldRef.nativeElement.focus();
    }

    private collapseForm() {
        if (this.clickSub) {
            this.clickSub.unsubscribe();
        }
        if (this.escSub) {
            this.escSub.unsubscribe();
        }

        this.isExpanded = false;
    }
}
