'use strict';
const a = (function() {
  var f = false;
  return function() {
    if (!f) {
      console.log(
        'welcome use React-Json-view-compare, detail: "https://github.com/5SSS/react-json-view-compare"'
      );
      f = true;
    }
  };
})();
a();
const ReactJsonCompare = require('./jsonCompare/index.js');
module.exports = ReactJsonCompare;
