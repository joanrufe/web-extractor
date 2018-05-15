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
  const [protocol, /* ommit */ , host, route] = url.split('/');
  return host
}

const excludedDomains = [
  'www.w3.org'
]

function downloadAssets(href, basepath) {
  const fileName = href.split('/').pop()
  const isImage = /(\.|\/)(gif|jpe?g|png)$/i.test(fileName);
  const domain = getHostName(href)
  const path = `${basepath}/${domain}`

  if (!fs.existsSync(path)) {
    fs.mkdirSync(path)
  }
  if (excludedDomains.includes(domain)) {
    return Promise.resolve(false)
  }

  function saveFile(content) {
    const filePath = `${path}/${fileName}`
    console.log(colors.FgCyan, href)
    return ComposePromiseWithFsWrite({
      filePath,
      content,
      isBinary: isImage
    })
  }

  return fetch(href)
    .then(res => {
      const newRes = isImage ? res.blob() : res.text()
      return newRes
    })
    .then(saveFile)
    .then(loggerMiddleWare)
    .catch(handleErorrs)
}

const loggerMiddleWare = file => console.log(colors.FgGreen, file) || file

// @TODO: Images fs.writeFile still not working
const ComposePromiseWithFsWrite = ({
  filePath,
  content,
  isBinary
}) => {
  const args = [
    filePath
  ]
  if (isBinary) {
    return new Promise(function (resolve, reject) {
      args.push(Buffer.from(new Uint8Array(content)))
      args.push('binary')
      args.push(err => err ? reject(err) : resolve(filePath))
      fs.writeFile(...args)
    })
  } else {
    return new Promise(function (resolve, reject) {
      args.push(content)
      args.push(err => err ? reject(err) : resolve(filePath))
      fs.writeFile(...args)
    })
  }
}

module.exports = downloadAssets