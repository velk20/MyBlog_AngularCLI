import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardListViewComponent } from './card-list-view.component';

describe('CardListViewComponent', () => {
  let component: CardListViewComponent;
  let fixture: ComponentFixture<CardListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
