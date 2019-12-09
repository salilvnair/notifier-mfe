import { InfoNotifierDialog } from './../../core/info/info-dialog.component';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'lib-info-notifier',
  templateUrl: './info-notifier.component.html',
  styleUrls: ['./info-notifier.component.css']
})
export class InfoNotifierComponent implements OnInit {

  @Input() info: string;
  @Input() width: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.show();
  }

  show() {
    this.dialog.open(InfoNotifierDialog, {
      width: this.width||'250px',
      data: {info: this.info},
      closeOnNavigation: false,
      disableClose:true
    });
  }

}
