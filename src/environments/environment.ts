// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  apiUrl: 'http://40.76.47.212:3000/', //old dev now uat
 
  // apiUrl: 'http://20.44.41.200:3000/', //new dev
  scormUrl:'http://40.76.47.212:8080/',
  apiUrlImg:'http://40.76.47.212:3000/',
  createCourseApi:'http://40.76.47.212:3002/',
  wcaapiurl:'http://edutech.eastus.cloudapp.azure.com/',
    // apiUrl: 'http://20.44.41.200:3000/',
  // scormUrl:'http://20.44.41.200:8080/',
  // apiUrlImg:'http://20.44.41.200:3001/',
  // wcaapiurl:'http://20.44.41.200:9001/'
};

/*
NAME           TYPE           CLUSTER-IP     EXTERNAL-IP    PORT(S)          AGE
courses        NodePort       10.0.145.160   <none>         3002:30752/TCP   24d
dataservice    NodePort       10.0.218.161   <none>         3007:30614/TCP   22h
facade         LoadBalancer   10.0.204.122   20.44.41.200   3000:31400/TCP   27d
kubernetes     ClusterIP      10.0.0.1       <none>         443/TCP          29d
redis-master   ClusterIP      10.0.169.112   <none>         6379/TCP         27d
users          NodePort       10.0.83.6      <none>         3001:30563/TCP   24d
webportallb    LoadBalancer   10.0.36.41     20.44.36.44    80:31070/TCP     28d
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
