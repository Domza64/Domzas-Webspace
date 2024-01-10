import { API_URL, UPDATE_ARTICLE_URL } from "./Constants.js";
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

  // Clear existing tables
  $("#guestBookBody").empty();
  $("#articleBody").empty();

  $.ajax({
    url: API_URL + "diaryArticles",
    type: "GET",
    dataType: "json",
    success: function (data) {
      renderTableArticles(data);
    },
    error: function (status, error) {
      $("#responseText").text("Error: " + status + ", " + error);
    },
  });

  if (bearerToken) {
    $.ajax({
      url: API_URL + "admin/guestBookCommentsAdmin",
      method: "GET",
      headers: {
        Authorization: "Bearer " + bearerToken,
      },
      success: function (data) {
        renderTableComments(data);
      },
      error: function (status, error) {
        $("#responseText").text("Error: " + status + ", " + error);
      },
    });
  } else {
    $("#responseText").text("Error: Bearer token not found in local storage");
  }
}

function renderTableComments(data) {
  const tableBody = $("#guestBookBody");

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
        `<button class="delete-button delete-button-comment" data-id="${entry.id}">DELETE</button>`
      )
    );
    tableBody.append(row);
  });

  // Attach a click event to all "Delete" buttons
  $(".delete-button-comment").on("click", function () {
    const entryId = $(this).data("id");
    deleteEntry(entryId);
  });
}

function deleteArticle(articleId) {
  const bearerToken = sessionStorage.getItem("auth_token");

  if (bearerToken) {
    $.ajax({
      url: API_URL + "admin/diaryArticlesAdmin/" + articleId,
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + bearerToken,
      },
      success: function () {
        fetchData();
      },
      error: function (status, error) {
        $("#responseText").text("Error: " + status + ", " + error);
      },
    });
  } else {
    $("#responseText").text("Error: Bearer token not found in local storage");
  }
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

function renderTableArticles(data) {
  var tableBody = $("#articleTable tbody");

  data.forEach(function (article) {
    var row = $("<tr>").appendTo(tableBody);
    $("<td>").text(article.id).appendTo(row);
    $("<td>").text(article.title).appendTo(row);
    $("<td>").text(article.text).appendTo(row);
    $("<td>")
      .html(
        '<button class="editBtn" data-id="' + article.id + '">Edit</button>'
      )
      .appendTo(row);
    $("<td>")
      .html(
        '<button class="delete-button delete-button-article" data-id="' +
          article.id +
          '">Delete</button>'
      )
      .appendTo(row);
  });

  // Attach click event to Edit buttons
  $(".editBtn").on("click", function () {
    var articleId = $(this).data("id");
    var selectedArticle = data.find(function (article) {
      return article.id === articleId;
    });

    // Populate the edit form with selected article data
    $("#editId").val(selectedArticle.id);
    $("#editText").val(selectedArticle.text);
    $("#editTitle").val(selectedArticle.title);

    $("#editForm").show();

    // Scroll to the edit form
    $("html, body").animate(
      {
        scrollTop: $("#editForm").offset().top,
      },
      200
    );
  });

  $(".newArticle").on("click", function () {
    // Populate the edit form with selected article data
    $("#editId").val("");
    $("#editText").val("");
    $("#editTitle").val("");

    $("#editForm").show();

    // Scroll to the edit form
    $("html, body").animate(
      {
        scrollTop: $("#editForm").offset().top,
      },
      200
    );
  });

  $(".delete-button-article").on("click", function () {
    var articleId = $(this).data("id");
    deleteArticle(articleId);
  });

  // Attach submit event to the edit form
  $("#editForm").on("submit", function (e) {
    e.preventDefault();

    const bearerToken = sessionStorage.getItem("auth_token");

    if (bearerToken) {
      const formData = {
        id: $("#editId").val(),
        title: $("#editTitle").val(),
        text: $("#editText").val(),
      };

      $.ajax({
        url: UPDATE_ARTICLE_URL,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(formData),
        headers: {
          Authorization: "Bearer " + bearerToken,
        },
        success: function () {
          fetchData();
          $("#editForm").hide();
        },
        error: function (status, error) {
          $("#responseText").text("Error: " + status + ", " + error);
        },
      });
    }
  });
}
