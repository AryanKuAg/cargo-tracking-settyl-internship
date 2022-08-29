const express = require("express");
const fs = require("fs");
const { parse } = require("node-html-parser");
const app = express();

// port
const port = process.env.PORT || "9090";

// middleware
app.use(express.json());

const files = fs.readFileSync("./data.html");

// GET /
app.get("/", (req, res) => {
  const list = [];

  //   console.log(files.toString());
  const root = parse(files.toString()); // parsing html
  //   console.log(root.querySelectorAll("tr"));
  root.querySelectorAll("tr").map((tag) => { // looping through all the "tr" tag
    // console.log(tag);
    tag.childNodes.forEach((e) => { // each e is "td"
      const data = e.innerText.trim();  // removing extra space if any
      if (data) {  // if data is there, push into the list
        list.push(data);
      }
    });
  });
  const usefulList = list.splice(4).slice(); // got 4 unnecessary headings, so removing it
  // list is a reference data type, so creating a new copy of it so affect the previous lists. 
  const superList = [];   // new list for final data

  for (let ss = 0; ss < usefulList.length; ss += 4) { // there are 4 td in each table row, so looping in interval of 4
    // data 1
    const d1 = usefulList[ss]; // getting first data

    // data 2
    const statusLink =
      usefulList[ss + 1].search("ONE COMPETENCE 081W") >= 0 ? true : false;
    const statusIsNestedData = statusLink ? "ONE COMPETENCE 081W" : "";
    let stausName = statusLink
      ? usefulList[ss + 1].slice(0, -20)?.trim()
      : usefulList[ss + 1];

    stausName = stausName.replaceAll("\n", "");

    // data 3

    const tempLoc = usefulList[ss + 2].split("\n");

    const locationName = tempLoc[0]?.trim();
    const locationLink = tempLoc[1]?.trim();
    // data 4

    let temEvent = usefulList[ss + 3].search("Actual");
    const isAcutual = temEvent >= 0 ? "Actual" : "Estimate";
    const date = usefulList[ss + 3]
      .replace("Actual", "")
      .replace("Estimate", "")
      ?.trim();

    superList.push({
      trackingNo: d1,
      status: {
        name: stausName,
        isNestedData: statusLink,
        link: statusIsNestedData,
      },
      location: {
        name: locationName,
        isNestedData: locationLink ? true : false,
        link: locationLink,
      },
      event: {
        date: date,
        type: isAcutual,
      },
    });
  }
  res.json(superList);
});

// listener
app.listen(port, () => {
  console.log("The server is up and running on port", port);
});
