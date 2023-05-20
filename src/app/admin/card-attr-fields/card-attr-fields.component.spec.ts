import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAttrFieldsComponent } from './card-attr-fields.component';

describe('CardAttrFieldsComponent', () => {
  let component: CardAttrFieldsComponent;
  let fixture: ComponentFixture<CardAttrFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardAttrFieldsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardAttrFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
