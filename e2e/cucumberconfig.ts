import {Config,browser} from 'protractor';
import * as reporter from "cucumber-html-reporter";

//var {setDefaultTimeout} = require('cucumber');
//var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
//setDefaultTimeout(60 * 1000);
//var reporter = require('cucumber-html-reporter');

export let config: Config = {
    //seleniumAddress: 'http://localhost:4444/wd/hub',
    directConnect: true ,
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    capabilities: {browserName: 'chrome'
      //'goog:chromeOptions': {
      //  args: [ "--headless", "--disable-gpu", "--window-size=800,600" ]
    //  }
    },
    params: {
      login: {
        url: 'http://52.171.134.188/Learner/login',
        user: 'Bobby',
        pwd: 'Test@123',
        adminuser:'rahulsaivishnu1',
        adminpwd:'123Aa!@#'
      }
    },
    //suites: {
      //smoketest: './Login.js'
     // search: [
     //   'tests/e2e/contact_search/**/*Spec.js',
     //   'tests/e2e/venue_search/**/*Spec.js'
    //  ]
  //},

    // Spec patterns are relative to this directory.
    specs: ['../Features/*.feature'],//
    //specs: ['../Features/LoginTest.feature'],
    //specs: ['../Features/LogoutTest.feature'],
    //specs: ['../Features/RememberMeTest.feature'],
    //specs: ['../Features/ViewProfileTest.feature'],
    //specs: ['../Features/ViewCourseLearnerTest.feature'],
    //specs: ['../Features/CourseDetailsTest.feature'],
    //specs: ['../Features/WishlistCourseTest.feature'],
    //specs: ['../Features/SigninAdminTest.feature'],

    cucumberOpts: {
      //args: [ "--headless", "--disable-gpu", "--window-size=800,600" ],
       require: ['./StepDefinitions/LoginSteps.js',
                './StepDefinitions/LogoutSteps.js',
                './StepDefinitions/RememberMeSteps.js',
                './StepDefinitions/ViewProfileSteps.js',
                './StepDefinitions/ViewCourseLearnerSteps.js',
                './StepDefinitions/CourseDetailsSteps.js',
                './StepDefinitions/WishlistCourseSteps.js',
                './StepDefinitions/SigninAdminSteps.js',
                './StepDefinitions/hooks.js'],

      //require: 
      //  './StepDefinitions/LoginSteps.js',
      //  './StepDefinitions/LogoutSteps.js',
      //  './StepDefinitions/RememberMeSteps.js',
      //  './StepDefinitions/ViewProfileSteps.js',
      //  './StepDefinitions/ViewCourseLearnerSteps.js',
      //  './StepDefinitions/CourseDetailsSteps.js',
      //  './StepDefinitions/WishlistCourseSteps.js',
      //  './StepDefinitions/SigninAdminSteps.js',
      
    // tags: false,
    format: ['json:./Report/cucumberreport.json'], 
    },
     onComplete: () =>
      {
        var options = {
          theme: 'bootstrap',
          jsonFile: './Report/cucumberreport.json',
          output: './Report/cucumberreport.html',
          reportSuiteAsScenarios: true,
          scenarioTimestamp: true,
          launchReport: true,
          metadata: {
              "App Name":"LXP Edutechsystem",
              "Test Environment": "QAEnvironment",
              "Browser": "Chrome",
              "Platform": "Windows 10",
              "Parallel": "Scenarios"
          }
      };        
      reporter.generate(options);
    // profile: false,
    // 'no-source': true
    }, 
    //tags: ['@Smoketest', '@contact'] ,   
  /*plugins: [{
      package: 'protractor-multiple-cucumber-html-reporter-plugin',
      options:{
          // read the options part for more options
          automaticallyGenerateReport: true,
          removeExistingJsonReportFile: true
      }
  }]*/
  
};