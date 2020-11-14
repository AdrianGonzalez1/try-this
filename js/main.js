var goButton = document.querySelector('.go-button');
var homeBody = document.querySelector('#home-body');
var $activity = document.querySelector('#activity')
var $viewRandom = document.querySelector('#view-random')
var navBar = document.querySelector('.nav');
var favoriteIcon = document.querySelector('#favorite');
var navFavorite = document.querySelector('#nav-favorite')
var homeIcon = document.querySelector('#nav-home');
var $favoritesList = document.querySelector('#favorites-list');
var $favoritesUl = document.querySelector('.favorite-ul');
var $favHeader = document.querySelector('.fav-header');
getData()



var favorites = []

var storageFavorites = localStorage.getItem('favorites');
storageFavorites = JSON.parse(storageFavorites)
if(storageFavorites !== null){
  favorites = storageFavorites
}
console.log(storageFavorites)


var currentActivity = null

document.addEventListener('click', handleClick)

function handleClick(event){
  if(data.allActivities){
    if(event.target.id === 'go-button'){
      viewSwap(event.target.id);
    }
    if(event.target.id === 'try-again'){
      renderActivity();
      favoriteIcon.classList.remove('favorite')
    }
    if (event.target.id === 'favorite') {
      favoriteIcon.classList.add('favorite')
      //check if current item just added so can't click star and add many times
      if (favorite[favorites.length -1] !== currentActivity )
      favorites.push(currentActivity)
      var favoritesJSON = JSON.stringify(favorites);
      localStorage.setItem('favorites', favoritesJSON);
    }
    if (event.target.id === 'nav-home') {
      viewSwap(event.target.id)
    }
    if (event.target.id === 'nav-favorite') {
      viewSwap(event.target.id)
      console.log('star clicked')
    }
  }
}



function getData () {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://uzairashraf.dev/activity/api.json' )
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    data.allActivities = xhr.response
  });
  xhr.send();
}

function viewSwap(id) {
  if(id === "go-button"){
    homeBody.classList.add('hidden')
    $viewRandom.classList.remove('hidden')
    navBar.classList.remove('hidden')

    renderActivity()
  }
  if (id === 'nav-home') {
    $viewRandom.classList.add('hidden');
    navBar.classList.add('hidden');
    homeBody.classList.remove('hidden')
    $favoritesUl.classList.add('hidden')
    $favHeader.classList.add('hidden')
  }
  if (id === 'nav-favorite') {
    homeBody.classList.add('hidden');
    $viewRandom.classList.add('hidden');
    $favoritesUl.classList.remove('hidden')
    $favHeader.classList.remove('hidden')
    renderFavorites();
  }
}

function renderActivity(){
  $activity.innerHTML = ''
  var random = Math.floor(Math.random() * data.allActivities.length)
  //get random activty
  var randomActivity = data.allActivities[random]
  currentActivity = randomActivity

  // render to the dom

  var activityName = document.createElement('p');
  var nameSpan = document.createElement('span')
  nameSpan.textContent = "Activity Name: "
  var nameText = document.createTextNode(randomActivity.activity)
  activityName.appendChild(nameSpan)
  activityName.appendChild(nameText)
  $activity.appendChild(activityName);

  var activityType = document.createElement('p');
  var activitySpan = document.createElement('span');
  activitySpan.textContent = 'Activity Type: ';
  var activityText = document.createTextNode(randomActivity.type);
  activityType.appendChild(activitySpan);
  activityType.appendChild(activityText);
  $activity.appendChild(activityType);

  var participants = document.createElement('p');
  var participantsSpan = document.createElement('span');
  participantsSpan.textContent = 'Participants: ';
  var participantsText = document.createTextNode(randomActivity.participants);
  participants.appendChild(participantsSpan);
  participants.appendChild(participantsText);
  $activity.appendChild(participants);

  var activityPrice = document.createElement('p');
  var priceSpan = document.createElement('span');
  priceSpan.textContent = 'Price: ';
  var priceText = document.createTextNode(getPrice(randomActivity.price));
  activityPrice.appendChild(priceSpan);
  activityPrice.appendChild(priceText);
  $activity.appendChild(activityPrice);
}

function renderFavorites() {
  if (favorites[favorites.length-1] !== favorites[i])
  for (var i = 0; i <= favorites.length; i++) {
    var favoriteLi = document.createElement('li');
    favoriteLi.textContent = favorites[i].activity;
    $favoritesUl.appendChild(favoriteLi);
  }
}

function getPrice (price) {
  var result;
  if (price === 0) {
   result = 'Free!';
 } else if (price <= 0.25) {
   result = '$';
 } else if (price <= 0.4) {
   result = '$$';
 } else {
   result = '$$$'
 }
 return result
}