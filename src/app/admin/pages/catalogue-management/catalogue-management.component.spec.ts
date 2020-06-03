import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueManagementComponent } from './catalogue-management.component';

import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { SortPipe } from 'src/app/pipes/sort.pipe';
import { CommonModule } from '@angular/common';
import { toBase64String } from '@angular/compiler/src/output/source_map';

describe('CatalogueManagementComponent', () => {
  let component: CatalogueManagementComponent;
  let fixture: ComponentFixture<CatalogueManagementComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [SortPipe, CommonModule],
      declarations: [CatalogueManagementComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogueManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('click catalogue', () => {
    // fixture.detectChanges();
    component.clickCatalog();
    expect(component.showCourses = component.showHeader = component.showAddCatalogueForm = component.showCatalogDetail = false);
    expect(component.showListCatalogue).toBe(true);
    expect(component.catalog = {});
    component.getListCatalogue();
    expect(component.type).toBe(null);
    expect(component.courseList = component.catalogueList = []);
    expect(component.totalCount).toBe(null);
    expect(component.checked).toBe(false);
  });

  it('click name', () => {
    // fixture.detectChanges();
    component.clickCName();
    expect(component.showCourses = component.showHeader = component.showAddCatalogueForm = component.showCatalogDetail = false);
    expect(component.showHeader = component.showCatalogDetail = true);
    expect(component.type).toBe(null);
    expect(component.courseList = []);
    component.getCatalogDetail();
    expect(component.totalCount).toBe(null);
    expect(component.checked).toBe(false);
  });

  it('click cancel', () => {
    component.clickCancel();
    expect(component.showCatalogDetail = component.showHeader).toBe(true);
    expect(component.showAddCatalogueForm = component.showListCatalogue = component.showCourses = component.checked).toBe(false);
    expect(component.type).toBe(null);
    component.getCatalogDetail();
  });

});
