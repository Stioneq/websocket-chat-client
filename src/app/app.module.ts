import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {WebsocketService} from './service/websocket.service';
import { UserListComponent } from './component/user-list/user-list.component';
import { ChatAreaComponent } from './component/chat-area/chat-area.component';
import {CommonModule, DatePipe} from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    ChatAreaComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
