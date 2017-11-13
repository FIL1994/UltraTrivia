/**
 * @author Philip Van Raalte
 * @date 2017-11-13
 */
class Score {
  constructor({time, correct, id}) {
    this.time = time;
    this.correct = correct;
    this.id = id;
  }

  getScore() {
    let multiplier = (450 - this.time) / 0.5;
    if(multiplier < 1) {
      multiplier = 1;
    }
    return this.correct * multiplier;
  }
}

export default Score;