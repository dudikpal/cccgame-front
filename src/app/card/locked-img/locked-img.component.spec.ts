import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockedImgComponent } from './locked-img.component';

describe('LockedImgComponent', () => {
  let component: LockedImgComponent;
  let fixture: ComponentFixture<LockedImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LockedImgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LockedImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
