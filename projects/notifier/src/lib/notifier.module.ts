import { NgModule } from '@angular/core';
import { UpdateNotifierModule } from './core/module/update-notifier.module';
import { DownloadNotifierModule } from './core/module/download-notifier.module';
import { InfoNotifierModule } from './core/module/info-notifier.module';
import { InfoNotifierComponent } from './components/info-notifier/info-notifier.component';

const IMPORT_EXPORT_MODULE_ARRAY = [
  UpdateNotifierModule,
  DownloadNotifierModule,
  InfoNotifierModule
];

@NgModule({
  imports: [IMPORT_EXPORT_MODULE_ARRAY],
  exports: [IMPORT_EXPORT_MODULE_ARRAY],
  declarations: [ InfoNotifierComponent ],
  entryComponents: [ InfoNotifierComponent ]
})
export class NotifierModule { }
