/**
 * @author Philip Van Raalte
 * @date 2017-11-13
 */
class Score {
  constructor({time, correct, id}) {
    if(time === undefined) {
      throw "Score constructor - you must provide a 'time' property";
    }
    if(correct === undefined) {
      throw "Score constructor - you must provide a 'correct' property (number of answers correct)";
    }
    if(id === undefined) {
      throw "Score constructor - you must provide an 'id' property";
    }

    this.time = time;
    this.correct = correct;
    this.id = id;
  }

  getScore() {
    let multiplier = (450 - this.time) / 0.5;
    if(multiplier < 1) {
      multiplier = 1;
    }
    return Math.ceil(this.correct * multiplier);
  }
}

export default Score;