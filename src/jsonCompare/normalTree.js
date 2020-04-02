import React from 'react';
import { getIndent } from './utils.js';
export default function NormalTree(props) {
  let {
    name,
    value,
    line,
    showIndex,
    type,
    lineType,
    needComma,
    level = 1
  } = props;

  return (
    <p className={`c-json-p c-line-${lineType}`} style={getIndent(level)}>
      <span className="c-json-mark">{line}</span>
      <span className={`c-of-${lineType}`}></span>
      <span className="c-json-content">
        {showIndex && <span className="c-json-key">{name}: </span>}
        <span className={`c-json-${type}`}>{value}</span>
        <span className="c-json-comma">{needComma ? ',' : ''}</span>
      </span>
    </p>
  );
}
