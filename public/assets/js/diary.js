$(document).ready(function() {
    var $container = $('#article-container');
    $.getJSON("https://domza-api.domza.xyz/domza/diaryArticles", {}, function (data) {
        $.each(data, function(idx, articleObj) {
            var script = $('<script type="text/markdown"></' + 'script>').text(articleObj.text);
            var template = $('<template><link rel="stylesheet" href="../assets/css/specific/diary-article.css" /></template>');
            $container.append($('<zero-md class="article"></zero-md>').append(script).append(template));
        });
    });
});
