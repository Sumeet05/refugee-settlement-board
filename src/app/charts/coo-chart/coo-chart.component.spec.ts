import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CooChartComponent } from './coo-chart.component';

describe('CooChartComponent', () => {
  let component: CooChartComponent;
  let fixture: ComponentFixture<CooChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CooChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CooChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
