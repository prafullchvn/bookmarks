const formatAttribute = function (attribute, values) {
  return attribute + '="' + [].concat(values).join(' ') + '"';
};

const parseAttributes = function (attributes) {
  return Object.keys(attributes).map((key) => {
    return formatAttribute(key, attributes[key]);
  }).join(' ');
};

const startingTag = function (name, attributes) {
  let attr = parseAttributes(attributes);
  attr = attr === '' ? attr : ' ' + attr;

  return '<' + name + attr + '>';
};

const element = function ({ name, attributes, content }) {
  return startingTag(name, attributes) + content + '</' + name + '>';
};

const div = function ({ attributes, content }) {
  return element({ name: 'div', attributes, content });
};

exports.element = element;
exports.div = div;
