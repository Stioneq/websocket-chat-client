import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {WebsocketService} from './service/websocket.service';
import {UserListComponent} from './component/user-list/user-list.component';
import {ChatAreaComponent} from './component/chat-area/chat-area.component';
import {UserInfoComponent} from './component/user-info/user-info.component';
import {LocalStorageService} from './service/local-storage.service';
import {UserInfoService} from './service/user-info.service';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { ProgressComponent } from './component/progress/progress.component';
import { ChatInputComponent } from './component/chat-input/chat-input.component';
import {TooltipService} from './service/tooltip.service';
import {MessageActionService} from './service/message-action.service';
import {AuthInterceptor} from './interceptor/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    ChatAreaComponent,
    UserInfoComponent,
    ProgressComponent,
    ChatInputComponent
  ],
  imports: [
    BrowserModule, HttpClientModule
  ],
  providers: [WebsocketService, LocalStorageService, TooltipService, UserInfoService, MessageActionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [UserInfoComponent]
})
export class AppModule {
}
