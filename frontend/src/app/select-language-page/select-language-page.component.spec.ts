import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectLanguagePageComponent } from './select-language-page.component';

describe('SelectLanguagePageComponent', () => {
  let component: SelectLanguagePageComponent;
  let fixture: ComponentFixture<SelectLanguagePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectLanguagePageComponent]
    });
    fixture = TestBed.createComponent(SelectLanguagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
