
import { ErrorHandler } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  
  handleError(error: any): void {
   const chunkFailedMessage = /ChunkLoadError/;
    console.log('fromerrorhandler',error)
    if (chunkFailedMessage.test(error.message)) {
      window.location.reload();
    }
  }
}