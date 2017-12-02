/**
 * @author Philip Van Raalte
 * @date 2017-11-28
 */
import React from 'react';
import {shallow} from 'enzyme';
import Timer from '../components/Timer';
import _ from 'lodash';

describe("Timer", () => {
  it("state has a seconds variable that is a number", () => {
    const timer = shallow(<Timer/>);
    expect(_.isNumber(timer.state().seconds)).toBe(true);
  });

  it("starts counting from 0", () => {
    const timer = shallow(<Timer/>);
    expect(timer.state().seconds).toBe(0);
  });
});