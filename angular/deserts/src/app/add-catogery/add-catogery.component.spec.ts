import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCatogeryComponent } from './add-catogery.component';

describe('AddCatogeryComponent', () => {
  let component: AddCatogeryComponent;
  let fixture: ComponentFixture<AddCatogeryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCatogeryComponent]
    });
    fixture = TestBed.createComponent(AddCatogeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
