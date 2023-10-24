$(document).ready(function() {
    var $container = $('#article-container');
    $.getJSON("/api/diary-articles", {}, function (data) {
        $.each(data, function(idx, articleText) {
            var script = $('<script type="text/markdown"></' + 'script>').text(articleText);
            var template = $('<template><link rel="stylesheet" href="/css/specific/diary-article.css" /></template>');
            $container.append($('<zero-md class="article"></zero-md>').append(script).append(template));
        });
    });
});
