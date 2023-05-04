import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralWidgetComponent } from './general-widget.component';

describe('GeneralWidgetComponent', () => {
  let component: GeneralWidgetComponent;
  let fixture: ComponentFixture<GeneralWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
