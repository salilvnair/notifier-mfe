import { NotifierAction } from './../../core/update/model/update-action.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UpdateNotifier } from '../../core/update/update.notifier';
import { AppUpadateStatus } from '../../core/update/model/app-update-status.model';
import { Subscription } from 'rxjs';
import { ViewEncapsulation } from '@angular/compiler/src/core';

@Component({
  selector: 'lib-update-notifier',
  templateUrl: './update-notifier.component.html',
  styleUrls: ['./update-notifier.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UpdateNotifierComponent implements OnInit {


  updateStatus:AppUpadateStatus
  sub:Subscription;
  @Input('data')
  public set data(data : AppUpadateStatus) {
    this.updateStatus = data;
    this.show();
  }

  public get data() : AppUpadateStatus {
    return this.updateStatus;
  }



  @Output('onupdate')
  updateNotifierEvent:EventEmitter<NotifierAction> = new EventEmitter<NotifierAction>();
  constructor(private updateNotifier: UpdateNotifier) { }

  ngOnInit() {}

  show() {
    this.sub = this.updateNotifier
      .notify(this.data)
      .subscribe(action => {
        console.log('fire',action);
        this.updateNotifierEvent.emit(action);
        this.sub.unsubscribe();
      });
  }

}
