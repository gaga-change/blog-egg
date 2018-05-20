
(function ($, markdownit, hljs, api) {
    var md = markdownit({
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return '<pre class="hljs"><code>' +
                        hljs.highlight(lang, str, true).value +
                        '</code></pre>';
                } catch (__) { }
            }
            return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
        }
    })
    $(function () {
        var logout = $('#logout')
        var source = $('#source')
        var output = $('#output')
        source.on('input', function (e) {
            var text = source.val()
            var result = md.render(text)
            output.html(result)
        })
        // 退出登入
        logout.on('click', function(e) {
            api.logout().then(function() {
                location.href = '/login'
            })
        })
    })

})($, markdownit, hljs, window.api)
