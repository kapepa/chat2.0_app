import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribersCardComponent } from './subscribers-card.component';

describe('SubscribersCardComponent', () => {
  let component: SubscribersCardComponent;
  let fixture: ComponentFixture<SubscribersCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscribersCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscribersCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
