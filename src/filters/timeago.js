exports.inject = function(app) {
  app.filter('timeago', exports.factory);
};

exports.factory = function() {
  var
    MINUTE = 60,
    HOUR = MINUTE * 60,
    DAY = HOUR * 24,
    MONTH = DAY * 30,
    YEAR = MONTH * 12;

  return function(time, local) {
    if(!time) return 'never';

    // if in seconds
    if(time.toString().length === 10) {
      time *= 1000;
    }

    if(!local) {
      local = Date.now();
    }

    time = new Date(time).getTime();
    local = new Date(local).getTime();

    if(!angular.isNumber(time) || !angular.isNumber(local)) {
      return;
    }

    var
      diff = Math.abs((local - time) / 1000),
      span = [];

    if(diff < MINUTE) span = ['', 'less than a minute'];
    else if(diff < HOUR) span = [_diff(diff / MINUTE), 'minute'];
    else if(diff < DAY) span = [_diff(diff / HOUR), 'hour'];
    else if(diff < MONTH) span = [_diff(diff / DAY), 'day'];
    else if(diff < YEAR) span = [_diff(diff / MONTH), 'month'];
    else span = [_diff(diff / YEAR), 'year'];

    span[1] += (span[0] > 1) ? 's' : '';
    span = span.join(' ');

    return (time <= local) ? span + ' ago' : 'in ' + span;
  }
};

function _diff(value) {
  return Math.round(Math.abs(value));
}
