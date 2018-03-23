const fs = require('fs')
const fetch = require('node-fetch')
const { colors } = require('../common')

function handleErorrs(res) {
  if (!res.ok) {
    throw Error(res)
  }
  return res
}

function getHostName(url) {
  const [protocol,/* ommit */,host, route] = url.split( '/' );
  return host
}

const excludedDomains = [
  'www.w3.org'
]

function downloadAssets(href, basepath) {
  const fileName = href.split('/').pop()
  const isImage = /(\.|\/)(gif|jpe?g|png|ico)$/i.test(fileName);
  const domain = getHostName(href)
  const path = `${basepath}/${domain}`

  if (!fs.existsSync(path)) {
    fs.mkdirSync(path)
  }
  if(excludedDomains.includes(domain)){
    return Promise.resolve(false)
  }
  return fetch(href)
        .then(res => res.text())
        .then(content => {
            const filePath = `${path}/${fileName}`
            console.log(colors.FgCyan,href)
            return ComposePromiseWithFsWrite({
              filePath,
              content,
              isBinary: isImage
            })
        })
        .then(loggerMiddleWare)
        .catch(handleErorrs)
}

const loggerMiddleWare = file => console.log(colors.FgGreen, file) || file

// @TODO: Images fs.writeFile still not working
const ComposePromiseWithFsWrite = ({filePath, content, isBinary}) => {
  const args = [
    filePath,
    content
  ]
  if(isBinary) args.push('binary')
  return new Promise(function(resolve, reject){
    args.push(err => err ? reject(err) : resolve(filePath))
    fs.writeFile(...args)
  })
}

module.exports = downloadAssets