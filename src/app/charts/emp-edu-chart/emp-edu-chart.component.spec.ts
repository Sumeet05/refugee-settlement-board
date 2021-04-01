import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpEduChartComponent } from './emp-edu-chart.component';

describe('EmpEduChartComponent', () => {
  let component: EmpEduChartComponent;
  let fixture: ComponentFixture<EmpEduChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpEduChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpEduChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
