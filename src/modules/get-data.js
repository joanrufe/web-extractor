'use strict'

const fs = require('fs')
const {JSDOM} = require("jsdom");

/**
 * @param string filePath 
 * @param string selector 
 * @returns Promise
 */
function getDataSetFromFile(filePath, selector){
  return JSDOM.fromFile(filePath)
    .then(dom => {
      const res = dom.window.document.querySelectorAll(selector)
      const attrs = [].slice.call(res).map(reduceDomData)
      return attrs
    })
}

function reduceDomData(e){
  if (e.dataset) return Object.assign({},e.dataset)
}

module.exports = getDataSetFromFile