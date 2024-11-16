$(document).ready(function () {
  // Create section deviders
  updateDeviders();

  $("#mikuButton").on("click", playMiku);
});

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
