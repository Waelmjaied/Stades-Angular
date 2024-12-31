import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdherantsComponent } from './adherants.component';

describe('AdherantsComponent', () => {
  let component: AdherantsComponent;
  let fixture: ComponentFixture<AdherantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdherantsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdherantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
