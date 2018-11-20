const fs = require("fs");
const url = require("url");
const path = require("path");

const ROUTES_DIR = "./routes";

const routes = fs.readdirSync(ROUTES_DIR)
  .reduce(
    (acc, f) => {
      acc["/" + f] = fs.readFileSync(path.join(ROUTES_DIR, f)).toString().trim();
      return acc;
    },
    {}
  );

module.exports = (req, res) => {
  res.end(`sup ${url.parse(req.url).pathname}\n${JSON.stringify(routes)}`);
}
