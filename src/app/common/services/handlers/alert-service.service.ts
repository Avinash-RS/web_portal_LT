import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AlertComponentComponent } from 'src/app/common/alert-component/alert-component.component';
@Injectable({
  providedIn: 'root'
})
export class AlertServiceService {

  constructor(public matDialog: MatDialog) { }

  public openAlert(title, msg) {
    console.log(title,msg)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { title: title, msg: msg ? msg : null };
    dialogConfig.width= '30%',
    dialogConfig.panelClass= 'custom-modalbox'
    this.matDialog.open(AlertComponentComponent, dialogConfig);
  }
}
