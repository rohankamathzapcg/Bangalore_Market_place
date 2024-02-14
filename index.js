const fs = require("fs");
const http = require("http");

/****************Files*******************************/

// Read Contents from the files
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);

//Write Contents to the files
const textOut = `Thi is what we know about the avacado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut);
console.log("Contents written in the file");

//Non-Blocking , Asynchronus way
fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
  console.log(data);
});

//Nested
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
  });
});

/*****************Server*****************************/
const server = http.createServer((req, res) => {
  res.end("Hello from the server");
});

server.listen(8000,() => {
  console.log("Listening to request on port 8000");
});
