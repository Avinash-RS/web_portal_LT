import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ProgramReportComponent } from "./program-report.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("ProgramReportComponent", () => {

  let fixture: ComponentFixture<ProgramReportComponent>;
  let component: ProgramReportComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [ProgramReportComponent]
    });

    fixture = TestBed.createComponent(ProgramReportComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
