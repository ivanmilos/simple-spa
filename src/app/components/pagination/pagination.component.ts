import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnChanges,
} from '@angular/core';

type PagerItem = number | '...';
type Pager = PagerItem[];

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {
    @Input() pageSize = 10;
    @Input() currentPage = 1;
    @Input() totalItems: number;
    @Input() maxPagerItems = 9;
    @Output() paginationClick = new EventEmitter<any>();

    totalPages: number;
    pager: Pager = [];

    constructor() {}

    ngOnChanges() {
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.pager = this.buildPager();
    }

    private buildPager(): Pager {
        const output: Pager = [];

        // defaults for SIMPLE PAGINATION when totalPages < maxPagerItems
        // (all page links are visible)
        let start = 1;
        let end = this.totalPages;
        let ellipsisBeforeCurrent = false;
        let ellipsisAfterCurrent = false;

        if (this.totalPages > this.maxPagerItems) {
            if (this.maxPagerItems <= 7) {
                // SIMPLE PAGINATION without ELLIPSIS
                // current-2, current-1, current, current+1, current+2, current+3
                // halfRange is the number of items to add before and after current
                const halfRange = (this.maxPagerItems - 1) / 2;
                const newStart = this.currentPage - Math.floor(halfRange);
                const newEnd = this.currentPage + Math.ceil(halfRange);

                if (newStart < 1) {
                    // 1, 2, 3, max
                    end = this.maxPagerItems;
                } else if (newEnd > this.totalPages) {
                    // max-3, max-2, max-1, max
                    start = this.totalPages - this.maxPagerItems + 1;
                } else {
                    start = newStart;
                    end = newEnd;
                }
            } else {
                // COMPLEX PAGINATION with ELLIPSIS
                ellipsisBeforeCurrent =
                    this.currentPage > this.maxPagerItems - 4;
                ellipsisAfterCurrent = this.totalPages - this.currentPage > 4;

                if (ellipsisBeforeCurrent && ellipsisAfterCurrent) {
                    // 1 ... current-2, current-1, current, current+1, current+2 ... last
                    const halfRange = (this.maxPagerItems - 5) / 2;
                    start = this.currentPage - Math.floor(halfRange);
                    end = this.currentPage + Math.ceil(halfRange);
                } else if (ellipsisBeforeCurrent) {
                    // 1 ... last-6, last-5, last-4, last-3, last-2, last-1, last
                    start = this.totalPages - this.maxPagerItems + 3;
                } else if (ellipsisAfterCurrent) {
                    // 1, 2, 3, 4, 5, 6, 7 ... last
                    end = this.maxPagerItems - 2;
                }
            }
        }

        if (ellipsisBeforeCurrent) {
            output.push(1);
            output.push('...');
        }

        for (let i = start; i <= end; i++) {
            output.push(i);
        }

        if (ellipsisAfterCurrent) {
            output.push('...');
            output.push(this.totalPages);
        }

        return output;
    }

    public onPageButtonClick(pageIndex: number) {
        if (pageIndex !== this.currentPage) {
            this.paginationClick.emit({ pageIndex, pageSize: this.pageSize });
        }
    }
}
