import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {UserInfo} from '../../model/user-info';
import {UserInfoService} from '../../service/user-info.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.styl']
})
export class UserInfoComponent implements OnInit {
  showDialog = true;

  @ViewChild("name") nameInput;

  constructor(private userInfoService: UserInfoService) {
  }

  ngOnInit() {
  }

  cancel() {
    this.showDialog = false;
  }

  ok() {
    this.userInfoService.setUserInfo({name: this.nameInput.value, icon: ''});
    this.showDialog = false;
  }

}
