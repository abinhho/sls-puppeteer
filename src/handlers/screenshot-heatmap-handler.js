const puppeteer = require('puppeteer');
const { getChrome } = require('../chrome-script');

/**
 * Screenshot heatmap and store to aws S3
 * Return S3 URL
 * @param proxyEvent
 */
async function screenshotHeatmapHandler(proxyEvent) {
  let body = null;
  let browser = null;
  let statusCode = 200;

  try {
    const { url } = proxyEvent.queryStringParameters || {};
    if (!url) {
      throw new Error("Missing url parameter");
    }

    const chrome = await getChrome();
    browser = await puppeteer.connect({
      browserWSEndpoint: chrome.endpoint,
    });

    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto(url)
    await page.screenshot({ path: 'nytimes.png', fullPage: true })
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

module.exports = screenshotHeatmapHandler
