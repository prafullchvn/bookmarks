const { element } = require('../lib/webGeneratorLib.js');
const fs = require('fs');

const saveChanges = function (filePath, data) {
  try {
    fs.writeFileSync(filePath, data, 'utf8');
  } catch (error) {
    return error.name + '->' + error.message;
  }
};

const readFile = function (path) {
  try {
    return fs.readFileSync(path, 'utf8');
  } catch (error) {
    return error.name + '->' + error.message;
  }
};

const bookmark = function (link) {
  const anchor = element({
    name: 'a',
    attributes: { href: link.url, target: '_blank' },
    content: link.name
  });

  const div = element({
    name: 'div', attributes: { class: 'link' }, content: anchor
  });

  return div;

};

const generatePage = (links, template) => {
  const linksAsHtml = links.map(bookmark).join('\n');
  const page = template.replace('__LINKS__', linksAsHtml);

  return page;
};

const deleteBookmark = function (links, name) {
  const linkIndex = links.findIndex(link => {
    return link.name.toLowerCase() === name.toLowerCase();
  });

  if (linkIndex !== -1) {
    links.splice(linkIndex, 1);
  }

  return links;
};

const main = function ({ dbPath, templatePath, htmlPagePath }, userInput) {
  const template = readFile(templatePath);
  let links = JSON.parse(readFile(dbPath));

  const { action } = userInput;
  if (action === 'add') {
    links = createBookmark(links, userInput);
  }
  if (action === 'delete') {
    links = deleteBookmark(links, userInput.name);
  }
  const bookmarkPage = generatePage(links, template, htmlPagePath);

  saveChanges(dbPath, JSON.stringify(links));
  saveChanges(htmlPagePath, bookmarkPage);
};

const createBookmark = (links, { name, url }) => {
  links.push({ name, url });
  return links;
};

exports.editBookmark = main;
