import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NumberOnlyDirective } from './number-only.directive';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('Directive: NumberOnlyDirective', () => {
  let component: TestNumberOnlyComponent;
  let fixture: ComponentFixture<TestNumberOnlyComponent>;
  let inputEl: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NumberOnlyDirective, TestNumberOnlyComponent]
    });

    fixture = TestBed.createComponent(TestNumberOnlyComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
  });

  it('should prevent to input char', () => {
    const event = new KeyboardEvent("keydown", { "key": "a", cancelable: true });
    const el = inputEl.nativeElement;
    const spy = spyOn(event , 'preventDefault').and.callThrough();
    el.dispatchEvent(event);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should allow to input number', () => {
    const event = new KeyboardEvent("keydown", { "key": "7", cancelable: true });
    const el = inputEl.nativeElement;
    const spy = spyOn(event , 'preventDefault').and.callThrough();
    el.dispatchEvent(event);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(0);
  });


  it('should allow to press special key like Backspace', () => {
    const event = new KeyboardEvent("keydown", { "key": "Backspace", cancelable: true });
    const el = inputEl.nativeElement;
    const spy = spyOn(event , 'preventDefault').and.callThrough();
    el.dispatchEvent(event);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(0);
  });
});

@Component({
  template: "<input type='text' value='' NumberOnly>"
})
class TestNumberOnlyComponent {
}