import React from 'react';

function render(string, props = {}) {
  let output = [];
  let temp = '';
  let levels = [];
  let ignore_count = 0;

  const options = ['_','*','^','~','@','`'];

  for (let i=0; i<string.length; i++) {
    const a = string.charAt(i);
    const b = string.charAt(i+1);
    if (a === ')') {
      if (ignore_count === 0) {
        let element = levels.pop();
        element.props.children.push(temp);
        if (element.type === 'a') {
          const index_of_href_end = string.indexOf(']', i);
          const href_identifier = string.substring(i+2, index_of_href_end);
          const target_blank = (string.charAt(index_of_href_end+1) === '>');
          element = React.cloneElement(element, {
            href: (props[href_identifier] || href_identifier),
            target: (target_blank ? '_blank' : null),
          });
          i += href_identifier.length + 2 + (target_blank ? 1 : 0);
        }
        if (levels.length > 0) {
          levels[levels.length - 1].props.children.push(element);
        }
        else {
          output.push(element);
        }
        temp = '';
      }
      else {
        ignore_count -= 1;
        temp += a;
      }
    }
    else if (b === '(') {
      if (options.includes(a)) {
        if (levels.length > 0) {
          levels[levels.length - 1].props.children.push(temp);
        }
        else {
          output.push(temp);
        }
        temp = '';
        i++;
        let tag;
        switch (a) {
          case '_':
            tag = 'em';
          break;
          case '*':
            tag = 'strong';
          break;
          case '^':
            tag = 'sup';
          break;
          case '~':
            tag = 'sub';
          break;
          case '@':
            tag = 'a';
          break;
          case '`':
            tag = 'code';
          break;
        }
        levels.push(React.createElement(tag, {key: i}, []));
      }
      else {
        ignore_count += 1;
        temp += a;
      }
    }
    else {
      temp += a;
    }
  }
  if (temp !== '') {
    output.push(temp);
  }
  return output;
}

const Markling = {
  render,
};

export default Markling;

module.exports = Markling;
