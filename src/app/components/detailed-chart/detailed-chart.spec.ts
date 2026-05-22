import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDetailedChartComponent } from './detailed-chart';

describe('AppDetailedChartComponent', () => {
  let component: AppDetailedChartComponent;
  let fixture: ComponentFixture<AppDetailedChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppDetailedChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppDetailedChartComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
