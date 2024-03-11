import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnapShotPageComponent } from './snap-shot-page.component';

describe('SnapShotPageComponent', () => {
  let component: SnapShotPageComponent;
  let fixture: ComponentFixture<SnapShotPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SnapShotPageComponent]
    });
    fixture = TestBed.createComponent(SnapShotPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
