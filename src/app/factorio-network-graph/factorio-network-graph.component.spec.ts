import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactorioNetworkGraphComponent } from './factorio-network-graph.component';

describe('FactorioNetworkGraphComponent', () => {
  let component: FactorioNetworkGraphComponent;
  let fixture: ComponentFixture<FactorioNetworkGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactorioNetworkGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FactorioNetworkGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
