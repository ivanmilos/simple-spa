import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    constructor() {}

    display(message: string, type?: 'error' | 'success') {
        // TODO build a custom notification service
        window.alert(message);
    }
}
