import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactorioGraphComponent } from './factorio-graph.component';

describe('FactorioGraphComponent', () => {
  let component: FactorioGraphComponent;
  let fixture: ComponentFixture<FactorioGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactorioGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FactorioGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
