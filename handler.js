const fetchHtmlHandler = require('./src/handlers/fetch-html-handler')
const screenshotHeatmapHandler = require('./src/handlers/screenshot-heatmap-handler')
const { createResponseLambdaProxy } = require('./src/helpers')

const fetchHtml = (event, context, callback) => {
  fetchHtmlHandler(event, callback).then(response => {
    callback(null, createResponseLambdaProxy(response, true))
  })
}

const screenshotHeatmap = (event, context, callback) => {
  screenshotHeatmapHandler(event, callback).then(response => {
    callback(null, createResponseLambdaProxy(response, true))
  })
}

module.exports = {
  fetchHtml,
  screenshotHeatmap
}
