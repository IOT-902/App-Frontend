import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCardIcon } from './info-card-icon';

describe('InfoCardIcon', () => {
  let component: InfoCardIcon;
  let fixture: ComponentFixture<InfoCardIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoCardIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoCardIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
