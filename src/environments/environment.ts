// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://facade.southindia.cloudapp.azure.com:3000/',
  scormUrl: 'http://scorm.southindia.cloudapp.azure.com:8089/',
  apiUrlImg: 'http://facade.southindia.cloudapp.azure.com:3000/',
  createCourseApi: 'http://course.southindia.cloudapp.azure.com:3002/',
  wcaapiurl: 'http://wca.southindia.cloudapp.azure.com:9001/',
  domain : 'LXP',
  analytics: 'UA-171656647-1',
  systemIp : 'http://api.ipify.org/?format=json',
  socketio : 'http://20.40.0.83:3009'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
