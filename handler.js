const fetchHtmlHandler = require('./src/handlers/fetch-html-handler');
const screenshotHeatmapHandler = require('./src/handlers/screenshot-heatmap-handler');
const { createResponseLambdaProxy } = require('./src/helpers');

export const screenshotHeatmap = (event, context, callback) => {
  screenshotHeatmapHandler(event, callback).then(response => {
    callback(null, createResponseLambdaProxy(response, true));
  });
};

export const fetchHtml = (event, context, callback) => {
  fetchHtmlHandler(event, callback).then(response => {
    callback(null, createResponseLambdaProxy(response, true));
  });
};
