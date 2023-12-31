$(document).ready(function() {
  // Create section deviders
  updateDeviders();

  // If mesage form has input errors scroll to it instead of staying on a hero page
  if ($('.input-error')[0]) {
    location.href = '#message-form';
  }

  // Get comments from API
  // Could have done this more simply with Model and Thymeleaf,
  // but thought that this might be fun way to do it too so I did it this way.
  // Now I have cool API I can reuse somewhere else :>
  $.getJSON("/api/comments", {}, function (data) {
      var $ul = $('#message-container');
      $.each(data, function(idx, messageObj) {
        var name = $('<div class="name"></div>').text(messageObj.username);
        var message = $('<div class="message"></div>').text(messageObj.message);
        var date = $('<div class="date"></div>').text(messageObj.date);
        $ul.append($('<li></li>').append(name, message, date))
      });
  });
});

// Probably not very resource heavy for todays standards... Still tho, probably should add option to disable this
function updateDeviders() {
  var deviders = $('.section-devider > span');
  var randDeviderString = deviderBuilder();
  deviders.html(randDeviderString);
  setTimeout(function() {
    updateDeviders();
  }, 550)
}

function deviderBuilder() {
  var randomString = '';
  for (var i = 0; i < 100; i++) {
    if ((Math.random() * 6) > 4 && randomString.charAt(randomString.length - 1) == '-') {
      randomString += '<b>-</b>'
      continue;
    }
    randomString += '-';
  }
  return (randomString)
}

var isPlaying = false;
var audio = new Audio("../assets/media/audio/miku.mp3");
function playMiku() {
  if (!isPlaying) {
    audio.load();
    audio.play();
    isPlaying = true;
  }
  else {
    audio.pause();
    isPlaying = false;
  }
}
