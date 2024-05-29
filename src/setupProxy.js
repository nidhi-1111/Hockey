const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://api.nhle.com",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/stats/rest/en/team/summary",
      },
      onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers["Access-Control-Allow-Origin"] =
          "http://localhost:3000";
        proxyRes.headers["Access-Control-Allow-Methods"] =
          "GET,PUT,POST,DELETE";
        proxyRes.headers["Access-Control-Allow-Headers"] = "Content-Type";
      },
    })
  );
};
