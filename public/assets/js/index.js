export const GUEST_BOOK_SUBMIT_URL =
  "https://domza-api.domza.xyz/domza/submitGuestBookComment";
export const GUEST_BOOK_COMMENTS_URL =
  "https://domza-api.domza.xyz/domza/guestBookComments";

$(document).ready(function () {
  // Create section deviders
  updateDeviders();

  $("#mikuButton").on("click", playMiku);

  // If mesage form has input errors scroll to it instead of staying on a hero page
  if ($(".input-error")[0]) {
    location.href = "#message-form";
  }

  // Attach a submit event to the form
  $("#message-form").submit(function (event) {
    event.preventDefault();

    const formData = {};
    $(this)
      .serializeArray()
      .forEach((field) => {
        formData[field.name] = field.value;
      });

    $.ajax({
      url: GUEST_BOOK_SUBMIT_URL,
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(formData),
      success: function () {
        loadComments();
        $("#message-form")[0].reset();
      },
      error: function (xhr, status, error) {
        alert("Error submitting comment :(");
        console.error("Error submitting message:", status, error);
      },
    });
  });

  loadComments();
});

function loadComments() {
  // Get comments from API
  // Could have done this more simply with Model and Thymeleaf,
  // but thought that this might be fun way to do it too so I did it this way.
  // Now I have cool API I can reuse somewhere else :>
  // Get comments from API
  $.getJSON(GUEST_BOOK_COMMENTS_URL, {}, function (data) {
    var $ul = $("#message-container");
    $ul.empty();

    $.each(data, function (idx, messageObj) {
      var name = $('<div class="name"></div>').text(messageObj.username);
      var message = $('<div class="message"></div>').text(messageObj.message);
      var date = $('<div class="date"></div>').text(messageObj.date);
      $ul.append($("<li></li>").append(name, message, date));
    });
  });
}

// Probably not very resource heavy for todays standards... Still tho, probably should add option to disable this
function updateDeviders() {
  var deviders = $(".section-devider > span");
  var randDeviderString = deviderBuilder();
  deviders.html(randDeviderString);
  setTimeout(function () {
    updateDeviders();
  }, 550);
}

function deviderBuilder() {
  var randomString = "";
  for (var i = 0; i < 100; i++) {
    if (
      Math.random() * 6 > 4 &&
      randomString.charAt(randomString.length - 1) == "-"
    ) {
      randomString += "<b>-</b>";
      continue;
    }
    randomString += "-";
  }
  return randomString;
}

var isPlaying = false;
var audio = new Audio("https://cdn.domza.xyz/sounds/miku_song.mp3");

function playMiku() {
  if (!isPlaying) {
    audio.load();
    audio.play();
    isPlaying = true;
  } else {
    audio.pause();
    isPlaying = false;
  }
}
