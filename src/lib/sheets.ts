/**
 * Extracts relevant data from Google Sheets
 */

import { google } from "googleapis";
import { sheets_v4 } from "googleapis/build/src/apis/sheets/v4";
import { join } from "path";
import Ballot from "./ballot";

const auth = new google.auth.JWT({
  keyFile: join(__dirname, "../../credentials.json"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"]
});
const sheets: sheets_v4.Sheets = google.sheets({ version: "v4", auth });

export default async function getBallots(spreadsheetId: string) {
  console.log("Retriving Ballots...");

  const rows = await sheets.spreadsheets.values
    .get({
      spreadsheetId,
      range: "Ballots!1:1"
    })
    .then(resp => resp.data.values as string[][])
    .then(rows => rows[0]);

  // Get all ballots
  const ballots = await sheets.spreadsheets.values
    .get({
      spreadsheetId,
      range: "Ballots!A2:AE"
    })
    .then(resp => resp.data.values as string[][])
    .then(ballots => ballots.map(ballot => Ballot.fromRawData(ballot, rows)));

  console.log(`Done! Recieved ${ballots.length} ballots`);

  return ballots;
}
