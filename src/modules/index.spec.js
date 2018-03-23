'use strict';

const {
  fetchAssetsFromURL,
  downloadAssets
} = require('./');
const fetch = require('node-fetch')
const fs = require('fs')

describe('Fetch list of assets', () => {
  const promise = fetchAssetsFromURL('https://www.google.com')
  it('fetches content', () => {
    return promise.then(content => {
      expect(content).not.toBe(undefined)
      expect(content.length).not.toBe(0)
    })
  })
  it('fetches content', () => {
    return promise.then(content => {
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