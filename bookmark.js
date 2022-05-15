const { editBookmark } = require('./src/editBookmark.js');

const action = process.argv[2];
const name = process.argv[3];
const url = process.argv[4];

editBookmark({ action, name, url });
