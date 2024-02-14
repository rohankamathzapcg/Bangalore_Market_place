const fs = require("fs");

//Read Contents from the files
const textIn=fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn)

//Write Contents to the files
const textOut=`Thi is what we know about the avacado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt',textOut)
console.log('Contents written in the file')