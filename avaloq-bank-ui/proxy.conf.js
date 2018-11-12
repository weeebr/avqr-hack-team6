var HttpsProxyAgent = require('https-proxy-agent');
var proxyConfig = [
  {
    context: '/shares',
    target: 'https://www.boerse-berlin.com/index.php',
    secure: false,
    changeOrigin: true
  },
  {
    context: '/testbed/investment-management',
    target: 'https://api-xbrjd.emea.sandbox-test.avaloq.com',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/testbed": ""
    }
  },
  {
    context: '/sandbox/investment-management',
    target: 'https://api-xbrjd.emea.sandbox-test.avaloq.com',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/sandbox": ""
    }
  },
  {
    context: '/sandbox/accounts',
    target: 'https://api-xbrjd.emea.sandbox-test.avaloq.com',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/sandbox": ""
    }
  }

  ];

function setupForCorporateProxy(proxyConfig) {
  var proxyServer = process.env.http_proxy || process.env.HTTP_PROXY;
  if (proxyServer) {
    var agent = new HttpsProxyAgent(proxyServer);
    proxyConfig.forEach(function (entry) {
      if (!entry.target.includes("sits.avaloq.net")) {
        console.log(`Routing calls to ${entry.context} via ${proxyServer}`)
        entry.agent = agent;
      }
    });
  }
  return proxyConfig;
}

module.exports = setupForCorporateProxy(proxyConfig);
