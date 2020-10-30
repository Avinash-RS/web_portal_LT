import { Output, EventEmitter } from '@angular/core';
// import { Observable } from 'rxjs/internal/Observable';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export class SocketioService {
    socket;
    loginDetails: any;
    observer: any;
    @Output() change: EventEmitter<boolean> = new EventEmitter();

    constructor() {
        this.loginDetails = JSON.parse(localStorage.getItem('UserDetails')) || JSON.parse(sessionStorage.getItem('UserDetails'));
        this.socket = io(environment.socketio);
        if (this.loginDetails) {
            this.Connectsocket({type: 'connect'}).subscribe(quote => {
            });
        }
    }


    Connectsocket(type): Observable<number> {
        Observable.create(observer => {
            this.observer = observer;
        });
        this.loginDetails = JSON.parse(localStorage.getItem('UserDetails')) || JSON.parse(sessionStorage.getItem('UserDetails'));
        if (type.type === 'disconnect') {
            this.socket.emit('logout', this.loginDetails.user_id);
        }
        if (type.type === 'connect') {
            if (this.loginDetails) {
                console.log(this.loginDetails, 'M<MMMMM');
                this.socket.emit('info', this.loginDetails.user_id);
            }
        }
        this.socket.on('coursePlayerStatus', (msg: any) => {
            if (this.loginDetails.user_id === msg.user_id) {

                this.changeTrigger({
                    eventId: 'coursePlayerStatus',
                    data: msg,
                });
                this.observer.next(msg);
                this.newMessageReceived(msg);
            }
        });
        return this.createObservable();
    }

    createObservable(): Observable<number> {
        return new Observable<number>(observer => {
            this.observer = observer;
        });
    }
    public changeTrigger(event) {
        this.change.emit(event);
    }

    newMessageReceived(data) {
        const observable = new Observable<any>(observer => {
            observer.next(data);
        });
        return observable;
    }

}
