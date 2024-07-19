import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCatogeryComponent } from './get-catogery.component';

describe('GetCatogeryComponent', () => {
  let component: GetCatogeryComponent;
  let fixture: ComponentFixture<GetCatogeryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetCatogeryComponent]
    });
    fixture = TestBed.createComponent(GetCatogeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
