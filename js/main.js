/* global data */

var photoUrl = document.querySelector('#photoUrl');
var img = document.querySelector('#photo-preview');
// var newEntry = {};
// var nextEntryId = 0;
// var title = document.querySelector('#entry-title');
// var notes = document.querySelector('#notes');

photoUrl.addEventListener('input', function (event) {
  img.src = event.target.value;
});

/* exported data */
