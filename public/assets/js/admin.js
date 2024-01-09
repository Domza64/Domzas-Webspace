import { API_URL } from "./Constants.js";
import { authenticate } from "./login.js";

function onLoad() {
  const token = sessionStorage.getItem("auth_token");
  if (token === null) {
    authenticate();
  } else {
    fetchData();
  }
}

onLoad();

function fetchData() {
  const bearerToken = sessionStorage.getItem("auth_token");

  if (bearerToken) {
    $.ajax({
      url: API_URL + "admin/guestBookCommentsAdmin",
      method: "GET",
      headers: {
        Authorization: "Bearer " + bearerToken,
      },
      success: function (data) {
        // Call a function to render the data in the table
        renderTable(data);
      },
      error: function (xhr, status, error) {
        // Update the span with the error information
        $("#responseText").text("Error: " + status + ", " + error);
      },
    });
  } else {
    $("#responseText").text("Error: Bearer token not found in local storage");
  }
}

function renderTable(data) {
  const tableBody = $("#guestBookBody");

  // Clear existing rows
  tableBody.empty();

  // Iterate through each entry in the data and append a row to the table
  data.forEach((entry) => {
    const row = $("<tr>");
    row.append($("<td>").text(entry.id));
    row.append($("<td>").text(entry.username));
    row.append($("<td>").text(entry.message));
    row.append($("<td>").text(entry.date));
    // Add a "Delete" button with a data-id attribute for identification
    row.append(
      $("<td>").html(
        `<button class="delete-button" data-id="${entry.id}">DELETE</button>`
      )
    );
    tableBody.append(row);
  });

  // Attach a click event to all "Delete" buttons
  $(".delete-button").on("click", function () {
    const entryId = $(this).data("id");
    deleteEntry(entryId);
  });
}

function deleteEntry(entryId) {
  const bearerToken = sessionStorage.getItem("auth_token");

  if (bearerToken) {
    $.ajax({
      url: API_URL + "admin/guestBookCommentsAdmin/" + entryId,
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + bearerToken,
      },
      success: function () {
        fetchData();
      },
      error: function (xhr, status, error) {
        // Update the span with the error information
        $("#responseText").text("Error: " + status + ", " + error);
      },
    });
  } else {
    $("#responseText").text("Error: Bearer token not found in local storage");
  }
}

$(document).ready(function () {
  $("#fetchButton").on("click", fetchData);
});

function logout() {
  sessionStorage.removeItem("auth_token");
  window.location.href = "/";
}

$(document).ready(function () {
  $("#logout").on("click", logout);
});
