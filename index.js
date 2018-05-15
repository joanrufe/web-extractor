'use strict';

const {
  colors
} = require('./src/common/')
const fs = require('fs')

const args = require('minimist')(process.argv.slice(2))
const {
  fetchDataFromFile,
  extractorModule
} = require('./src/')


const extractWebpagesPath = `${__dirname}/extracted-web-pages`

if (args.data) {
  const path = args._[0]
  const exist = fs.existsSync(path)
  if (exist) {
    fetchDataFromFile(path, args.data)
  }
} else {
  args._.forEach((arg, ...rest) => {
    extractorModule(arg, extractWebpagesPath)
  })
}

if (args._.length == 0) {
  console.log(colors.FgCyan, 'Web Extractor usage:')
  console.log(colors.FgYellow, '    web-extractor SOME_HOST')
  console.log(colors.FgCyan, 'If you want to fetch data from HTML data attribute of a file, just type:')
  console.log(colors.FgYellow, '    web-extractor FILE_PATH --data')
}