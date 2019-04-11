# Mann Robotics Election System

Instant Run-Off voting system tallying votes from Google Forms submissions. Used by Mann Robotics in elections.

## Install

    yarn

## Setup

Modify `election.json` to look like this:

    {
        "spreadsheet": "<ID of Google Sheet>",
        "positions": [
            "List",
            "Of",
            "Positions",
            "To elect"
        ],
        "threshold": 0.5 
    }

Where:

`spreadsheet` refers to the Google Sheets ID (long string of characters in the URL)

`positions` contains all positions up for election

`threshold` is the percentage of votes a candidate has to recieve to be elected

## Run

    tsc
    node out/main.js
