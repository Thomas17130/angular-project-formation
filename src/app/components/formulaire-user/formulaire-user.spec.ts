import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireUser } from './formulaire-user';

describe('FormulaireUser', () => {
  let component: FormulaireUser;
  let fixture: ComponentFixture<FormulaireUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulaireUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
