//注意：每次调用$.get $.post $.ajax的时候，会先调用 ajaxPrefilter 这个函数
//在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options){
    
    //在发起真正的Ajax请求之前，统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007'+ options.url

    // 统一为有需要权限的接口，设置 headers 请求头
    if(options.url.indexOf('/my/') !== -1){
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    //全局统一挂载 complete 这个回调函数
    options.complete = function(res){
        //在complete函数中，可以使用responseJSON获取服务器响应回来的数据
        if(res.responseJSON.status ===1 && res.responseJSON.message === '身份认证失败！'){
            //1、强制清空 token
            localStorage.removeItem('token')
            //2、强制跳转到登录页面
            location.href = '/login.html'
        }
    }
    
})