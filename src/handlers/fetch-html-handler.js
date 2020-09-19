const { browserHelper } = require('../helpers');

/**
 * Fetch a target page html
 * @param proxyEvent
 * Return { statusCode: 200, body }
 */
async function fetchHtmlHandler(proxyEvent) {
  let body = null;
  let browser = null;
  let statusCode = 200;

  try {
    const { url } = proxyEvent.queryStringParameters || {};
    if (!url) {
      throw new Error("Missing url parameter");
    }

    browser = await browserHelper(proxyEvent);
    // browser = await chromium.puppeteer.launch({
    //   args: chromium.args,
    //   defaultViewport: chromium.defaultViewport,
    //   executablePath: await chromium.executablePath,
    //   headless: chromium.headless,
    //   ignoreHTTPSErrors: true,
    // });
    // const chrome = await getChrome();
    // browser = await puppeteer.connect({
    //   browserWSEndpoint: chrome.endpoint,
    // });

    let page = await browser.newPage();

    await page.goto(url);
    body = await page.evaluate(() => document.body.innerHTML);
  } catch (error) {
    console.log(error.message);

    statusCode = 500;
    body = error.message
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }

  return {
    statusCode,
    body
  };
}

module.exports = fetchHtmlHandler
