const http = require("http");
const url = require("url");
const fs = require("fs");

/*****************Server*****************************/

const tempOverview = fs.readFileSync(
  `${__dirname}/Front-End Templates/template-overview.html`,
  "utf-8"
);
const proudctOverview = fs.readFileSync(
  `${__dirname}/Front-End Templates/template-product.html`,
  "utf-8"
);
const cardOverview = fs.readFileSync(
  `${__dirname}/Front-End Templates/template-card.html`,
  "utf-8"
);

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);
  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }
  return output;
};

const data = fs.readFileSync(`${__dirname}/Product Data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    const cardHtml = dataObj
      .map((element) => replaceTemplate(cardOverview, element))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardHtml);

    res.end(output);
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObj[query.id];
    const output = replaceTemplate(proudctOverview, product);
    res.end(output);
  } else if (pathname === "/api") {
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
