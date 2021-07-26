import { NO_ERRORS_SCHEMA } from "@angular/core";
import { QuestionanswerComponent } from "./questionanswer.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("QuestionanswerComponent", () => {

  let fixture: ComponentFixture<QuestionanswerComponent>;
  let component: QuestionanswerComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [QuestionanswerComponent]
    });

    fixture = TestBed.createComponent(QuestionanswerComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
