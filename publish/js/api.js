(function (window, $) {
    var api = {}
    /** 获取用户列表 */
    api.getUsers = function () {
        return $.get('/api/users')
    }
    /** 用户注册 */
    api.register = function (params) {
        return $.post('/api/user', params)
    }
    /** 用户注册 */
    api.login = function (params) {
        return $.post('/api/user/login', params)
    }
    /** 用户注册 */
    api.logout = function () {
        return $.get('/api/user/logout')
    }
    window.api = api
})(window, $)