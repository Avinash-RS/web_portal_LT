// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.

// const context = require.context('../src/app/learner/pages/login/login.component', true, /\.spec\.ts$/);
// const context = require.context('./app/core/shared/course-component.component', true, /\.spec\.ts$/);
// const context = require.context('./app/wca/pages/create-course', true, /create-course.component\.spec\.ts$/);

// const context = require.context('../src/app/learner/pages/login/login.component', true, /\.spec\.ts$/);
// const context = require.context('./app/admin/admin-login', true, /admin-login.component\.spec\.ts$/);
// const context = require.context('./app/admin/pages/user-management', true, /user-management.component\.spec\.ts$/);
// const context = require.context('./app/admin/pages/admin-courses', true, /admin-courses.component\.spec\.ts$/);
// const context = require.context('./app/learner/pages/learner-my-course', true, /admin-courses.component\.spec\.ts$/);
// And load the modules.
// const context = require.context('../src/app/learner/pages/login/', true,/login.component\.spec\.ts$/);


// const context = require.context('./app/admin/pages/catalogue-management', true, /catalogue-management.component\.spec\.ts$/);
// const context = require.context('./app/admin/pages/category-management', true, /category-management.component\.spec\.ts$/);


// const context = require.context('./app/learner/pages/landingpage', true, /landingpage.component\.spec\.ts$/);
// const context = require.context('./app/core/shared/wishlist-courses', true, /wishlist-courses.component\.spec\.ts$/);
// const context = require.context('./app/core/shared/list-view-course-component', true, /list-view-course-component.component\.spec\.ts$/);
// const context = require.context('./app/core/shared/alert-component', true, /alert-component.component\.spec\.ts$/);

const context = require.context('./app/learner/pages/termsconditions', true, /termsconditions.component\.spec\.ts$/);

context.keys().map(context);
