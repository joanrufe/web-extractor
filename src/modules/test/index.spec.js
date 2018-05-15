'use strict';

const {
  fetchAssetsFromURL,
  downloadAssets,
  getDataSetFromFile
} = require('../');
const fetch = require('node-fetch')
const fs = require('fs')
const {
  JSDOM
} = require('jsdom')

describe('Fetch list of assets', () => {
  const promise = fetchAssetsFromURL('https://www.google.com')
  it('fetches content', () => {
    return promise.then(content => {
      expect(content).not.toBe(undefined)
      expect(content.length).not.toBe(0)
      expect(typeof content).toBe('object')
      expect(content.length).not.toBe(undefined)
    })
  })
})

describe('Fetch, write and delete assets', () => {
  const promise = downloadAssets(
    'https://www.google.com/googleg_lodp.ico',
    __dirname
  )
  const filePath = __dirname + '/www.google.com/googleg_lodp.ico'
  it('Fetch file asset', () => {
    return promise.then(writedFile => {
      expect(writedFile).toBe(filePath)
      expect(fs.existsSync(filePath))
    })
  })
  it('Remove assets', () => {
    fs.unlinkSync(filePath)
    fs.rmdirSync(__dirname + '/www.google.com')
  })
})

describe('Get data from data HTML attributes', () => {
  const filePath = __dirname + '/data-query.html'
  it('Get data using css query selector', () => {
    const selector = '.item'
    return getDataSetFromFile(filePath, selector)
      .then(res => {
        expect(typeof res).toBe('object')
        expect(res.length).not.toBe(undefined)
        expect(res.length).toBe(2)
        expect(res[0].name).toBe('John')
        expect(res[1].name).toBe('Mike')
      })
  })
})