/* global data */
/* exported data */

var $photoUrl = document.querySelector('#photoUrl');
var $imgEle = document.querySelector('#photo-preview');
var $title = document.querySelector('#entry-title');
var $notes = document.querySelector('#notes');
var $entryForm = document.querySelector('form');

$photoUrl.addEventListener('input', function (event) {
  $imgEle.src = event.target.value;
});

/* <li>
  <div class="row">
    <div class="column-half">
      <img src="images/placeholder-image-square.jpg">
            </div>
      <div class="column-half">
        <div class="title-editRow">
          <h2 class="entry-h2">Title </h2>
          <button class="fas fa-pen"></button>
        </div>
        <p>Text Content</p>
      </div>
    </div>
</li> */

var $ul = document.querySelector('ul');

function renderPosts(entry) {
  var $liItem = document.createElement('li');
  $liItem.setAttribute('entry-id', entry.entryId);

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

  var $titleDiv = document.createElement('div');
  $titleDiv.className = 'title-editRow';
  $textDiv.appendChild($titleDiv);

  var $title = document.createElement('h2');
  $title.className = 'entry-h2';
  var $titleText = document.createTextNode(entry.title);
  $title.appendChild($titleText);
  $titleDiv.appendChild($title);

  var $editBtn = document.createElement('button');
  $editBtn.className = 'fas fa-pen';
  $titleDiv.appendChild($editBtn);

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

var $entryList = document.querySelector('#entryList');
var $newButton = document.querySelector('.newButton');

$newButton.addEventListener('click', function (event) {
  if (event.target.matches('.newButton')) {
    $entryForm.className = ' ';
    $entryList.className = 'hidden';
  }
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
  $imgEle.src = 'images/placeholder-image-square.jpg';
  $entryForm.reset();

  $entryForm.className = 'hidden';
  $ul.prepend(renderPosts(newEntry));
  $entryList.className = 'column-full';
});

$ul.addEventListener('click', function (event) {
  if (event.target.matches('.fa-pen')) {
    $entryForm.className = ' ';
    $entryList.className = 'hidden';
  }
  var $liContainer = event.target.closest('li');

  for (var i = 0; i < data.entries.length; i++) {
    if (parseInt($liContainer.getAttribute('entry-id')) === data.entries[i].entryId) {
      data.editing = data.entries[i];
      $imgEle.setAttribute('src', data.entries[i].photoUrl);
      $title.value = data.entries[i].title;
      $photoUrl.value = data.entries[i].photoUrl;
      $notes.value = data.entries[i].notes;
    }
  }
});
