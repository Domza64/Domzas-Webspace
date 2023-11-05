function removeComment(button) {
    var id = button.dataset.commentid;
    var csrfToken = document.querySelector("meta[name='_csrf']").content;
    var csrfHeader = document.querySelector("meta[name='_csrf_header']").content;

    fetch('/api/remove-comment/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            [csrfHeader]: csrfToken  // Include CSRF token in request headers
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text(); // or response.json() if the server sends JSON
    })
    .then(data => {
        console.log(data); // Handle success response here
        location.reload(); // Reload the page on success
    })
    .catch(error => {
        console.error('Error:', error);
    });
}