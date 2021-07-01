import { NO_ERRORS_SCHEMA } from "@angular/core";
import { LearnerNewMyCourseComponent } from "./learner-new-my-course.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("LearnerNewMyCourseComponent", () => {

  let fixture: ComponentFixture<LearnerNewMyCourseComponent>;
  let component: LearnerNewMyCourseComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [LearnerNewMyCourseComponent]
    });

    fixture = TestBed.createComponent(LearnerNewMyCourseComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
