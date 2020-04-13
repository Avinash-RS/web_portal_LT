import {Config} from 'protractor';
import * as report from 'cucumber-html-reporter';



//var {setDefaultTimeout} = require('cucumber');

//setDefaultTimeout(60 * 1000);
var reporter = require('cucumber-html-reporter');

export let config: Config = {
    //seleniumAddress: 'http://localhost:4444/wd/hub',
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    capabilities: {'browserName': 'chrome'
      //'goog:chromeOptions': {
      //  args: [ "--headless", "--disable-gpu", "--window-size=800,600" ]
    //  }
    },
    //suites: {
      //smoketest: './Login.js'
     // search: [
     //   'tests/e2e/contact_search/**/*Spec.js',
     //   'tests/e2e/venue_search/**/*Spec.js'
    //  ]
  //},

    // Spec patterns are relative to this directory.
    specs: ['../Features/WishlistCourseTest.feature'],//

    cucumberOpts: {
      require: './StepDefinitions/WishlistCourseSteps.js',//
      
    // tags: false,
      format:'json:/cucumberreport.json', 
      onComplete: () =>
      {
        var options = {
          theme: 'bootstrap',
          jsonFile: 'test/report/cucumber_report.json',
          output: 'test/report/cucumber_report.html',
          reportSuiteAsScenarios: true,
          scenarioTimestamp: true,
          launchReport: true,
          metadata: {
              "App Version":"0.3.2",
              "Test Environment": "STAGING",
              "Browser": "Chrome  54.0.2840.98",
              "Platform": "Windows 10",
              "Parallel": "Scenarios",
              "Executed": "Remote"
          }
      };        
      reporter.generate(options);
    // profile: false,
    // 'no-source': true
    },
    //tags: ['@Smoketest', '@contact'] ,   
    directConnect: true  
  },
};