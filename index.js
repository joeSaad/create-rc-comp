#!/usr/bin/env node

var mkdirp = require('mkdirp'),
  fs = require('fs'),
  readline = require('readline'),
  colors = require('colors'),
  pretty = require('pretty');

var jsxContent = `import React, { Component } from 'react';

import './xxxxx.scss';

export default class xxxxx extends Component {
  render() {
    return (
      <div>
        xxxxx component
      </div>
    );
  }
}
`;

var scssContent = "";


function capitalizeFirstLetter(s) {
  const p = String(s);
  return p.charAt(0).toUpperCase() + p.slice(1);
}

const answer = capitalizeFirstLetter(process.argv.slice(2, 3));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const dirPresent = process.argv.slice(3);

const currentDir = dirPresent == '-d' ? `${answer}/` : '';

const filesToCreate = ['.js', '.scss'];
const filesContents = [jsxContent, scssContent];

function createFiles() {
  fs.writeFile(`./${currentDir}${answer}.scss`, filesContents[1], function(err) {
    if (err) {
      return console.log(err);
    } else {
      console.log(`${answer}.scss saved successfully`.cyan);
    }
  });
  fs.writeFile(`./${currentDir}${answer}.js`, filesContents[0].replace(/xxxxx/g, answer), function(err) {
    if (err) {
      return console.log(err);
    } else {
      console.log(`${answer}.js saved successfully`.cyan);
    }
  });
}

if (dirPresent == '-d') {
  mkdirp('./' + answer, function(err) {
    if (err) {
      throw err;
    }
    // done
    console.log(`Component ${answer} created successfully!`.green);
  });

  createFiles();

} else {
  createFiles();
}

rl.close();