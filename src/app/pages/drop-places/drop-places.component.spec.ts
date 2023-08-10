import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropPlacesComponent } from './drop-places.component';

describe('DropPlacesComponent', () => {
  let component: DropPlacesComponent;
  let fixture: ComponentFixture<DropPlacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropPlacesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
