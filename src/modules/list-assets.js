const fetch = require('node-fetch')
const DomParser = require('dom-parser')
const parser = new DomParser()

function parseContent(content, host) {
  const attachHost = url => /^\//.test(url) ? host + url : url;
  const dom = parser.parseFromString(content)

  const styles = dom.getElementsByTagName('link')
    .map((elem) => elem.getAttribute('href'))
    .map(attachHost)

  const images = dom.getElementsByTagName('img')
    .map((elem) => elem.getAttribute('src'))
    .map(attachHost)

  const routes = [...styles, ...images]

  return {
    then: callback => callback(routes)
  }
}

function fetchAssetsFromURL(host) {
  return fetch(host)
    .then(res => res.text())
    .then(content => parseContent(content, host))
}

module.exports = fetchAssetsFromURL