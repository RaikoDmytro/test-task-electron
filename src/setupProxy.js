const { createProxyMiddleware } = require('http-proxy-middleware');
const { proxyURI } = require("./config");

const proxy = {
  target: proxyURI,
  changeOrigin: true,
  pathRewrite: {
    '/api': '',
  },
}

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware(proxy),
  );
};
