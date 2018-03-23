'use strict';

const args = require('minimist')(process.argv.slice(2));
const extractorModule = require('./src')
const {colors} = require('./src/common/')

const extractWebpagesPath = `${__dirname}/extracted-web-pages`

args._.forEach((arg, ...rest) => {
  extractorModule(arg, extractWebpagesPath)
})

if(args._.length == 0 ){
  const message = `Please, provide a url to fetch.
    USAGE: web-extractor SOME_HOST`
  console.log(colors.FgCyan, message)
}