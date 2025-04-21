import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpiderChartDemoComponent } from './spider-chart-demo.component';

describe('SpiderChartComponent', () => {
  let component: SpiderChartDemoComponent;
  let fixture: ComponentFixture<SpiderChartDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpiderChartDemoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpiderChartDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
