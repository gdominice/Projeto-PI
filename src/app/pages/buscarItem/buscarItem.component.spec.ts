import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarItemComponent } from './buscarItem.component';

describe('BuscarItemComponent', () => {
  let component: BuscarItemComponent;
  let fixture: ComponentFixture<BuscarItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
