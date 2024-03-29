import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { HomeComponent } from './components/home/home.component';
import { LoaderComponent } from './components/loader/loader.component';

import { LoginService } from './services/login.service';
import { NprPipe } from './pipes/npr.pipe';
import { EllipsisPipe } from './pipes/ellipsis.pipe';
import { RealtimeService } from './services/realtime.service';
import { PopupComponent } from './components/popup/popup.component';
import { YesNoPopupComponent } from './components/yes-no-popup/yes-no-popup.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    NotfoundComponent,
    HomeComponent,
    LoaderComponent,
    NprPipe,
    EllipsisPipe,
    PopupComponent,
    YesNoPopupComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatDialogModule,
  ],
  exports: [
    ToolbarComponent,
    NotfoundComponent,
    HomeComponent,
    LoaderComponent,
    EllipsisPipe,
    NprPipe,
  ],
  providers: [
    LoginService,
    RealtimeService,
  ]
})
export class SharedModule {}
