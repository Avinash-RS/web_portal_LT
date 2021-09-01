var HttpsProxyAgent = require('https-proxy-agent');
var proxyConfig = [{
  context: '/gateway',
  target: 'http://devfacade.lntiggnite.com',
  secure: false
}];

// function setupForCorporateProxy(proxyConfig) {
//   var proxyServer = process.env.http_proxy || process.env.HTTP_PROXY;
//   if (proxyServer) {
//     var agent = new HttpsProxyAgent(proxyServer);
//     console.log('Using corporate proxy server: ' + proxyServer);
//     proxyConfig.forEach(function(entry) {
//       entry.agent = agent;
//     });
//   }
//   console.log(proxyConfig)
//   return proxyConfig;
// }

module.exports = setupForCorporateProxy(proxyConfig);