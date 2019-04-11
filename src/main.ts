import getBallots from "./lib/sheets";
import runoff from "./lib/runoff";

const POSITIONS = [
  "President",
  "Vice President",
  "Treasurer",
  "Team Captain (3796A)",
  "Team Captain (3796B)",
  "Team Captain (3796C)",
  "Team Captain (3796E)"
];

getBallots("10cZpzIGi6xbe7Hv_Dw8DJjnQl4SSyLwr-8MkhymnkaY").then(ballots => {
  const winners: { [position: string]: any } = {};

  console.log("");

  for (let position of POSITIONS) {
    console.log("==========================");
    console.log(`ELECT: ${position}`);
    console.log("==========================");

    winners[position] = runoff(position, ballots);
  }
});
