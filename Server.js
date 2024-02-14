const http = require("http");
const url = require("url");
const fs = require("fs");

/*****************Server*****************************/

const data = fs.readFileSync(`${__dirname}/Product Data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === "/" || pathName === "/overview") {
    res.end("This is Overview");
  } else if (pathName === "/product") {
    res.end("This is Product");
  } else if (pathName === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "Hello World",
    });

    res.end("<h1>Page not found!!</h1>");
  }
});

server.listen(8000, () => {
  console.log("Listening to request on port 8000");
});
