var $photoUrl = document.querySelector('#photoUrl');
var $imgEle = document.querySelector('#photo-preview');
var $title = document.querySelector('#entry-title');
var $notes = document.querySelector('#notes');
var $entryForm = document.querySelector('form');

$photoUrl.addEventListener('blur', function (event) {
  $imgEle.src = event.target.value;
});

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

  if (data.editing === null) {
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
  } else {
    data.editing.title = $title.value;
    data.editing.photoUrl = $photoUrl.value;
    data.editing.notes = $notes.value;

    $entryForm.className = 'hidden';
    $entryList.className = 'column-full';
    $imgEle.src = 'images/placeholder-image-square.jpg';
    $entryForm.reset();
    $ul.innerHTML = '';
    for (var entry of data.entries) {
      $ul.appendChild(renderPosts(entry));
    }
    data.editing = null;
  }
});

var $deleteBtn = document.querySelector('.delete');

$ul.addEventListener('click', function (event) {
  if (event.target.matches('.fa-pen')) {
    $entryForm.className = ' ';
    $entryList.className = 'hidden';
    $deleteBtn.className = 'delete';
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

var $entriesNavBar = document.querySelector('.navSpan');
$entriesNavBar.addEventListener('click', function (event) {
  if (event.target.matches('.navSpan')) {
    $entryForm.className = 'hidden';
    $entryList.className = 'column-full';
    $deleteOverlay.className = 'deleteOverlay hidden';
  }
});

var $deleteBox = document.querySelector('div.deleteBox');
var $deleteOverlay = document.querySelector('div.deleteOverlay');

$deleteBtn.addEventListener('click', function (event) {
  if (event.target.matches('.delete')) {
    $deleteOverlay.className = 'deleteOverlay';
  } else {
    $deleteOverlay.className = 'deleteOverlay hidden';
  }
});

$deleteBox.addEventListener('click', function (event) {
  if (event.target.matches('.cancelBtn')) {
    $deleteOverlay.className = 'deleteOverlay hidden';
  } if (event.target.matches('.confirmBtn')) {
    for (var x = 0; x < data.entries.length; x++) {
      if (data.editing.entryId === data.entries[x].entryId) {
        data.entries.splice(x, 1);
      }
      $deleteOverlay.className = 'deleteOverlay hidden';
      $entryForm.className = 'hidden';
      $entryList.className = 'column-full';
      $imgEle.src = 'images/placeholder-image-square.jpg';
      $entryForm.reset();
      $ul.innerHTML = '';
      for (var entry of data.entries) {
        $ul.appendChild(renderPosts(entry));
      }
    }
    data.editing = null;
  }
});
