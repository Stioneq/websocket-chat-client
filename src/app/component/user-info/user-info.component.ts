import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {UserInfo} from '../../model/user-info';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.styl']
})
export class UserInfoComponent implements OnInit {
  showDialog = true;

  @ViewChild('name') nameInput;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  cancel() {
    this.showDialog = false;
  }

  ok() {
    /*this.userInfoService.setUserInfo({name: this.nameInput.nativeElement.value, icon: ''});*/
    this.showDialog = false;
  }

}
