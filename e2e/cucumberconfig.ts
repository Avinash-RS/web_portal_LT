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
    capabilities: {
    browserName: 'chrome',
    /*chromeOptions: {
      args: ["--headless", "--disable-gpu", "--window-size=800x600"]
    }*/
   },  
    params: {
      login: {
        //QA Environment
        /*url: 'http://52.140.12.20/Learner/login',
        user: 'tamil',
        pwd: 'Test@123',
        adminuser:'rahulsaivishnu1',
        adminpwd:'123Aa!@#'*/
        //Dev Environment
        url: 'http://40.76.47.212/Learner/login',//http://20.44.36.44
        adminurl: 'http://40.76.47.212/Admin/login',
        user: 'mayavi',//mythreyi,king | jojo,Test@124
        pwd: 'Test@124',//123Aa!@#
        adminuser:'rahulsaivishnu1',
        adminpwd:'123Aa!@#',
        cpurl:'http://40.76.47.212/Player/video',
        apurl:'http://40.76.47.212/Player/audio',
        cmurl:'http://40.76.47.212/Wca'
    //UAT Environemnt
        /*url: 'http://13.71.123.238/Learner/login',
        user: 'anu',//mythreyi
        pwd: 'Test@123',//123Aa!@#
        adminuser:'rahulsaivishnu1',
        adminpwd:'123Aa!@#'*/
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
    specs: ['../Features/*.feature'],
    //specs: ['../Features/LoginTest.feature'],
    //specs: ['../Features/LogoutTest.feature'],
    //specs: ['../Features/RememberMeTest.feature'],
    //specs: ['../Features/ViewProfileTest.feature'],
    //specs: ['../Features/ViewCourseLearnerTest.feature'],
    //specs: ['../Features/CourseDetailsTest.feature'],
    //specs: ['../Features/WishlistCourseTest.feature'],
    //specs: ['../Features/SigninAdminTest.feature'],
    //specs: ['../Features/UpdateProfileDetailsTest.feature'],
    //specs: ['../Features/FirstTimeLoginTest.feature'],
    //specs: ['../Features/DeactivateUserTest.feature'],
    //specs: ['../Features/AdminViewUserDetailsTest.feature'],
    //specs: ['../Features/BlockUserTest.feature'],
    //specs: ['../Features/CoursePlayerTest.feature'],
    //specs: ['../Features/VidAudPlayPauseTest.feature'],
    //specs: ['../Features/VidAudPlayBackTest.feature'],
    //specs: ['../Features/AdminTrackUserEventTest.feature'],
    //specs: ['../Features/VidSpeedAdjandSubtitleTest.feature'],
    //specs: ['../Features/ViewAllCoursesTest.feature'],
    //specs: ['../Features/ViewCourseCreatedByMeTest.feature'],
    //specs: ['../Features/ViewPublishCourseTest.feature'],
    //specs: ['../Features/UserGroupCreationTest.feature'],
    //specs: ['../Features/PreviewCoursesTest.feature'],
    //specs: ['../Features/ViewDraftCoursesTest.feature'],
    //specs: ['../Features/CompleteKnowledgeCheckTest.feature'],
  
    cucumberOpts: {
      //args: [ "--headless", "--disable-gpu", "--window-size=800,600" ],
      /*require: ['./StepDefinitions/LoginSteps.js',
                './StepDefinitions/LogoutSteps.js',
                './StepDefinitions/RememberMeSteps.js',
                './StepDefinitions/ViewProfileSteps.js',
                './StepDefinitions/ViewCourseLearnerSteps.js',
                './StepDefinitions/CourseDetailsSteps.js',
                './StepDefinitions/WishlistCourseSteps.js',
                './StepDefinitions/LoginSteps.js',
                './StepDefinitions/SigninAdminSteps.js',
                './StepDefinitions/UpdateProfileDetailsSteps.js',
                './StepDefinitions/FirstTimeLoginSteps.js',
                './StepDefinitions/AdminViewUserDetailsSteps.js',
                './StepDefinitions/DeactivateUserSteps.js',
                './StepDefinitions/BlockUserSteps.js',
                './StepDefinitions/CoursePlayerSteps.js',
                './StepDefinitions/VidAudPlayPauseSteps.js',
                './StepDefinitions/VidAudPlayBackSteps.js',
                './StepDefinitions/AdminTrackUserEventSteps.js',
                './StepDefinitions/VidSpeedAdjandSubtitleSteps.js'
                './StepDefinitions/ViewAllCourseSteps.js',
                './StepDefinitions/ViewCourseCreatedByMeSteps.js',
                './StepDefinitions/ViewPublishCourseSteps.js',
                './StepDefinitions/UserGroupCreationSteps.js',                                
                './StepDefinitions/PreviewCourseSteps.js',  
                './StepDefinitions/ViewDraftCourseSteps.js',    
                './StepDefinitions/CompleteKnowledgeCheckSteps.js', 
                './StepDefinitions/hooks.js'],*/
      tags: ["@sprint2"],
      //require:['./StepDefinitions/ViewDraftCourseSteps.js','./StepDefinitions/hooks.js'],
      require:['./StepDefinitions/*.js'],
         
    format: ['json:./Report/cucumberreport.json'], 
    },
    /*onPrepare() {

      require('ts-node').register({
  
        project: require('path').join(__dirname, './tsconfig.json')
  
      });
    },*/
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