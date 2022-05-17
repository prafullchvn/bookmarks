const { editBookmark } = require('./src/editBookmark.js');

const action = process.argv[2];
const name = process.argv[3];
const url = process.argv[4];

const fileNames = {
  dbPath: './resources/bookmarks.json',
  templatePath: './resources/bookmark_temp.html',
  htmlPagePath: './bookmarks/index.html'
};

editBookmark({ ...fileNames }, { action, name, url });
