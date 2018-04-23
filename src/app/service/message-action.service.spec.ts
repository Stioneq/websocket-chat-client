import { TestBed, inject } from '@angular/core/testing';

import { MessageActionService } from './message-action.service';

describe('MessageActionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageActionService]
    });
  });

  it('should be created', inject([MessageActionService], (service: MessageActionService) => {
    expect(service).toBeTruthy();
  }));
});
