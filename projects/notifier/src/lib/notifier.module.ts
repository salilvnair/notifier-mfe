import { UpdateNotifierDialog } from './core/update/update-dialog.component';
import { DownloadNotifierDialog } from './core/download/download-dialog.component';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { InfoNotifierComponent } from './components/info-notifier/info-notifier.component';
import { NotifierMaterialModule } from './core/module/notifier-material.module';
import { InfoNotifierDialog } from './core/info/info-dialog.component';
import { DownloadNotifierComponent } from './components/download-notifier/download-notifier.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { UpdateNotifierComponent } from './components/update-notifier/update-notifier.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    NotifierMaterialModule
   ],
  declarations: [
    InfoNotifierComponent,
    InfoNotifierDialog,
    DownloadNotifierDialog,
    DownloadNotifierComponent,
    UpdateNotifierComponent,
    UpdateNotifierDialog
  ],
  entryComponents: [
    InfoNotifierComponent,
    InfoNotifierDialog,
    DownloadNotifierDialog,
    DownloadNotifierComponent,
    UpdateNotifierComponent,
    UpdateNotifierDialog
  ]
})
export class NotifierModule {
  constructor(private injector: Injector ){
    const infoNotifier = createCustomElement(InfoNotifierComponent, { injector });
    // Register the custom element with the browser.
    customElements.define('info-notifier', infoNotifier);

    const downloadNotifier = createCustomElement(DownloadNotifierComponent, { injector });
    // Register the custom element with the browser.
    customElements.define('download-notifier', downloadNotifier);

    const updateNotifier = createCustomElement(UpdateNotifierComponent, { injector });
    // Register the custom element with the browser.
    customElements.define('update-notifier', updateNotifier);
  }
}
