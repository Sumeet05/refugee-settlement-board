import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoaChartComponent } from './doa-chart.component';

describe('DoaChartComponent', () => {
  let component: DoaChartComponent;
  let fixture: ComponentFixture<DoaChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoaChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoaChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
