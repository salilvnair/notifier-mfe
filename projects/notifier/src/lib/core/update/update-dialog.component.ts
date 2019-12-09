import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActionType } from './type/update-action.enum';
import { AppUpadateStatus } from './model/app-update-status.model';
import { AppReleaseInfo } from './model/app-release.model';
import { ViewEncapsulation } from '@angular/compiler/src/core';

@Component({
  templateUrl: './update-dialog.component.html',
  styleUrls:['./update-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UpdateNotifierDialog implements OnInit, OnDestroy {
  appReleaseInfo:AppReleaseInfo;

  ngOnDestroy(): void {
  }
  ngOnInit(): void {
    this.appReleaseInfo = this.data.appReleaseInfo
    JSON.stringify(this.appReleaseInfo);
  }
  constructor(
    public dialogRef: MatDialogRef<UpdateNotifierDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AppUpadateStatus
  ) {}

  onClickRemind(): void {
    this.dialogRef.close(ActionType.remind);
  }
  onClickDownload(): void {
    this.dialogRef.close(ActionType.download);
  }
  onClickDownloadInstall(): void {
    this.dialogRef.close(ActionType.downloadInstall);
  }
}
