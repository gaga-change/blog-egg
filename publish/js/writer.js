
(function ($, markdownit, hljs, api, tools) {
    var CREATE = '1'
    var MODIFY = '2'
    var status = '' // 状态 创建|修改
    var query = tools.getQuery()
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
    var tilteHint = $('#tilteHint')
    var postCreate = $('#postCreate')

    var template = `---\ntitle: 标题\ntags:\n- 标签\nid: 152\ncategories:\n- 目录\ndate: 2018-04-29 11:00:32\n---`

    if (query.id && Number(query.id)) {
        status = MODIFY
        api.getPost({ id: query.id }).then(function (res) {
            if (res.err) {
                alert(res.err)
            } else if (!res.data) {
                alert('文章不存在')
                tilteHint.text('文章不存在')
            } else {
                template = res.data.markdown
                tilteHint.text('编辑文章')
                RUN()
            }
        })
    } else {
        status = CREATE
        tilteHint.text('创建文章')
        RUN()
    }

    function RUN() {
        $(function () {
            var logout = $('#logout')
            var source = $('#source')
            var output = $('#output')
            source.val(template)
            parse()
            source.on('input', parse)
            function parse() {
                var text = source.val()
                var textArr = text.split('---')
                if (textArr.length > 2) {
                    text = textArr.splice(2).join('')
                }
                var result = md.render(text)
                output.html(result)
            }
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
                postCreate.text('发布文章...')
                if (status == CREATE) {
                    api.postCreate({ content: source.val() }).then(function (res) {
                        postCreate.text('发布文章')
                        if (res.login) {
                            return location.href = '/login'
                        }
                        if (res.err) {
                            alert(res.err)
                        } else {
                            status = MODIFY // 状态改为编辑
                        }
                    })
                } else {
                    api.postModify({ content: source.val() }).then(function (res) {
                        postCreate.text('发布文章')
                        if (res.login) {
                            return location.href = '/login'
                        }
                        if (res.err) {
                            alert(res.err)
                        }
                    })
                }
            })
        })
    }



})($, markdownit, hljs, window.api, window.tools)
