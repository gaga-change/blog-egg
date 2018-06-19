$(window).scroll(function(){500<$(window).scrollTop()?$("#rocket").addClass("show"):$("#rocket").removeClass("show")}),$("#rocket").click(function(){return $("#rocket").addClass("launch"),$("html, body").animate({scrollTop:0},500,function(){$("#rocket").removeClass("show launch")}),!1});
$('[data-id=deleteBtn]').click(function (e) {
    var id = $(e.target).attr('data-post')
    var title = $(e.target).attr('data-title')
    var bol = confirm('确定删除该文章:' + title)
    if (bol) {
        $.ajax({ type: 'delete', url: '/api/clear?id=' + id }).then(function (res) {
            if (res.login) {
                return location.href = '/login'
            }
            if (res.err) {
                alert(res.err)
            } else {
                location.href = '/'
            }
        })
    }
})
