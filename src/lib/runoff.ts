import Ballot from "./ballot";

export function unbreakableTie(totals: { [candidate: string]: number }) {
  return (
    Object.values(totals).every((a, i, v) => a === v[0]) &&
    Object.values(totals).length > 1
  );
}

export function eliminatedCandidates(totals: { [candidate: string]: number }) {
  const { candidates } = rankCandidates(totals);

  return candidates.filter(
    candidate => totals[candidate] <= totals[candidates.slice(-1)[0]]
  );
}

export function rankCandidates(totals: { [candidate: string]: number }) {
  const candidates = Object.keys(totals).sort((a, b) => totals[b] - totals[a]);
  const totalVotes = Object.values(totals).reduce((a, b) => a + b);
  return { candidates, totalVotes };
}

export function winner(totals: { [candidate: string]: number }) {
  const { candidates, totalVotes } = rankCandidates(totals);

  if (totals[candidates[0]] > totalVotes * 0.5) {
    return candidates[0];
  } else {
    return null;
  }
}

/**
 * Performs an election to determine a winner
 */
export default function runoff(position: string, ballots: Ballot[]) {
  let totals: { [candidate: string]: number } = {};
  let round = 1;
  let win = null;

  do {
    totals = {};

    // Tally ballots
    for (let ballot of ballots) {
      let vote = ballot.getVote(position);

      if (!vote) continue;

      if (!totals[vote]) {
        totals[vote] = 1;
      } else {
        totals[vote]++;
      }
    }

    // Check for no votes cast
    if (Object.keys(totals).length < 1) {
      console.log(` No votes cast for ${position}. Skipping election!\n`);
      return null;
    }

    const { candidates, totalVotes } = rankCandidates(totals);

    console.log(`   \nRound ${round}:`);
    console.log(
      candidates
        .map(
          (candidate, i) =>
            `   ${i + 1}. ${candidate} — ${totals[candidate]} votes (${(
              (totals[candidate] / totalVotes) *
              100
            ).toFixed(2)}%)`
        )
        .join("\n")
    );
    console.log("");

    if (unbreakableTie(totals)) {
      console.log(` There is an unbreakable tie. Skipping election!\n`);
      return null;
    }

    win = winner(totals);

    if (!win) {
      let eliminted = eliminatedCandidates(totals);
      console.log(
        `   No candidate has reached majority consensus. Eliminating ${eliminted.join(
          ", "
        )}`
      );
      ballots.forEach(ballot =>
        eliminted.forEach(candidate => {
          ballot.eliminate(position, candidate);
        })
      );
    }

    round++;
  } while (win === null);

  console.log(`Congratuations ${win}! You have been elected ${position}! \n`);
}
