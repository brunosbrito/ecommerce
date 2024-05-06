import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCheckoutComponent } from './dialog-checkout.component';

describe('DialogCheckoutComponent', () => {
  let component: DialogCheckoutComponent;
  let fixture: ComponentFixture<DialogCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCheckoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
