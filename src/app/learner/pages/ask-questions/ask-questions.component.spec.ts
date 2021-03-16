import { NO_ERRORS_SCHEMA } from "@angular/core";
import { AskQuestionsComponent } from "./ask-questions.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("AskQuestionsComponent", () => {

  let fixture: ComponentFixture<AskQuestionsComponent>;
  let component: AskQuestionsComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [AskQuestionsComponent]
    });

    fixture = TestBed.createComponent(AskQuestionsComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
