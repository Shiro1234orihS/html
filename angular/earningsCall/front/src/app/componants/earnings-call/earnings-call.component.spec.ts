import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningsCallComponent } from './earnings-call.component';

describe('EarningsCallComponent', () => {
  let component: EarningsCallComponent;
  let fixture: ComponentFixture<EarningsCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EarningsCallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EarningsCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
