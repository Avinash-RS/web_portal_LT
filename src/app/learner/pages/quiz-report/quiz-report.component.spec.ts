import { NO_ERRORS_SCHEMA } from "@angular/core";
import { QuizReportComponent } from "./quiz-report.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("QuizReportComponent", () => {

  let fixture: ComponentFixture<QuizReportComponent>;
  let component: QuizReportComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [QuizReportComponent]
    });

    fixture = TestBed.createComponent(QuizReportComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
