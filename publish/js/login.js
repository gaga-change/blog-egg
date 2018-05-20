
(function ($, api) {
    var LOGIN = 1
    var REGISTER = 2
    var submit = $('#submit')
    var username = $('#username')
    var password = $('#password')
    var status = null // 状态  LOGIN | REGISTER
    $(function () {
        api.getUsers().then(function (res) {
            console.log(res)
            if (res.data && res.data.length) {
                submit.fadeIn()
                status = LOGIN
            } else {
                submit.text('注册')
                submit.fadeIn()
                status = REGISTER
            }
        })
    })
    // 输入内容时消除 内容为空提示
    username.on('input', function() {
        username.removeClass('danger')
    })
    password.on('input', function() {
        password.removeClass('danger')
    })
    // 登入|注册 按钮
    submit.on('click', function (e) {
        if (!username.val()) {
            return username.addClass('danger')
        } 
        if (!password.val()) {
            return password.addClass('danger')
        }
        if (status == LOGIN) { // 登入
            api.login({
                username: username.val(),
                password: password.val()
            }).then(function (res) {
                if (!res.err) {
                    location.href = '/writer'
                } else {
                    alert(res.err)
                }
            })
        } else { // 注册
            api.register({
                username: username.val(),
                password: password.val()
            }).then(function (res) {
                if (!res.err) {
                    location.href = '/writer'
                } else {
                    alert(res.err)
                }
            })
        }
    })

})($, window.api)