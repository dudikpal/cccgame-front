import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseCardListComponent } from './base-card-list.component';

describe('BaseCardListComponent', () => {
  let component: BaseCardListComponent;
  let fixture: ComponentFixture<BaseCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseCardListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
