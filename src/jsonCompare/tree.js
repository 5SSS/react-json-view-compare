import React from 'react';
import { needFormat } from './utils.js';
import ComplexTree from './complexTree.js';
import NormalTree from './normalTree.js';

export default function Tree(props) {
  let { type } = props;

  return (
    <>
      {needFormat(type) ? (
        <ComplexTree {...props} />
      ) : (
        <NormalTree {...props} />
      )}
    </>
  );
}
