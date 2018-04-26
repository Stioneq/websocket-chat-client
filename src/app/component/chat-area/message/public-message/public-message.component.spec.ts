import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicMessageComponent } from './public-message.component';

describe('PublicMessageComponent', () => {
  let component: PublicMessageComponent;
  let fixture: ComponentFixture<PublicMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
