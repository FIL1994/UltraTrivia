/*
 * @author: Philip Van Raalte
 * @date November 8, 2017
 *
 * Functional components for the Spectre CSS library
 */
import React from 'react';
import _ from 'lodash';

export const Divider = (props) => {
  let className = "divider";

  if(_.isString(props.className)) {
    className = `${props.className} ${className}`;
  }

  return <div {...props} className={className}/>;
};

export const Page = (props) => {
  let className = "page container centered text-center";

  if(_.isString(props.className)) {
    className = `${props.className} ${className}`;
  }

  return <div {...props} className={className}/>;
};