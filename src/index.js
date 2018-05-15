const {
  fetchAssetsFromURL,
  downloadAssets,
  getDataSetFromFile
} = require('./modules')

function handleErorrs(res) {
  if (!res.ok) {
    throw Error(res)
  }
  return res
}

function extractorModule(url, basepath) {
  // download first url
  return downloadAssets(url, basepath)
    .then(() => {
      return fetchAssetsFromURL(url)
        .then(hrefs => hrefs.map(href => downloadAssets(href, basepath)))
        .catch(handleErorrs)
    })
}

function fetchDataFromFile(filePath, query) {
  getDataSetFromFile(filePath, query)
  .then(res => console.log(JSON.stringify(res, null, 2)))
}

module.exports = {
  extractorModule,
  fetchDataFromFile
}