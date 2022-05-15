const { element } = require('../lib/webGeneratorLib/webGeneratorLib.js');
const { readFileSync, writeFileSync } = require('fs');

const commitChanges = function (filePath, data) {
  writeFileSync(filePath, data, 'utf8');
};

const readFile = function (path) {
  return readFileSync(path, 'utf8');
};

const bookmark = function (link) {
  const anchor = element({
    name: 'a',
    attributes: { href: link.url, target: '_blank' },
    content: link.name
  });

  // const h2 = element({ name: 'h2', attributes: {}, content: anchor });

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
  const linkIndex = links.findIndex(link => link.name === name);
  links.splice(linkIndex, 1);

  return links;
};

const main = function ({ action, name, url }) {
  const template = readFile(this.templatePath);
  let links = JSON.parse(readFile(this.dbPath));

  if (action === 'add') {
    links = createBookmark(links, { name, url });
  }
  if (action === 'delete') {
    links = deleteBookmark(links, name);
  }
  const bookmarkPage = generatePage(links, template, this.htmlPagePath);

  commitChanges(this.dbPath, JSON.stringify(links));
  commitChanges(this.htmlPagePath, bookmarkPage);
};

const createBookmark = (links, { name, url }) => {
  links.push({ name, url });
  return links;
};

exports.editBookmark = main.bind({
  dbPath: './resources/bookmarks.json',
  templatePath: './resources/bookmark_temp.html',
  htmlPagePath: './resources/targetDir/index.html'
});
