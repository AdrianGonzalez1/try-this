var goButton = document.querySelector('.go-button');
var homeBody = document.querySelector('#home-body');
var $activity = document.querySelector('#activity')
var $viewRandom = document.querySelector('#view-random')


getData()

document.addEventListener('click', handleClick)

function handleClick(event){
  if(data.allActivities){
    if(event.target.id === 'go-button'){
      viewSwap(event.target.id)
    }
    if(event.target.id === 'try-again'){
      renderActivity()
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
    renderActivity()
  }
}

function renderActivity(){
  $activity.innerHTML = ''
  var random = Math.floor(Math.random() * data.allActivities.length)
  //get random activty
  var randomActivity = data.allActivities[random]
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


  // have button where we can ctry agian
}

function getPrice (price) {
  var result
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