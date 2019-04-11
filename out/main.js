"use strict";
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sheets_1 = __importDefault(require("./lib/sheets"));
var runoff_1 = __importDefault(require("./lib/runoff"));
var POSITIONS = [
    "President",
    "Vice President",
    "Treasurer",
    "Team Captain (3796A)",
    "Team Captain (3796B)",
    "Team Captain (3796C)",
    "Team Captain (3796E)"
];
sheets_1.default("10cZpzIGi6xbe7Hv_Dw8DJjnQl4SSyLwr-8MkhymnkaY").then(function (ballots) {
    var e_1, _a;
    var winners = {};
    console.log("");
    try {
        for (var POSITIONS_1 = __values(POSITIONS), POSITIONS_1_1 = POSITIONS_1.next(); !POSITIONS_1_1.done; POSITIONS_1_1 = POSITIONS_1.next()) {
            var position = POSITIONS_1_1.value;
            console.log("==========================");
            console.log("ELECT: " + position);
            console.log("==========================");
            winners[position] = runoff_1.default(position, ballots);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (POSITIONS_1_1 && !POSITIONS_1_1.done && (_a = POSITIONS_1.return)) _a.call(POSITIONS_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
});
