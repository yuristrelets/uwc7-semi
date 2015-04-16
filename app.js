if('serviceWorker' in navigator) {
  navigator
    .serviceWorker
    .register('/uwc7-semi/worker.js', { scope: '/uwc7-semi/' })
    .then(function(reg) {
      console.info('Service worker registered! Scope:', reg.scope);
    })
    .catch(function(error) {
      console.error('Service worker error!', error);
    });
}

var url = "http://www.reddit.com/";
url += "r/javascript/.json";

get(url, function(data) {
  //console.log(data);
  data = JSON.parse(data);
  console.log(data);
}, function(err) {
  console.log(err);
});

function get(url, res, err) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function () {
    return res(xhr.response);
  };
  xhr.onerror = function () {
    if (err !== undefined) {
      return err(xhr.response);
    }
  };
  xhr.send();
}