import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MandalaTwoComponent } from './mandala-two.component';

describe('MandalaTwoComponent', () => {
  let component: MandalaTwoComponent;
  let fixture: ComponentFixture<MandalaTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MandalaTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MandalaTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
