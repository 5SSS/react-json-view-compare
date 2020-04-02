export const isArray = item => {
  if (typeof item === 'string' && item === 'array') {
    return true;
  }
  return Object.prototype.toString.call(item) === '[object Array]';
};
export const isObject = item => {
  return Object.prototype.toString.call(item) === '[object Object]';
};
const isNull = item => {
  return Object.prototype.toString.call(item) === '[object Null]';
};
const isNumber = item => {
  return typeof item === 'number';
};
const isRegexp = item => {
  return Object.prototype.toString.call(item) === '[object RegExp]';
};
const isBoolean = item => {
  return typeof item === 'boolean';
};
const isUndefined = item => {
  return typeof item === 'undefined';
};
const isFunction = item => {
  return typeof item === 'function';
};
export const needFormat = type => {
  return type === 'array' || type === 'object';
};
export const getIndent = level => {
  if (level === 1) {
    return { textIndent: '20px' };
  }
  return { textIndent: `${level * 20}px` };
};
export const getType = item => {
  let t = Object.prototype.toString.call(item);
  let match = /(?!\[).+(?=\])/g;
  t = t.match(match)[0].split(' ')[1];
  return t.toLowerCase();
};

export const isComplexType = param => {
  return isObject(param) || isArray(param);
};

export const isTheSametype = (a, b) => {
  return (
    Object.prototype.toString.call(a) === Object.prototype.toString.call(b)
  );
};

export const mergeData = (_old, _new) => {
  // finally result
  let result = [];
  // each line No.
  let start = 1;

  // convert array or object to Array<object> [{}]
  const convertObject = (param, lineType) => {
    let list = [];
    if (isComplexType(param)) {
      let showIndex = getType(param) === 'object';
      let keys = Object.keys(param);
      let length = keys.length;
      keys.forEach((key, index) => {
        let type = getType(param[key]);
        list.push({
          name: key,
          line: start++,
          value: convertObject(param[key], lineType),
          type: type,
          showIndex: showIndex,
          needComma: length !== index + 1,
          lineType: lineType,
          lastLineType: lineType,
          lastLine: isComplexType(param[key]) ? start++ : null
        });
      });
      return list;
    } else {
      if (isNumber(param)) {
        return param + '';
      }
      if (isNull(param)) {
        return 'null';
      }
      if (isUndefined(param)) {
        return 'undefined';
      }
      if (isBoolean(param)) {
        return param + '';
      }
      if (isFunction(param)) {
        return ' ƒ() {...}';
      }
      if (isRegexp(param)) {
        return param.toString();
      }
      return `"${param.toString()}"`;
    }
  };
  // return parsed data
  const parseValue = (key, value, showIndex, needComma, lineType) => {
    return Object.assign(Object.create(null), {
      name: key,
      line: start++,
      value: convertObject(value, lineType),
      type: getType(value),
      showIndex: showIndex,
      needComma: needComma,
      lineType: lineType,
      lastLineType: lineType,
      lastLine: isComplexType(value) ? start++ : null
    });
  };
  // merge two vars to target,target type Array<object>[{}]
  const parseData = (a, b, target) => {
    let _ar = Object.keys(a);
    let _br = Object.keys(b);
    let showIndex = isObject(a);
    // deleted keys
    let _del = _ar.filter(ak => !_br.some(bk => bk === ak));
    // not removed keys
    let _stl = _ar.filter(ak => _br.some(bk => bk === ak));
    // new added keys
    let _add = _br.filter(bk => !_ar.some(ak => ak === bk));
    // push deleted keys
    _del.forEach((key, index) => {
      target.push(parseValue(key, a[key], showIndex, true, 'del'));
    });
    // The core function: compare
    _stl.forEach((key, index) => {
      if (a[key] === b[key]) {
        target.push(parseValue(key, b[key], showIndex, true, 'none'));
      } else if (isTheSametype(a[key], b[key])) {
        if (isComplexType(a[key])) {
          let _target = parseValue(
            key,
            isArray(a[key]) ? [] : {},
            showIndex,
            true,
            'none'
          );
          target.push(_target);
          // back one step
          start -= 1;
          // go inside
          parseData(a[key], b[key], _target.value);
          // rewrite lastline
          _target.lastLine = start++;
        } else {
          target.push(parseValue(key, a[key], showIndex, true, 'del'));
          target.push(parseValue(key, b[key], showIndex, true, 'add'));
        }
      } else {
        target.push(parseValue(key, a[key], showIndex, true, 'del'));
        target.push(parseValue(key, b[key], showIndex, true, 'add'));
      }
    });
    // push new keys
    _add.forEach((key, index) => {
      target.push(
        parseValue(key, b[key], showIndex, _add.length !== index + 1, 'add')
      );
    });
  };
  if (isTheSametype(_old, _new) & isComplexType(_old)) {
    parseData(_old, _new, result);
  } else {
    if (_old === _new) {
      result.push(parseValue(0, _new, false, false, 'none'));
    } else {
      result.push(parseValue(0, _old, false, true, 'del'));
      result.push(parseValue(1, _new, false, false, 'add'));
    }
  }
  console.log('result', result);
  return result;
};
