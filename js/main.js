/* global data */

var $photoUrl = document.querySelector('#photoUrl');
var $img = document.querySelector('#photo-preview');
var $title = document.querySelector('#entry-title');
var $notes = document.querySelector('#notes');
var $entryForm = document.querySelector('form');

$photoUrl.addEventListener('input', function (event) {
  $img.src = event.target.value;
});

$entryForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var newEntry = {};

  newEntry.title = $title.value;
  newEntry.photoUrl = $photoUrl.value;
  newEntry.notes = $notes.value;
  newEntry.entryId = data.nextEntryId;

  data.nextEntryId++;

  data.entries.unshift(newEntry);
  $img.src = 'images/placeholder-image-square.jpg';
  $entryForm.reset();
});
/* exported data */
