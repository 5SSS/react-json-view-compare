import React, { useState } from 'react';
import { isArray, getIndent, getType } from './utils.js';
import Tree from './tree.js';
export default function ComplexTree(props) {
  let {
    name,
    value,
    type,
    line,
    showIndex,
    needComma,
    level = 1,
    lineType,
    lastLineType,
    lastLine = null
  } = props;

  let [visiable, setVisiable] = useState(true);

  return (
    <div className="c-json-line">
      <p
        className={`c-json-p c-line-${lineType}`}
        onClick={() => setVisiable(!visiable)}
        style={getIndent(level)}
      >
        <span className="c-json-mark">{line}</span>
        <span className={`c-of-${lineType}`}></span>
        <span className="c-json-content">
          {showIndex && <span className="c-json-key">{name}: </span>}
          <span className="c-json-pt">{isArray(type) ? '[' : '{'}</span>
        </span>
        {!visiable && (
          <span className="c-json-pt">
            {isArray(type) ? '...]' : '...}'}
            {needComma ? ',' : ''}
          </span>
        )}
      </p>
      <div style={{ display: visiable ? 'block' : 'none' }}>
        {value.map((item, index) => (
          <Tree key={index} level={level + 1} {...item} />
        ))}
        <p
          className={`c-json-feet c-json-p c-line-${lineType}`}
          style={getIndent(level)}
        >
          {lastLine && <span className="c-json-mark">{lastLine}</span>}
          {lastLineType && <span className={`c-of-${lastLineType}`}></span>}
          <span className="c-json-pt">
            {isArray(type) ? ']' : '}'}
            {needComma ? ',' : ''}
          </span>
        </p>
      </div>
    </div>
  );
}
