import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {WebsocketService} from './service/websocket.service';
import {UserListComponent} from './component/user-list/user-list.component';
import {ChatAreaComponent} from './component/chat-area/chat-area.component';
import {UserInfoComponent} from './component/user-info/user-info.component';
import {LocalStorageService} from './service/local-storage.service';
import {UserInfoService} from './service/user-info.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ProgressComponent} from './component/progress/progress.component';
import {ChatInputComponent} from './component/chat-input/chat-input.component';
import {AuthInterceptor} from './interceptor/auth.interceptor';
import {MessageActionsLocatorService} from './service/message-actions-locator.service';
import {MessageAction} from './model/message-action';
import {HelpMessageAction} from './service/actions/help-message-action.service';
import {WhisperMessageAction} from './service/actions/whisper-message-action.service';
import {MessageService} from './service/message.service';
import {DefaultMessageAction} from './service/actions/default-message-action.service';
import {SystemMessageComponent} from './component/chat-area/message/system-message/system-message.component';
import {PrivateMessageComponent} from './component/chat-area/message/private-message/private-message.component';
import {PublicMessageComponent} from './component/chat-area/message/public-message/public-message.component';
import {MessageViewDirective} from './component/chat-area/message/message-view.directive';
import {MessageViewComponent} from './component/chat-area/message/message-view.component';


@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    ChatAreaComponent,
    UserInfoComponent,
    ProgressComponent,
    ChatInputComponent,
    MessageViewDirective,
    MessageViewComponent,
    SystemMessageComponent,
    PrivateMessageComponent,
    PublicMessageComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule
  ],
  entryComponents: [SystemMessageComponent,
    PrivateMessageComponent,
    PublicMessageComponent],
  providers: [WebsocketService, LocalStorageService,
    UserInfoService,
    MessageService,
    DefaultMessageAction,
    {
      provide: 'MessageAction',
      useClass: HelpMessageAction,
      multi: true,
    },
    {
      provide: 'MessageAction',
      useClass: WhisperMessageAction,
      multi: true,
    },
    MessageActionsLocatorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
