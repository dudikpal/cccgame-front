import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextVarSizeBlockComponent } from './text-var-size-block.component';

describe('TextVarSizeBlockComponent', () => {
  let component: TextVarSizeBlockComponent;
  let fixture: ComponentFixture<TextVarSizeBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextVarSizeBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextVarSizeBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
