const fs = require("fs");
const url = require("url");
const path = require("path");

const ROUTES_DIR = path.resolve(__dirname, "routes");

const routes = fs.readdirSync(ROUTES_DIR).reduce((acc, f) => {
  acc[f] = fs
    .readFileSync(path.join(ROUTES_DIR, f))
    .toString()
    .trim();
  return acc;
}, {});

module.exports = (req, res) => {
  let { pathname } = url.parse(req.url);

  const segments = pathname.split(/\/+/).filter(Boolean);

  let key, route;

  while (segments.length) {
    key = segments.join("-");

    if (routes[key]) {
      route = routes[key];
      break;
    }

    segments.pop();
  }

  if (route) {
    console.log(`${pathname} -> ${route} (${key})`);
  }

  res.writeHead(302, {
    Location: route || routes["index"],
    "Cache-Control": `s-maxage=${60 * 60 * 24 * 365}, max-age=0`
  });
  res.end();
};
