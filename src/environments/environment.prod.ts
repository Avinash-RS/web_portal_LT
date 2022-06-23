/*export const environment = {
  production: false,
  apiUrl: 'http://facade.southindia.cloudapp.azure.com:3000/',
  scormUrl: 'http://scorm.southindia.cloudapp.azure.com:8089/',
  apiUrlImg: 'http://facade.southindia.cloudapp.azure.com:3000/',
  createCourseApi: 'http://course.southindia.cloudapp.azure.com:3002/',
  wcaapiurl: 'http://wca.southindia.cloudapp.azure.com:9001/',
  domain : 'LXP',
  analytics: 'UA-171656647-1',
  systemIp : 'http://api.ipify.org/?format=json',
  socketio : 'http://20.40.0.83:3009',
  captachaSiteKey: '6Ldu8h8aAAAAAEV33ZBs-xCR4hHIzPuvfLjkG-oO'
};
*/
// This file can be replaced during build by using the fileReplacements array.
// ng build --prod replaces environment.ts with environment.prod.ts.
// The list of file replacements can be found in angular.json.


export const environment = {
  appVersion: require('../../package.json').version + '-dev',
  production: false,
  apiUrl: 'https://devfacade.lntedutech.com/',
  scormUrl: 'https://devscorm.lntedutech.com/',
  apiUrlImg: 'https://devfacade.lntedutech.com/',
  createCourseApi: 'https://devcourses.lntedutech.com/',
  wcaapiurl: 'https://devwca.lntedutech.com/',
  domain : 'LXP',
  analytics: 'G-6N6X7SQTXH',
  systemIp : 'http://api.ipify.org/?format=json',
  socketio : 'https://devsocket.lntedutech.com/',
  // Visible captcha key
  // captachaSiteKey: '6Leia8YbAAAAAB2jaH0YtNRQjQlr8OATGngAIBkk',
  // invisble captcha key
  captachaSiteKey: '6Lf-qfEcAAAAAH2zsrdDz1K6DmUOHjgHzGmH3PN7',
  galleryURL : 'https://lxpdevstorage.z29.web.core.windows.net',
  blobKey: '?sv=2018-03-28&ss=b&srt=sco&sp=racwdl&st=2021-04-12T03%3A36%3A39Z&se=2171-04-12T03%3A41%3A39Z&spr=https%2Chttp&sig=jl7SfT41958EUB7YDb48xwU65cZcsnTN8vdttEhBad8%3D',
  teachercommunity: 'https://engineers.lntiggnite.com/teachercommunity/',
  gaTrackingId: 'G-6N6X7SQTXH',
  botUrl :'https://devfaqbot.lntedutech.com/',
  resourcelinkurl : 'https://upskillresourcefiles.lntedutech.com/',
  aictePortalUrl : 'https://microlearndev.lntedutech.com/',
  guportalUrl : 'https://portaldev.lntiggnite.com/',
};
