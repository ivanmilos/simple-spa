import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { Dictionary } from 'src/app/enums/dictionary.enum';
import { Router } from '@angular/router';
import { NavRoutes } from '../app-routing.constants';

@Injectable({
    providedIn: 'root',
})
export class ErrorsService {
    constructor(
        private messageService: MessageService,
        private router: Router
    ) {}

    handleError(error) {
        switch (error.status) {
            case 404:
                this.messageService.display(
                    Dictionary.ERR_PAGE_NOT_FOUND,
                    'error'
                );
                this.router.navigate(['/' + NavRoutes.HOME], {
                    replaceUrl: true,
                });
                break;
            case 500:
                this.messageService.display(
                    Dictionary.ERR_UNHANDLED_EXCEPTION,
                    'error'
                );
                break;
            default:
                const message = `Error ${error.status}: ${error.error.message}`;
                this.messageService.display(message, 'error');
                break;
        }
    }
}
