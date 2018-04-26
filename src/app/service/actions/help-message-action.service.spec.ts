import { TestBed, inject } from '@angular/core/testing';

import { HelpMessageAction } from './help-message-action.service';

describe('HelpMessageActionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HelpMessageAction]
    });
  });

  it('should be created', inject([HelpMessageAction], (service: HelpMessageAction) => {
    expect(service).toBeTruthy();
  }));
});
