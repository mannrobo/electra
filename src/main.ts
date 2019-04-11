import getBallots from "./lib/sheets";
import runoff from "./lib/runoff";

const { spreadsheet, positions } = require("../election.json");

getBallots(spreadsheet).then(ballots => {
  const winners: { [position: string]: any } = {};

  console.log("");

  for (let position of positions) {
    console.log("==========================");
    console.log(`ELECT: ${position}`);
    console.log("==========================");

    winners[position] = runoff(position, ballots);
  }
});
