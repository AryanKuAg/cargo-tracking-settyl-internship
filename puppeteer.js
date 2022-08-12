const puppeteer = require("puppeteer");

const url =
  "https://ecomm.one-line.com/one-ecom/manage-shipment/cargo-tracking?ctrack-field=BMOU4877725&trakNoParam=BMOU4877725";

async function start() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  await page.evaluate(() => {
    console.log("nono");
    return Array.from(document.querySelectorAll(".multi_row")).map((x) =>
      console.log(x)
    );
  });

  await browser.close();
}

start();
