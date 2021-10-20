//this is wrong file not use in our project

// import { EventEmitter, Output } from '@angular/core';
// import { Observable } from 'rxjs';
// // import { Observable } from 'rxjs/internal/Observable';
// import * as io from 'socket.io-client';
// import * as CryptoJS from 'crypto-js';
// import { environment } from '../../../environments/environment';
// import { debug } from 'console';

// export class SocketioService {
//     socket: any;
//     loginDetails: any;
//     observer: any;
//     secretKey = "(!@#Passcode!@#)";

//     @Output() change: EventEmitter<boolean> = new EventEmitter();


//     constructor() {
//         debugger
//         this.loginDetails = JSON.parse(localStorage.getItem('UserDetails'));
//         this.socket = io(environment.socketio);
//         if (this.loginDetails) {
//             this.Connectsocket({type: 'connect'}).subscribe(quote => {
//             });
//         }
//     }


//     Connectsocket(type): Observable<number> {
//         Observable.create(observer => {
//             this.observer = observer;
//         });
//         debugger;
//         this.loginDetails = JSON.parse(localStorage.getItem('UserDetails'));
//         this.loginDetails.user_id = CryptoJS.AES.decrypt( this.loginDetails.user_id, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
//         console.log(this.loginDetails.user_id,"inside serveive")
//         if (type.type === 'disconnect') {
//             this.socket.emit('logout', this.loginDetails.user_id);
//         }
//         if (type.type === 'connect') {
//             if (this.loginDetails) {
//                 this.socket.emit('info', this.loginDetails.user_id);
//             }
//         }
//         this.socket.on('coursePlayerStatus', (msg: any) => {
//             //console.log(msg,"inside serveive")
//             if (this.loginDetails.user_id === msg.user_id) {
//                 this.changeTrigger({
//                     eventId: 'coursePlayerStatus',
//                     data: msg,
//                 });
//                 this.observer.next(msg);
//                 this.newMessageReceived(msg);
//             }
//         });
//         return this.createObservable();
//     }

//     createObservable(): Observable<number> {
//         return new Observable<number>(observer => {
//             this.observer = observer;
//         });
//     }
//     public changeTrigger(event) {
//         this.change.emit(event);
//     }

//     newMessageReceived(data) {
//         const observable = new Observable<any>(observer => {
//             observer.next(data);
//         });
//         return observable;
//     }

// }
