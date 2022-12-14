import { Output, EventEmitter, Injectable } from '@angular/core';
// import { Observable } from 'rxjs/internal/Observable';
// import { io }from 'socket.io-client';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';
@Injectable()
export class SocketioService {
    socket: any;
    loginDetails: any;
    observer: any;
    @Output() change: EventEmitter<boolean> = new EventEmitter();
    secretKey = '(!@#Passcode!@#)';
    constructor() {
        this.loginDetails = JSON.parse(localStorage.getItem('UserDetails')) ;
       // this.socket = io(environment.socketio);
        // if (this.loginDetails) {
        //     this.Connectsocket({type: 'connect'}).subscribe(quote => {
        //     });
        // }
    }


    Connectsocket(type): Observable<number> {
        this.socket = io(environment.socketio);
        Observable.create(observer => {
            this.observer = observer;
        });
        this.loginDetails = JSON.parse(localStorage.getItem('UserDetails')) ;
        this.loginDetails.user_id = CryptoJS.AES.decrypt( this.loginDetails.user_id, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
        if (type.type === 'disconnect') {
            this.socket.emit('logout', this.loginDetails.user_id);
        }
        if (type.type === 'connect') {
            if (this.loginDetails) {
                this.socket.emit('info', this.loginDetails.user_id);
            }
        }
        return this.createObservable();
    }
    socketReceiver() {
       // console.log(this.loginDetails.user_id,"inside serveive")
        this.socket.on('coursePlayerStatus', (msg: any) => {
            console.log(msg, 'inside serveive');
            if (this.loginDetails.user_id === msg.user_id) {

                this.changeTrigger({
                    eventId: 'coursePlayerStatus',
                    data: msg,
                });
                this.observer.next(msg);
                this.newMessageReceived(msg);
            }
        });
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
    closeSocket() {
        if (this.socket.connected) {
        this.socket.removeAllListeners('coursePlayerStatus');
        this.socket.off('coursePlayerStatus');
        this.socket.off('disconnect', this.Connectsocket);
        }
    }

    socketStatus() {
        console.log("Socket Connected = ",this.socket.connected)
    }
}
