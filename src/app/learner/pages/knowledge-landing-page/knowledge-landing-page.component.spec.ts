import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeLandingPageComponent } from './knowledge-landing-page.component';

describe('KnowledgeLandingPageComponent', () => {
  let component: KnowledgeLandingPageComponent;
  let fixture: ComponentFixture<KnowledgeLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowledgeLandingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgeLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
