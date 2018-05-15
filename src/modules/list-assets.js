const fetch = require('node-fetch')
const {JSDOM} = require('jsdom')

function parseContent(content, host) {
  const attachHost = url => /^\//.test(url) ? host + url : url

  const parser = new JSDOM(content)
  const dom = parser.window.document
  
  const styles = [].slice.call(dom.getElementsByTagName('link'))
    .map(elem => elem.getAttribute('href'))
    .map(attachHost)

  const images = [].slice.call(dom.querySelectorAll('img'))
    .map(elem => elem.getAttribute('src'))
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