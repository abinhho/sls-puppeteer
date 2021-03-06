const { browserHelper } = require('../helpers');

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

    console.log("Screenshot url:", url);

    browser = await browserHelper(proxyEvent);

    const page = await browser.newPage()
    await page.setViewport({ width: 1024, height: 1600 })
    await page.goto(url)
    const base64Image = await page.screenshot({ type: "jpeg", encoding: "base64", fullPage: true, quality: 20 });
    body = "data:image/jpeg;base64," + base64Image;
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
