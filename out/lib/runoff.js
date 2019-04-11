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
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require("../../election.json"), threshold = _a.threshold, duplicateCandidates = _a.duplicateCandidates;
function unbreakableTie(totals) {
    return (Object.values(totals).every(function (a, i, v) { return a === v[0]; }) &&
        Object.values(totals).length > 1);
}
exports.unbreakableTie = unbreakableTie;
function eliminatedCandidates(totals) {
    var candidates = rankCandidates(totals).candidates;
    return candidates.filter(function (candidate) { return totals[candidate] <= totals[candidates.slice(-1)[0]]; });
}
exports.eliminatedCandidates = eliminatedCandidates;
function rankCandidates(totals) {
    var candidates = Object.keys(totals).sort(function (a, b) { return totals[b] - totals[a]; });
    var totalVotes = Object.values(totals).reduce(function (a, b) { return a + b; });
    return { candidates: candidates, totalVotes: totalVotes };
}
exports.rankCandidates = rankCandidates;
function winner(totals) {
    var _a = rankCandidates(totals), candidates = _a.candidates, totalVotes = _a.totalVotes;
    if (totals[candidates[0]] > totalVotes * threshold) {
        return candidates[0];
    }
    else {
        return null;
    }
}
exports.winner = winner;
/**
 * Performs an election to determine a winner
 */
function runoff(position, ballots) {
    var totals = {};
    var round = 1;
    var win = null;
    var _loop_1 = function () {
        var e_1, _a;
        totals = {};
        try {
            // Tally ballots
            for (var ballots_1 = __values(ballots), ballots_1_1 = ballots_1.next(); !ballots_1_1.done; ballots_1_1 = ballots_1.next()) {
                var ballot = ballots_1_1.value;
                var vote = ballot.getVote(position);
                if (!vote)
                    continue;
                if (!totals[vote]) {
                    totals[vote] = 1;
                }
                else {
                    totals[vote]++;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (ballots_1_1 && !ballots_1_1.done && (_a = ballots_1.return)) _a.call(ballots_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // Check for no votes cast
        if (Object.keys(totals).length < 1) {
            console.log(" No votes cast for " + position + ". Skipping election!\n");
            return { value: null };
        }
        var _b = rankCandidates(totals), candidates = _b.candidates, totalVotes = _b.totalVotes;
        console.log("   \nRound " + round + ":");
        console.log(candidates
            .map(function (candidate, i) {
            return "   " + (i + 1) + ". " + candidate + " \u2014 " + totals[candidate] + " votes (" + ((totals[candidate] / totalVotes) *
                100).toFixed(2) + "%)";
        })
            .join("\n"));
        console.log("");
        if (unbreakableTie(totals)) {
            console.log(" There is an unbreakable tie. Skipping election!\n");
            return { value: null };
        }
        win = winner(totals);
        if (!win) {
            var eliminted_1 = eliminatedCandidates(totals);
            console.log("   No candidate has reached majority consensus. Eliminating " + eliminted_1.join(", "));
            ballots.forEach(function (ballot) {
                return eliminted_1.forEach(function (candidate) {
                    ballot.eliminate(position, candidate);
                });
            });
        }
        round++;
    };
    do {
        var state_1 = _loop_1();
        if (typeof state_1 === "object")
            return state_1.value;
    } while (win === null);
    console.log("Congratuations " + win + "! You have been elected " + position + "! \n");
    // If the setting is set, eliminate this canddiate from
    if (!duplicateCandidates) {
        ballots.forEach(function (ballot) { return ballot.eliminateCandidate("" + win); });
    }
    return win;
}
exports.default = runoff;
