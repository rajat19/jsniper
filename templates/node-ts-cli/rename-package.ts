#!/usr/bin/env node

// changes package name (so that can be hosted on both npm and github packages)
import * as fs from 'fs';
const fileName = './package.json';
const file = require(fileName);

file.name = "<%= projectName %>";
const result: string = JSON.stringify(file, null, 2);

fs.writeFile(fileName, result, function writeJSON(err) {
  if (err) return console.log(err);
  console.log(result);
  console.log('writing to ' + fileName);
});