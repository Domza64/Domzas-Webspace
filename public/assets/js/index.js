// ---------------------------- Section deviders
// Probably not very resource heavy for todays standards... Still tho, probably should add option to disable this
function updateDeviders() {
  const deviders = document.querySelectorAll(".section-devider > span");
  const randDeviderString = deviderBuilder();

  deviders.forEach((el) => {
    el.innerHTML = randDeviderString;
  });

  setTimeout(updateDeviders, 550);
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

updateDeviders();

// ---------------------------- Miku audio
var isPlaying = false;
var audio = new Audio("/assets/sounds/miku_song.mp3");

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

document.addEventListener("DOMContentLoaded", () => {
  updateDeviders();

  document.getElementById("mikuButton").addEventListener("click", playMiku);
});

// ---------------------------- Guest book
function fetchData() {
  fetch("/api/guestBook")
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "Success") {
        const messagesContainer = document.getElementById("messages");
        messagesContainer.innerHTML = ""; // Clear previous content
        data.messages.forEach((msg) => {
          const messageDiv = document.createElement("li");
          messageDiv.classList.add("message");
          messageDiv.innerHTML = `
              <strong>${msg.nickname}</strong>: ${msg.message} <em>(${msg.date})</em>
            `;
          messagesContainer.appendChild(messageDiv);
        });
      } else {
        alert("Failed to fetch messages.");
      }
    })
    .catch((error) => console.error("Error:", error));
}
fetchData();
