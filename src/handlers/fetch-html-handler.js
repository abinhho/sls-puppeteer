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

    console.log("Fetch html url:", url);

    browser = await browserHelper(proxyEvent);
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
