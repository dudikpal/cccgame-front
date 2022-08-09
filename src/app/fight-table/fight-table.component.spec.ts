import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FightTableComponent } from './fight-table.component';

describe('FightTableComponent', () => {
  let component: FightTableComponent;
  let fixture: ComponentFixture<FightTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FightTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FightTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
