import { Component, OnInit, Input } from '@angular/core';
import { InfoNotifier } from '../../core/info/info.notifier';

@Component({
  selector: 'lib-info-notifier',
  templateUrl: './info-notifier.component.html',
  styleUrls: ['./info-notifier.component.css']
})
export class InfoNotifierComponent implements OnInit {

  @Input() infoData: any;
  @Input() width: string;

  constructor(private infoNotifier: InfoNotifier) { }

  ngOnInit() {
    this.infoNotifier.notify(this.infoData, this.width);
  }

}
