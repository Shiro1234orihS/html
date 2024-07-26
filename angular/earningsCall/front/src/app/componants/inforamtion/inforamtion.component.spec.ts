import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InforamtionComponent } from './inforamtion.component';

describe('InforamtionComponent', () => {
  let component: InforamtionComponent;
  let fixture: ComponentFixture<InforamtionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InforamtionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InforamtionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
