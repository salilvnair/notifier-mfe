import { Component, Inject, ChangeDetectorRef, AfterViewInit, ViewChild, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DownloadDialogData } from './download-dialog-data.model';
import { ActionType } from '../update/type/update-action.enum';

@Component({
  templateUrl: './download-dialog.component.html',
  styleUrls:['./download-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DownloadNotifierDialog implements OnInit,AfterViewInit{
  intervalRef:any;
  disableInstall:boolean=true;
  onlyInstall:boolean=false;
  downloadAndInstall:boolean;
  installationStarted:boolean = false;
  installationCompleted:boolean = false;
  hasPendingInstallation:boolean = false;

  @ViewChild('progress', { static: false }) progress:ElementRef;

  @ViewChild('bar', { static: false }) bar:ElementRef;

  @ViewChild('header', { static: false }) header:ElementRef;
  constructor(
    public dialogRef: MatDialogRef<DownloadNotifierDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DownloadDialogData,
    private cdr:ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit',this.data);
    if(this.data && this.data.ActionType===ActionType.install){
      this.onlyInstall = true;
      this.disableInstall = false;
    }
    if(this.data && this.data.ActionType===ActionType.pending){
      this.onlyInstall = true;
      this.disableInstall = false;
      this.hasPendingInstallation = true;
    }
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit',this.data);
    if(this.data && this.data.ActionType===ActionType.install){
      this.intervalRef = setInterval(()=>{
        if(this.bar){
          if(!this.data.downloadStatus.currentPercentage){
            this.data.downloadStatus.currentPercentage = "0";
            this.installationStarted = true;
          }
          this.bar.nativeElement.style.width = this.data.downloadStatus.currentPercentage+"%";
          this.bar.nativeElement.innerHTML = this.data.downloadStatus.currentPercentage+"%";
        }
        if(this.data.downloadStatus.currentPercentage==="100"){
          this.header.nativeElement.innerHTML = "Installation complete please click restart!"
          this.disableInstall = true;
          this.installationCompleted = true;
          clearInterval(this.intervalRef);
        }
      }, 500)
    }
    else if(this.data && this.data.ActionType===ActionType.download){
      this.intervalRef = setInterval(()=>{

        if(this.bar){
          if(!this.data.downloadStatus.currentPercentage){
            this.data.downloadStatus.currentPercentage = "0.00";
          }
          this.bar.nativeElement.style.width = this.data.downloadStatus.currentPercentage+"%";
          this.bar.nativeElement.innerHTML = this.data.downloadStatus.currentPercentage+"%";
        }
        if(this.data.downloadStatus.currentPercentage==="100.00"){
          this.disableInstall = false;
          this.header.nativeElement.innerHTML = "Updates are ready to be installed!"
          clearInterval(this.intervalRef);
        }
      }, 500)
    }
    else if(this.data && this.data.ActionType===ActionType.downloadInstall){
      this.downloadAndInstall = true;
      this.cdr.detectChanges();
      this.intervalRef = setInterval(()=>{
        if(this.bar){
          if(!this.data.downloadStatus.currentPercentage){
            this.data.downloadStatus.currentPercentage = "0.00";
          }
          this.bar.nativeElement.style.width = this.data.downloadStatus.currentPercentage+"%";
          this.bar.nativeElement.innerHTML = this.data.downloadStatus.currentPercentage+"%";
        }
        if(this.data.downloadStatus.currentPercentage==="100.00"){
          this.header.nativeElement.innerHTML = "Updates are now being installed!"
          clearInterval(this.intervalRef);
          this.dialogRef.close(ActionType.install);
        }
      }, 500)
    }
  }

  onClickClose(): void {
    this.dialogRef.close(ActionType.close);
  }

  onClickRestart(): void {
    this.dialogRef.close(ActionType.restart);
  }

  onClickInstall(): void {
    this.dialogRef.close(ActionType.install);
   }
}
