import { NotifierAction } from './../../core/update/model/update-action.model';
import { DownloadNotifierType } from './../../core/update/model/download-status.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DownloadNotifier } from '../../core/download/download.notifier';
import { ActionType } from '../../core/update/type/update-action.enum';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'lib-download-notifier',
  templateUrl: './download-notifier.component.html',
  styleUrls: ['./download-notifier.component.css']
})
export class DownloadNotifierComponent implements OnInit {
  @Input('downloadnotifier')
  downloadNotifierObserver:Observable<DownloadNotifierType>;
  @Input('action')
  actionType:ActionType;

  @Output('ondownload')
  downloadNotifierEvent:EventEmitter<NotifierAction> = new EventEmitter<NotifierAction>();

  sub:Subscription;

  constructor(private downloadNotifier:DownloadNotifier) { }

  ngOnInit() {
    this.show();
  }

  show() {
    this.sub = this.downloadNotifier.notify(this.downloadNotifierObserver, this.actionType).subscribe(data => {
      this.downloadNotifierEvent.emit(data);
      this.sub.unsubscribe();
    });
  }

}
