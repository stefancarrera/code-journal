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

var $ul = document.querySelector('ul');

function renderPosts(entry) {
  var $liItem = document.createElement('li');

  var $outterDiv = document.createElement('div');
  $outterDiv.className = 'row';
  $liItem.appendChild($outterDiv);

  var $imgDiv = document.createElement('div');
  $imgDiv.className = 'column-half';
  $outterDiv.appendChild($imgDiv);

  var $img = document.createElement('img');
  $img.setAttribute('src', entry.photoUrl);
  $imgDiv.appendChild($img);

  var $textDiv = document.createElement('div');
  $textDiv.className = 'column-half';
  $outterDiv.appendChild($textDiv);

  var $title = document.createElement('h2');
  $title.className = 'entry-h2';
  var $titleText = document.createTextNode(entry.title);
  $title.appendChild($titleText);
  $textDiv.appendChild($title);

  var $noteP = document.createElement('p');
  var $noteText = document.createTextNode(entry.notes);
  $noteP.appendChild($noteText);
  $textDiv.appendChild($noteP);

  return $liItem;
}

window.addEventListener('DOMContentLoaded', function (event) {
  for (var entry of data.entries) {
    $ul.appendChild(renderPosts(entry));
  }
});
