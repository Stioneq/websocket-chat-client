import {inject, TestBed} from '@angular/core/testing';

import {LocalStorageService} from './local-storage.service';

describe('LocalStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService]
    });
  });

  it('should be created', inject([LocalStorageService], (service: LocalStorageService) => {
    service.getSubscription('userInfo').subscribe(() => {
      console.log(2);
    });
    service.setValue('userInfo_userId', 'test');
  }));
});
