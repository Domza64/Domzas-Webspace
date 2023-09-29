var deviders = $('.section-devider > span');
var randDeviderString = deviderBuilder();
deviders.html(randDeviderString);

function deviderBuilder() {
  var randomString = '';
  for (var i = 0; i < 80; i++) {
    if ((Math.random() * 6) > 4 && randomString.charAt(randomString.length - 1) == '-') {
      randomString += '<b>-</b>'
      continue;
    }
    randomString += '-';
  }
  return (randomString)
}