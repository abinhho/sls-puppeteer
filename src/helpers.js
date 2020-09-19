const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');
const { getChrome } = require('./chrome-script');

const browserHelper = async (eventProxy) => {
  if (eventProxy.resource.indexOf("local")) {
    const chrome = await getChrome();
    return await puppeteer.connect({
      browserWSEndpoint: chrome.endpoint,
    });
  }

  return await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
}

/**
 * Creates a response lambda proxy.
 */
const createResponseLambdaProxy = (response, raw = false) => {
  let body = "";
  if (raw) {
    body = response.body
  } else {
    body = response.statusCode === 200 ? JSON.stringify(response.body)
      : JSON.stringify({ message: response.message || "unknown" });
  }

  return {
    statusCode: response.statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body
  }
}

module.exports = {
  createResponseLambdaProxy,
  browserHelper
}
