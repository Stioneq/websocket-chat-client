import { TestBed, inject } from '@angular/core/testing';

import {MessageActionsLocatorService} from './message-actions-locator.service';

describe('MessageActionsLocatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageActionsLocatorService]
    });
  });

  it('should be created', inject([MessageActionsLocatorService], (service: MessageActionsLocatorService) => {
    expect(service).toBeTruthy();
  }));
});
