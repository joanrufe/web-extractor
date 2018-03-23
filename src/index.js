const { fetchAssetsFromURL, downloadAssets} = require('./modules')

function handleErorrs(res) {
  if(!res.ok){
    throw Error(res)
  }
  return res
}

function extractorModule(url, basepath){
  // download first url
 return downloadAssets(url, basepath)
   .then(() => {
     return fetchAssetsFromURL(url)
     .then(hrefs => hrefs.map( href => downloadAssets(href, basepath)) )
     .catch( handleErorrs )
   })
}

module.exports = extractorModule