
(function (window, $) {
    window.tools = {
        getQuery: function () {
            var search = location.search
            if (search.length < 2) {
                return {}
            }
            search = search.substr(1)
            var params = search.split('&')
            var ret = {}
            params.forEach(function (item) {
                var keyval = item.split('=')

                ret[keyval[0]] = keyval[1]
            })
            return ret
        }
    }
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
    /** 文章创建 */
    api.postCreate = function (params) {
        return $.post('/api/post', params)
    }
    /** 获取文章 */
    api.getPost = function (params) {
        return $.get('/api/post', params)
    }
    /** 修改文章 */
    api.postModify = function (params) {
        return $.ajax({type: 'put', url: '/api/post', data: params})
    }
    window.api = api
})(window, $)