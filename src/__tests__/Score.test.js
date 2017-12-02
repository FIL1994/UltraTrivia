/**
 * @author Philip Van Raalte
 * @date 2017-12-02
 */
import React from 'react';
import Score from '../data/Score';

describe("Score", () => {
  describe('', () => {
    let score;
    beforeEach(() => {
      score = new Score({id: "test", correct: 12, time: 54});
    });

    describe('getScore', () => {
      describe('returns', () => {
        it("not a string", () => {
          expect(typeof score.getScore()).not.toBe('string');
        });

        it("a number", () => {
          expect(typeof score.getScore()).toBe('number');
        });

        it("an integer", () => {
          expect(Number.isInteger(score.getScore())).toBeTruthy();
        });
      });
    });

    describe("has a property of", () => {
      it("id", () => {
        expect(score.id).toBeDefined();
      });

      it("time", () => {
        expect(score.time).toBeDefined();
      });

      it("correct", () => {
        expect(score.correct).toBeDefined();
      });
    });
  });

  it("throws an error on invalid properties", () => {
    expect(() => new Score({})).toThrow();
  });
});