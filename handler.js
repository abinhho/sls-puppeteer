const fetchHtmlHandler = require('./src/handlers/fetch-html-handler');
const screenshotHeatmapHandler = require('./src/handlers/screenshot-heatmap-handler');
const { createResponseLambdaProxy } = require('./src/helpers');
module.exports.puppeteer = (event, context, callback) => {
  const responseHeader = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  };

  try {
    switch (event.path) {
      case "/puppeteer/html":
        screenshotHeatmapHandler(event).then(response => {
          callback(null, createResponseLambdaProxy(response, true));
        });

      case "/puppeteer/screenshot/heatmap":
        fetchHtmlHandler(event).then(response => {
          callback(null, createResponseLambdaProxy(response));
        });

      default:
        break;
    }
  } catch (e) {
    callback(null, createResponseLambdaProxy({
      statusCode: 500,
      body: JSON.stringify({ message: e.message }),
      headers: responseHeader
    }));
  }
}
