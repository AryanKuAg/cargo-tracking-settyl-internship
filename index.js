const express = require("express");
const htmlparser2 = require("htmlparser2");
const CSSselect = require("css-select");
const axios = require("axios").default;
const render = require("dom-serializer").default;
const HTMLParser = require("node-html-parser");
const app = express();
const {
  Scraper,
  Root,
  DownloadContent,
  OpenLinks,
  CollectContent,
} = require("nodejs-web-scraper");
const fs = require("fs");

// npm i nodejs-web-scraper   --> This package will solve my issue

// middleware
app.use(express.json());

// port
const port = process.env.PORT || "8085";

// GET /
app.get("/", async (req, res) => {
  let url =
    "https://ecomm.one-line.com/one-ecom/manage-shipment/cargo-tracking?ctrack-field=BMOU4877725&trakNoParam=BMOU4877725";
  try {
    const response = await axios.get(url);
    if (response) {
      const pages = []; //All ad pages.
      const getPageObject = (pageObject, address) => {
        pages.push(pageObject);
      };

      // handle your response

      (async () => {
        const config = {
          baseSiteUrl: `https://ecomm.one-line.com/`,
          startUrl: url,
          concurrency: 10,
          maxRetries: 3,
          logPath: "./logs/",
        };
        const scraper = new Scraper(config); //Create a new Scraper instance, and pass config to it.
        const root = new Root();
        const status = new CollectContent("h2", {
          name: "status",
          getPageObject,
        });
        root.addOperation(status);
        await scraper.scrape(root);
        fs.writeFile("./test.json", JSON.stringify(pages), () => {});
      })();
    }
    res.json(response.data);
  } catch (e) {
    console.log(e);
    res.send("eror");
  }
});

// listener
app.listen(port, () => {
  console.log("The Server is up and running on port", port);
});

//// console.log(typeof response.data);
// const htmlData = response.data.replace("<!DOCTYPE html>", "");
// const root = HTMLParser.parse(htmlData);
// console.log("root", root.querySelector("p"));
// console.log("rootType", typeof root);
// const dom = htmlparser2.parseDocument(response.data);
// console.log(dom.toString());
// console.log(typeof response.data);
// for (let td of CSSselect.selectAll("h1", response.data)) {
//   console.log(`td ${render(td)}`);
// }
