import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsPairingComponent } from './cards-pairing.component';

describe('CardsPairingComponent', () => {
  let component: CardsPairingComponent;
  let fixture: ComponentFixture<CardsPairingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsPairingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsPairingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
