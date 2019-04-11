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
var _a = require("../election.json"), spreadsheet = _a.spreadsheet, positions = _a.positions;
sheets_1.default(spreadsheet).then(function (ballots) {
    var e_1, _a;
    var winners = {};
    console.log("");
    try {
        for (var positions_1 = __values(positions), positions_1_1 = positions_1.next(); !positions_1_1.done; positions_1_1 = positions_1.next()) {
            var position = positions_1_1.value;
            console.log("==========================");
            console.log("ELECT: " + position);
            console.log("==========================");
            winners[position] = runoff_1.default(position, ballots);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (positions_1_1 && !positions_1_1.done && (_a = positions_1.return)) _a.call(positions_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
});
