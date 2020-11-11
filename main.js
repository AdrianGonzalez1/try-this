var goButton = document.querySelector('.go-button');



goButton.addEventListener('click', function () {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://www.boredapi.com/api/activity/' )
  xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
    console.log(xhr.response)
    });
    xhr.send();
})
