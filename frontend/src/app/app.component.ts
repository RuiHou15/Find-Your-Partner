import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { AuthenticationService } from './services';
import { User } from './models';



@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private bnIdle: BnNgIdleService,
        public dialog: MatDialog
    ) {

        this.bnIdle.startWatching(300)
            .subscribe((res) => {
                if (res && this.isOnline()) {
                    this.bnIdle.stopTimer();
                    this.openDialog();
                }
            });
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    isOnline() {
    	return this.currentUser != undefined;
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

    login() {
    	this.router.navigate(['/login']);
    }

    openDialog() {
        const dialogRef = this.dialog.open(SessionExpiredDialog, {
          width: '250px',
          data: this.currentUser
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == "no") {
          this.logout();
      } else {
        this.bnIdle.resetTimer();
      }
    });
    }

    gotoProfile() {
      this.router.navigate([`/profile/${this.currentUser.user_id}`]);
    }
}



@Component({
  selector: 'session-expired-dialog',
  templateUrl: 'session-expired-dialog.html',
})
export class SessionExpiredDialog {

  constructor(
      public dialogRef: MatDialogRef<SessionExpiredDialog>,
      @Inject(MAT_DIALOG_DATA) public data: User) {}

  onNoClick(): void {
    this.dialogRef.close('no');
  }

  onYesClick(): void {
      this.dialogRef.close('yes');
  }

}