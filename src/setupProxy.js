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
          "https://dainty-pony-5cc351.netlify.app/";
        proxyRes.headers["Access-Control-Allow-Methods"] =
          "GET,PUT,POST,DELETE";
        proxyRes.headers["Access-Control-Allow-Headers"] = "Content-Type";
      },
    })
  );
};
