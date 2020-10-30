import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeResourceHomeComponent } from './knowledge-resource-home.component';

describe('KnowledgeResourceHomeComponent', () => {
  let component: KnowledgeResourceHomeComponent;
  let fixture: ComponentFixture<KnowledgeResourceHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowledgeResourceHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgeResourceHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
