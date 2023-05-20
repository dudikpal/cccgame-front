import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBasecardsComponent } from './manage-basecards.component';

describe('ManageBasecardsComponent', () => {
  let component: ManageBasecardsComponent;
  let fixture: ComponentFixture<ManageBasecardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageBasecardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageBasecardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
