/** @license GPL-3.0
 * SpectreCSS.js
 *
 * @author: Philip Van Raalte
 * @date November 8, 2017
 *
 * Functional components for the Spectre CSS library.
 */
import React from 'react';
import _ from 'lodash';

/**
 * Prepends the className from props to the component default className.
 * @param {String} defaultClass The default class for the component.
 * @param {String} newClass The class name to prepend to the default class. (So the default class will override it)
 * @return {String} JSX Component
 */
function addClass(defaultClass, newClass) {
  return `${_.isString(newClass) ? newClass : ''} ${defaultClass}`.trim();
}

/**
 * A divider for separating elements.
 * @param {Object} props Properties for the component.
 * @return {XML} JSX Component
 */
export const Divider = (props) => {
  let className = "divider";

  // add the className prop to the className
  className = addClass(className, props.className);

  // allow size to be passed as a string or a number
  if(!_.isEmpty(props.size) || _.isNumber(props.size)) {
    className = `${className} col-${props.size.toString().trim()}`;
  }

  return <div {...props} className={className}/>;
};

/**
 * A page for containing elements.
 * @param {Object} props Properties for the component.
 * @return {XML} JSX Component
 */
export const Page = (props) => {
  let className = "page container centered text-center";

  // add the className prop to the className
  className = addClass(className, props.className);

  return <div {...props} className={className}/>;
};