import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatedTextComponent } from './translatedText';



describe('TranslatedTextComponent', () => {
  let component: TranslatedTextComponent;
  let fixture: ComponentFixture<TranslatedTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TranslatedTextComponent]
    });
    fixture = TestBed.createComponent(TranslatedTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
