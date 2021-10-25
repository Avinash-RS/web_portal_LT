// This file can be replaced during build by using the fileReplacements array.
// ng build --prod replaces environment.ts with environment.prod.ts.
// The list of file replacements can be found in angular.json.

export const environment = {
  production: false,
  apiUrl: 'https://devfacade.lntiggnite.com/',
  scormUrl: 'https://devscorm.lntiggnite.com/',
  apiUrlImg: 'https://devfacade.lntiggnite.com/',
  createCourseApi: 'https://devcourses.lntiggnite.com/',
  wcaapiurl: 'https://devwca.lntiggnite.com/',
  domain : 'LXP',
  analytics: 'G-6N6X7SQTXH',
  systemIp : 'http://api.ipify.org/?format=json',
  socketio : 'https://devsocket.lntiggnite.com/',
  // Visible captcha key
  // captachaSiteKey: '6Leia8YbAAAAAB2jaH0YtNRQjQlr8OATGngAIBkk',
  // invisble captcha key
  captachaSiteKey: '6LfFoOccAAAAALSltFKyGqS9KwB3p9bJIOGaZ2QS',
  galleryURL : 'https://lxpdevstorage.z29.web.core.windows.net',
  blobKey: '?sv=2018-03-28&ss=b&srt=sco&sp=racwdl&st=2021-04-12T03%3A36%3A39Z&se=2171-04-12T03%3A41%3A39Z&spr=https%2Chttp&sig=jl7SfT41958EUB7YDb48xwU65cZcsnTN8vdttEhBad8%3D',
  teachercommunity: 'https://engineers.lntiggnite.com/teachercommunity/',
  gaTrackingId: 'G-6N6X7SQTXH'
};

// export const environment = {
//   production: false,
//   apiUrl: 'http://20.44.35.112:3000/',
//   scormUrl: 'http://52.140.12.78:8089/',
//   apiUrlImg: 'http://20.44.35.112:3000/',
//   createCourseApi: 'http://52.140.12.145:3002/',
//   wcaapiurl: 'http://20.44.38.161:9001/',
//   // apiUrl: 'http://facadeqa.southindia.cloudapp.azure.com:3000/',
//   // scormUrl:'http://scormqa.southindia.cloudapp.azure.com:8089/',
//   // apiUrlImg:'http://facadeqa.southindia.cloudapp.azure.com:3000/',
//   // createCourseApi:'http://courseqa.southindia.cloudapp.azure.com:3002/',
//   // wcaapiurl:'http://wcaqa.southindia.cloudapp.azure.com:9001/',
//   analytics: 'UA-171656647-1',
//   domain : 'LXP',
//   systemIp : 'http://api.ipify.org/?format=json',
//   socketio : 'http://20.40.2.200:3009'
// };

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as zone.run, zoneDelegate.invokeTask.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.