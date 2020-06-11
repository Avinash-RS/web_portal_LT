import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsComponent } from './reports.component';
import { MatTableModule, MatDialogModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ApolloModule } from 'apollo-angular';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { AdminServicesService } from '@admin/services/admin-services.service';
describe('ReportsComponent', () => {
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        ApolloModule,
        HttpClientModule,
        RouterModule.forRoot([]),
        MatDialogModule,
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      declarations: [ ReportsComponent ],
      providers: [GlobalServiceService,AdminServicesService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('downloaddoc', () => {
    // expect(component).toBeTruthy();
const event = {
  url:"abc"
}

component.downloadDoc(event);
// expect(component.location.href)
expect(component.window.location.href).toContain(event.url)

  });
});
