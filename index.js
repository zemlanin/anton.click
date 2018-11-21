const url = require("url");

const routesContext = require.context("./routes", true, /\.js$/);
const routes = routesContext.keys().reduce((acc, f) => {
  acc[f.match(/^.(.+)\.js$/i)[1]] = routesContext(f);
  return acc;
}, {});

module.exports = (req, res) => {
  const { pathname } = url.parse(req.url);

  if (!routes[pathname]) {
    console.log(`404 ${pathname}`);
    res.writeHead(302, { Location: "/" });
    res.end();
    return;
  }

  console.log(`302 ${pathname} -> ${routes[pathname]}`);
  res.writeHead(302, { Location: routes[pathname] });
  res.end();
};
