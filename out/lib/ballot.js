"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Ballot = /** @class */ (function () {
    function Ballot(id, team, preferences, submitted) {
        this.id = id;
        this.team = team;
        this.preferences = preferences;
        this.submitted = submitted;
    }
    /**
     * Eliminates a certain candidate from a race
     * @param position Relevant race
     * @param candidate Candidate to eliminate
     */
    Ballot.prototype.eliminate = function (position, candidate) {
        if (!this.preferences[position])
            return;
        this.preferences[position] = this.preferences[position].filter(function (v) { return v !== candidate; });
    };
    Ballot.prototype.getVote = function (position) {
        return (this.preferences[position] || [])[0];
    };
    Ballot.fromRawData = function (data, rows) {
        var preferences = {};
        data.forEach(function (cell, i) {
            var match = rows[i].match(/(.+) \[([0-9]).*\]/);
            if (!match || !cell)
                return;
            var _a = __read(match, 3), position = _a[1], ranking = _a[2];
            if (!preferences[position]) {
                preferences[position] = [];
            }
            preferences[position][+ranking - 1] = cell;
        });
        return new Ballot(data[1], data[2], preferences, new Date(data[0]));
    };
    return Ballot;
}());
exports.default = Ballot;
