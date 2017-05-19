#!/usr/bin/env node

var mkdirp = require('mkdirp'),
  fs = require('fs'),
  readline = require('readline'),
  colors = require('colors'),
  pretty = require('pretty');

var jsxContent = `
import React, { Component } from 'react';

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


var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What is your application name?  ', function(answer) {
  console.log('Application Name: ' + answer);

  // create directory
  mkdirp('./' + answer, function(err) {
    if (err) {
      throw err;
    }
    // done
    console.log(`Component ${answer} created successfully!`.green);
  });


  var filesToCreate = ['.js', '.scss'];

  var filesContents = [jsxContent, scssContent];


  fs.writeFile(`./${answer}/${answer}.scss`, filesContents[1], function(err) {
    if (err) {
      return console.log(err);
    } else {
      console.log(`${answer}.scss saved successfully`.cyan);
    }
  });
  fs.writeFile(`./${answer}/${answer}.js`, filesContents[0].replace(/xxxxx/g, answer), function(err) {
    if (err) {
      return console.log(err);
    } else {
      console.log(`${answer}.js saved successfully`.cyan);
    }
  });

  rl.close();
});
