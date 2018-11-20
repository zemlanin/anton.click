const url = require("url");

const routesContext = require.context("./routes", true, /\.js$/);
const routes = routesContext
  .keys()
  .reduce(
    (acc, f) => {
      acc[f.match(/^.(.+)\.js$/i)[1]] = routesContext(f);
      return acc;
    },
    {}
  );

module.exports = (req, res) => {
  const { pathname } = url.parse(req.url);
  res.end(`${pathname}\n${routes[pathname]}\n${JSON.stringify(routes)}`);
}
