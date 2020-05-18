import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleRepositoryComponent } from './module-repository.component';

describe('ModuleRepositoryComponent', () => {
  let component: ModuleRepositoryComponent;
  let fixture: ComponentFixture<ModuleRepositoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleRepositoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleRepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
