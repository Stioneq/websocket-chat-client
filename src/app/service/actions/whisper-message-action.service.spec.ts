import { TestBed, inject } from '@angular/core/testing';

import { HelpMessageAction } from './help-message-action.service';
import {WhisperMessageAction} from './whisper-message-action.service';

describe('WhisperMessageAction', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WhisperMessageAction]
    });
  });

  it('should be created', inject([WhisperMessageAction], (service: WhisperMessageAction) => {
    expect(service).toBeTruthy();
  }));
});
