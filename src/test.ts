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
// const context = require.context('./app/learner/pages/login', true, /login.component\.spec\.ts$/);
//  const context = require.context('./app/admin/pages/admin-courses', false, /admin-courses.component\.spec\.ts$/);
// const context = require.context('./app/learner/pages/learner-my-course', false, /learner-my-course.component\.spec\.ts$/);
//  const context = require.context('./app/admin/pages/user-management', false, /user-management.component\.spec\.ts$/);
// const context = require.context('./app/admin/admin-login', false, /admin-login.component\.spec\.ts$/);
// And load the modules.
// const context = require.context('../src/app/learner/pages/login/', true,/login.component\.spec\.ts$/);
// const context = require.context('./app/admin/pages/catalogue-management', false, /catalogue-management.component\.spec\.ts$/);
// const context = require.context('./app/admin/pages/catagory-management', false, /catagory-management.component\.spec\.ts$/);

const context = require.context('./app/learner/pages/landingpage', false, /landingpage.component\.spec\.ts$/);
context.keys().map(context);
