import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesAnalyticsComponent } from './sales-analytics.component';

describe('SalesAnalyticsComponent', () => {
  let component: SalesAnalyticsComponent;
  let fixture: ComponentFixture<SalesAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesAnalyticsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SalesAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
