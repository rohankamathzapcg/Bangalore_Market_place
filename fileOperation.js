const fs = require("fs");

/****************Files*******************************/

// Read Contents from the files
const textIn = fs.readFileSync("./Text Files/input.txt", "utf-8");
console.log(textIn);

//Write Contents to the files
const textOut = `Thi is what we know about the avacado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync("./Text Files/output.txt", textOut);
console.log("Contents written in the file");

//Non-Blocking , Asynchronus way
fs.readFile("./Text Files/start.txt", "utf-8", (err, data) => {
  console.log(data);
});

//Nested
fs.readFile("./Text Files/start.txt", "utf-8", (err, data1) => {
  fs.readFile(`./Text Files/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
  });
});
