const url = require("url");

const routesContext = require.context("./routes", true, /\.js$/);
const routes = routesContext
  .keys()
  .reduce(
    (acc, f) => {
      acc[f] = routesContext(f);
      return acc;
    },
    {}
  );

module.exports = (req, res) => {
  res.end(`sup ${url.parse(req.url).pathname}\n${JSON.stringify(routes)}`);
}
