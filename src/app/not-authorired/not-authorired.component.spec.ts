import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAuthoriredComponent } from './not-authorired.component';

describe('NotAuthoriredComponent', () => {
  let component: NotAuthoriredComponent;
  let fixture: ComponentFixture<NotAuthoriredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotAuthoriredComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotAuthoriredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
