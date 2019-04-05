const url = require("url");

const routesContext = require.context("./routes", true, /\.js$/);
const routes = routesContext.keys().reduce((acc, f) => {
  acc[f.match(/^.(.+)\.js$/i)[1]] = routesContext(f);
  return acc;
}, {});

module.exports = (req, res) => {
  let { pathname } = url.parse(req.url);

  if (!routes[pathname]) {
    pathname = "/index";
  }

  res.writeHead(302, {
    Location: routes[pathname],
    "Cache-Control": `s-maxage=${60 * 60 * 24 * 365}, max-age=0`
  });
  res.end();
};
