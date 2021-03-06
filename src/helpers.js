const browserHelper = async (eventProxy) => {
  const isLocal = eventProxy.resource.indexOf("local") >= 0 ? true : false;
  console.log("Browser will run locally?", isLocal)

  if (isLocal) {
    const puppeteer = require('puppeteer-core');
    const { getChrome } = require('./chrome-script');

    const chrome = await getChrome();
    return await puppeteer.connect({
      browserWSEndpoint: chrome.endpoint,
    });
  }

  const chromium = require('chrome-aws-lambda');
  const config = {
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
  };

  console.log(config);

  return await chromium.puppeteer.launch(config);
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
