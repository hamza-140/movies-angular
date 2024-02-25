import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxChartComponent } from './box-chart-component.component';

describe('BoxChartComponentComponent', () => {
  let component: BoxChartComponent;
  let fixture: ComponentFixture<BoxChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoxChartComponent]
    });
    fixture = TestBed.createComponent(BoxChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
