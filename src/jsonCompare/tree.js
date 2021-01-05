import React from 'react';
import { needFormat } from './utils.js';
import ComplexTree from './complexTree.js';
import NormalTree from './normalTree.js';

export default function Tree(props) {
  let { type } = props;
  if (needFormat(type)) {
    return <ComplexTree {...props} />;
  }
  return <NormalTree {...props} />;
}
