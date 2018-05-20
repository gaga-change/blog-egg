
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
    var template = `---\ntitle: 标题\ntags:\n- 标签\nid: 152\ncategories:\n- 目录\ndate: 2018-04-29 11:00:32\n---`
    $(function () {
        var logout = $('#logout')
        var source = $('#source')
        var output = $('#output')
        var postCreate = $('#postCreate')
        if (!source.val()) {
            source.val(template)
        }
        source.on('input', function (e) {
            var text = source.val()
            var textArr = text.split('---')
            if (textArr.length > 2) {
                text = textArr.splice(2).join('')
            }
            var result = md.render(text)
            output.html(result)
        })
        // 退出登入
        logout.on('click', function (e) {
            api.logout().then(function () {
                location.href = '/login'
            })
        })
        // 文章发布
        postCreate.on('click', function (e) {
            if (!source.val()) {
                return alert('请输入内容')
            }
            api.postCreate({ content: source.val() }).then(function (res) {
                if (res.err) {
                    alert(res.err)
                } else {
                    alert('发布成功')
                }
            })
        })
    })

})($, markdownit, hljs, window.api)
