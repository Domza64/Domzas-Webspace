$(document).ready(function() {
  // Create section deviders
  var deviders = $('.section-devider > span');
  var randDeviderString = deviderBuilder();
  deviders.html(randDeviderString);

  // Get comments from API
  // Could have done this more simply with Model and Thymeleaf,
  // but thought that this might be fun way to do it too so I did it this way.
  // Now I have cool API I can reuse somewhere else :>
  $.getJSON("/api/comments", {}, function (data) {
      var $ul = $('#message-container');
      $.each(data, function(idx, message) {
          $ul.append(
              '<li>' +
              '<div class="name">' + message.name + '</div>' +                            
              '<div class="message">' + message.message + '</div>' +
              '<div class="date">' + message.date + '</div>' +
              '</li>'
          )
      });
  });
});

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
