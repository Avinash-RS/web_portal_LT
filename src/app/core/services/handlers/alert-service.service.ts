import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AlertComponentComponent } from '@core/shared/alert-component/alert-component.component';
@Injectable({
  providedIn: 'root'
})
export class AlertServiceService {
  constructor(public matDialog: MatDialog) { }

  public openAlert(title, msg) {
    if (this.matDialog.openDialogs.length === 0) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = { title, msg: msg ? msg : null, type: 'showClose' };
      dialogConfig.width = '30%',
      dialogConfig.panelClass = 'custom-modalbox',
      dialogConfig.hasBackdrop = true;
      dialogConfig.disableClose = true;
      const dialogRef = this.matDialog.open(AlertComponentComponent, dialogConfig);
    }
  }

  public openConfirmAlert(title, msg, confirmText?, cancelText?) {
    if (this.matDialog.openDialogs.length === 0) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = { title, msg: msg ? msg : null, type: 'confirmAlert', confirmText : confirmText ? confirmText : 'Yes' ,
    cancelText : cancelText ? cancelText : 'No'};
      dialogConfig.width = '30%',
      dialogConfig.disableClose = true;
      dialogConfig.panelClass = 'custom-modalbox';
      const dialogRef = this.matDialog.open(AlertComponentComponent, dialogConfig);
      return new Promise((resolve) => {
        dialogRef.afterClosed().subscribe(result => {
          resolve(result);
        });
      });
    }
  }
}
