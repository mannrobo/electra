export default class Ballot {
  id: string;
  team: string;
  preferences: { [position: string]: string[] };
  submitted: Date;

  constructor(
    id: string,
    team: string,
    preferences: { [position: string]: string[] },
    submitted: Date
  ) {
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
  eliminate(position: string, candidate: string) {
    if (!this.preferences[position]) return;

    this.preferences[position] = this.preferences[position].filter(
      v => v !== candidate
    );
  }

  // Eliminates a candidate from every position
  eliminateCandidate(candidate: string) {
    Object.keys(this.preferences).forEach(position =>
      this.eliminate(position, candidate)
    );
  }

  getVote(position: string) {
    return (this.preferences[position] || [])[0];
  }

  static fromRawData(data: string[], rows: string[]) {
    let preferences: { [position: string]: string[] } = {};

    data.forEach((cell, i) => {
      let match = rows[i].match(/(.+) \[([0-9]).*\]/);
      if (!match || !cell) return;

      let [, position, ranking] = match;

      if (!preferences[position]) {
        preferences[position] = [];
      }
      preferences[position][+ranking - 1] = cell;
    });

    return new Ballot(data[1], data[2], preferences, new Date(data[0]));
  }
}
