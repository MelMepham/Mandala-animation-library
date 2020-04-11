import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MandalaOneComponent } from './mandala-one.component';

describe('MandalaOneComponent', () => {
  let component: MandalaOneComponent;
  let fixture: ComponentFixture<MandalaOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MandalaOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MandalaOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
